from pydantic import BaseModel


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

class LoginRequest(BaseModel):
    email: str
    password: str

