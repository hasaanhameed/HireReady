import json
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import text
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from app.core.config import settings
from app.schema.roadmap import Roadmap
from app.schema.gap_analysis import Skill

# Initialize Groq LLM
llm = ChatGroq(
    groq_api_key=settings.GROQ_API_KEY,
    model_name="llama-3.3-70b-versatile",
    temperature=0.2
)

structured_llm = llm.with_structured_output(Roadmap)

roadmap_prompt = ChatPromptTemplate.from_template(
    """
    You are a Career Coach and Technical Mentor. Your goal is to create a structured learning roadmap for a {target_role} who is missing the following skills:
    {skills}
    
    For each skill, provide:
    1. A step number.
    2. The skill name.
    3. Why it matters for a {target_role}.
    4. Estimated time to learn (e.g., "2-4 weeks").
    
    The roadmap should be structured logically, starting with foundational skills or the most critical gaps.
    """
)

roadmap_chain = roadmap_prompt | structured_llm

async def generate_roadmap_llm(skills: List[str], target_role: str) -> Roadmap:
    """Invokes the Groq LLM to generate a roadmap for the given skills."""
    response = await roadmap_chain.ainvoke({
        "skills": ", ".join(skills),
        "target_role": target_role
    })
    return response

async def update_roadmap_for_gap_analysis(db: Session, user_id: str, gap_analysis_id: str, missing_skills: List[Skill], target_role: str):
    """
    Orchestrates the roadmap generation and storage.
    Checks if the top 6 missing skills have changed compared to the previous roadmap.
    """
    # 1. Get top 6 skills
    top_6_skills = [s.name for s in missing_skills[:6]]
    if not top_6_skills:
        return

    # 2. Check for previous roadmap to see if skills changed
    prev_gap = db.execute(
        text("""
            SELECT id FROM gap_analyses 
            WHERE user_id = :user_id AND id != :current_id 
            ORDER BY created_at DESC LIMIT 1
        """),
        {"user_id": user_id, "current_id": gap_analysis_id}
    ).fetchone()

    if prev_gap:
        prev_roadmap = db.execute(
            text("SELECT steps FROM learning_roadmaps WHERE gap_analysis_id = :gap_id"),
            {"gap_id": prev_gap.id}
        ).fetchone()

        if prev_roadmap:
            # The steps in DB are usually already parsed into a list/dict by the driver for JSONB
            prev_steps = prev_roadmap.steps
            # Ensure it's a list
            if isinstance(prev_steps, str):
                prev_steps = json.loads(prev_steps)
            
            prev_skills = [step['skill'] for step in prev_steps]
            
            # If the set of skills is the same, we reuse the previous roadmap
            if set(prev_skills) == set(top_6_skills):
                # We don't insert a new record if the skills haven't changed.
                # This avoids redundant rows in the learning_roadmaps table.
                # Update the existing roadmap to point to the new gap analysis id, instead of inserting a redundant row.
                db.execute(
                    text("UPDATE learning_roadmaps SET gap_analysis_id = :current_id WHERE gap_analysis_id = :prev_id"),
                    {"current_id": gap_analysis_id, "prev_id": prev_gap.id}
                )
                db.commit()
                return

    # 3. Generate new roadmap if skills changed or no previous roadmap exists
    new_roadmap = await generate_roadmap_llm(top_6_skills, target_role)
    
    # 4. Save to database
    # roadmap.dict() will contain 'steps' which is a list of RoadmapStep dicts
    roadmap_data = new_roadmap.dict()
    
    db.execute(
        text("INSERT INTO learning_roadmaps (gap_analysis_id, steps) VALUES (:gap_id, :steps)"),
        {"gap_id": gap_analysis_id, "steps": json.dumps(roadmap_data['steps'])}
    )
    db.commit()
