import json
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database.connection import get_db
from app.services.auth import get_current_user
from app.schema.roadmap import Roadmap, RoadmapResponse

router = APIRouter(
    prefix="/roadmap",
    tags=["Roadmap"]
)

@router.get("/me", response_model=RoadmapResponse)
def get_my_roadmap(
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Find the latest gap analysis for this user
    latest_gap = db.execute(
        text("SELECT id FROM gap_analyses WHERE user_id = :user_id ORDER BY created_at DESC LIMIT 1"),
        {"user_id": current_user["id"]}
    ).fetchone()
    
    if not latest_gap:
        raise HTTPException(status_code=404, detail="No gap analysis found. Please upload your resume first.")
        
    roadmap = db.execute(
        text("SELECT steps FROM learning_roadmaps WHERE gap_analysis_id = :gap_id"),
        {"gap_id": latest_gap[0]}
    ).fetchone()
    
    if not roadmap:
        raise HTTPException(status_code=404, detail="No roadmap found for your latest analysis.")
        
    # Standardize JSONB/string handling
    steps = roadmap[0]
    if isinstance(steps, str):
        steps = json.loads(steps)
        
    return RoadmapResponse(steps=steps)

@router.post("/complete-step/{step_number}")
def complete_roadmap_step(
    step_number: int,
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 1. Find the latest roadmap
    latest_gap = db.execute(
        text("SELECT id FROM gap_analyses WHERE user_id = :user_id ORDER BY created_at DESC LIMIT 1"),
        {"user_id": current_user["id"]}
    ).fetchone()
    
    if not latest_gap:
        raise HTTPException(status_code=404, detail="No roadmap found.")
        
    roadmap_row = db.execute(
        text("SELECT id, steps FROM learning_roadmaps WHERE gap_analysis_id = :gap_id"),
        {"gap_id": latest_gap[0]}
    ).fetchone()
    
    if not roadmap_row:
        raise HTTPException(status_code=404, detail="Roadmap not found.")
        
    steps = roadmap_row[1] 
    if isinstance(steps, str):
        steps = json.loads(steps)
    
    roadmap_id = roadmap_row[0]
    
    # 2. Update the specific step and get skill name
    skill_learned = None
    for step in steps:
        if step.get("step") == step_number:
            step["completed"] = True
            skill_learned = step.get("skill")
            break
            
    if not skill_learned:
        raise HTTPException(status_code=400, detail=f"Step {step_number} not found in roadmap.")
        
    # 3. Update roadmap in DB
    db.execute(
        text("UPDATE learning_roadmaps SET steps = :steps WHERE id = :id"),
        {"steps": json.dumps(steps), "id": roadmap_id}
    )
    
    # 4. Add skill to user's skills list
    user_skills_raw = current_user["skills"]
    if isinstance(user_skills_raw, str):
        try:
            user_skills_list = json.loads(user_skills_raw)
        except:
            user_skills_list = []
    elif user_skills_raw is None:
        user_skills_list = []
    else:
        user_skills_list = user_skills_raw
        
    user_skills_set = set(user_skills_list)
    user_skills_set.add(skill_learned)
    
    db.execute(
        text("UPDATE users SET skills = :skills WHERE id = :user_id"),
        {"skills": json.dumps(list(user_skills_set)), "user_id": current_user["id"]}
    )
    
    db.commit()
    return {"message": f"Step {step_number} completed and {skill_learned} added to your profile."}
