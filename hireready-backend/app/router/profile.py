from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
import json
from app.database.connection import get_db
from app.services.auth import get_current_user
from app.schema.profile import ProfileResponse, ResumeHistoryEntry

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)

@router.get("/me", response_model=ProfileResponse)
def get_my_profile(
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 1. Fetch Resumes Count & History
    resumes = db.execute(
        text("SELECT id, file_url as filename, created_at FROM resumes WHERE user_id = :user_id ORDER BY created_at DESC"),
        {"user_id": current_user["id"]}
    ).fetchall()
    
    resume_history = [
        ResumeHistoryEntry(id=str(r[0]), filename=r[1], created_at=r[2])
        for r in resumes
    ]
    
    # 2. Fetch Latest Match Score only
    latest_gap = db.execute(
        text("""
            SELECT match_percentage 
            FROM gap_analyses 
            WHERE user_id = :user_id 
            ORDER BY created_at DESC 
            LIMIT 1
        """),
        {"user_id": current_user["id"]}
    ).fetchone()
    
    latest_match_score = latest_gap[0] if latest_gap else 0
    
    # 3. Parse skills if they are stored as JSON string
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

    # 4. Assemble Profile
    return ProfileResponse(
        id=str(current_user["id"]),
        name=current_user["name"],
        email=current_user["email"],
        role=current_user["role"],
        target_role=current_user["target_role"],
        skills=user_skills,
        match_score=latest_match_score,
        skills_count=len(user_skills),
        resumes_count=len(resumes),
        resume_history=resume_history
    )
