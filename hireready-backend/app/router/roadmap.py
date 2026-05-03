from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database.connection import get_db
from app.services.auth import get_current_user
from app.schema.roadmap import Roadmap

router = APIRouter(
    prefix="/roadmap",
    tags=["Roadmap"]
)

@router.get("/me", response_model=Roadmap)
async def get_my_roadmap(
    current_user: any = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Fetches the learning roadmap associated with the current user's latest gap analysis.
    """
    # 1. Get the latest gap analysis ID for this user
    gap_analysis = db.execute(
        text("SELECT id FROM gap_analyses WHERE user_id = :user_id ORDER BY created_at DESC LIMIT 1"),
        {"user_id": current_user.id}
    ).fetchone()
    
    if not gap_analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No gap analysis found. Please upload your resume first."
        )
        
    # 2. Get the roadmap for this gap analysis
    roadmap = db.execute(
        text("SELECT steps FROM learning_roadmaps WHERE gap_analysis_id = :gap_id"),
        {"gap_id": gap_analysis.id}
    ).fetchone()
    
    if not roadmap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap not found for the current analysis."
        )
        
    return {"steps": roadmap.steps}
