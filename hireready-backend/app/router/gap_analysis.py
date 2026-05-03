from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
import json

from app.database.connection import get_db
from app.services.auth import get_current_user
from app.schema.gap_analysis import GapAnalysisResponse
from app.services.gap_analysis_service import perform_gap_analysis

router = APIRouter(
    prefix="/gap-analysis",
    tags=["Gap Analysis"]
)

@router.get("/me", response_model=GapAnalysisResponse)
async def get_my_gap_analysis(
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Performs a real-time gap analysis based on the centralized skills list 
    in the users table.
    """
    # 1. Ensure user has a target role
    target_role = current_user["target_role"]
    if not target_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Target role is not set. Please upload your resume first."
        )

    # 2. Get the latest skills and parse if they are stored as a JSON string
    user_skills_raw = current_user["skills"]
    if isinstance(user_skills_raw, str):
        try:
            user_skills = json.loads(user_skills_raw)
        except:
            user_skills = []
    elif user_skills_raw is None:
        user_skills = []
    else:
        user_skills = user_skills_raw
    
    # 3. Perform real-time gap analysis
    overall_match, skills_you_have, skills_missing = perform_gap_analysis(
        user_skills=user_skills,
        target_role=target_role
    )
    
    # 4. Update the latest gap_analyses record
    latest_gap = db.execute(
        text("SELECT id FROM gap_analyses WHERE user_id = :user_id ORDER BY created_at DESC LIMIT 1"),
        {"user_id": current_user["id"]}
    ).fetchone()
    
    if latest_gap:
        missing_skills_json = json.dumps([{"name": s.name, "importance": s.importance} for s in skills_missing])
        # Note: present_skills is a TEXT[] array, so we pass the list directly.
        # missing_skills is a JSONB column, so we pass the JSON string.
        db.execute(
            text("""
                UPDATE gap_analyses 
                SET match_percentage = :match, 
                    present_skills = :present, 
                    missing_skills = :missing
                WHERE id = :id
            """),
            {
                "match": overall_match,
                "present": skills_you_have,
                "missing": missing_skills_json,
                "id": latest_gap[0]
            }
        )
        db.commit()

    return GapAnalysisResponse(
        targetRole=target_role,
        overallMatch=overall_match,
        skillsYouHave=skills_you_have,
        skillsMissing=[{"name": s.name, "importance": s.importance} for s in skills_missing]
    )
