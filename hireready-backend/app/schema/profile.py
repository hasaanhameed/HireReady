from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ResumeHistoryEntry(BaseModel):
    id: str
    filename: str
    created_at: datetime

class ProfileResponse(BaseModel):
    # User Info
    id: str
    name: str
    email: str
    role: str
    target_role: Optional[str] = None
    skills: List[str] = []
    
    # Stats
    match_score: int = 0
    skills_count: int = 0
    resumes_count: int = 0
    
    # History
    resume_history: List[ResumeHistoryEntry] = []
