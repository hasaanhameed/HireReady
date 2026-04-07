from fastapi import FastAPI
from app.router import user


app = FastAPI(title="HireReady Backend")

app.include_router(user.router)


