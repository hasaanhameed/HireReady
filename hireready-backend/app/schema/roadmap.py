from pydantic import BaseModel
from typing import List

class RoadmapStep(BaseModel):
    step: int
    skill: str
    why_it_matters: str
    estimated_time: str

class Roadmap(BaseModel):
    steps: List[RoadmapStep]
