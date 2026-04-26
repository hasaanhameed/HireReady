from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

class UserResponse(BaseModel):
    id: str   
    email: str
    name: str
    role: str
    target_role: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str

