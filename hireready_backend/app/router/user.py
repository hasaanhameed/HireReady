from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schema.user import UserCreate, UserResponse

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.execute(
        text("SELECT id FROM users WHERE email = :email"),
        {"email": user.email}
    ).fetchone()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    # Insert new user using raw SQL
    result = db.execute(
        text("""
            INSERT INTO users (name, email, password, role)
            VALUES (:name, :email, :password, :role)
            RETURNING id, email
        """),
        {"name": user.name, "email": user.email, "password": user.password, "role": user.role}
    )
    db.commit()
    
    new_user = result.fetchone()
    
    # Return matched UserResponse
    return UserResponse(id=str(new_user.id), email=new_user.email)
