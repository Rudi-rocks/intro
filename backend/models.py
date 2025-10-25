from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum
import uuid

class StatusEnum(str, Enum):
    excellent = 'excellent'
    on_track = 'on-track'
    at_risk = 'at-risk'
    critical = 'critical'

class PriorityEnum(str, Enum):
    high = 'high'
    medium = 'medium'
    low = 'low'

class DifficultyEnum(str, Enum):
    easy = 'easy'
    medium = 'medium'
    hard = 'hard'

class RarityEnum(str, Enum):
    common = 'common'
    rare = 'rare'
    epic = 'epic'
    legendary = 'legendary'

# User Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    avatar: str = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
    level: int = 1
    points: int = 0
    compliance: int = 0
    streak: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserStats(BaseModel):
    total_subjects: int
    total_tasks: int
    completed_tasks: int
    badges_earned: int
    average_compliance: float

# Subject Models
class Component(BaseModel):
    name: str
    scored: float
    total: float
    weight: float
    pending: bool = False

class Subject(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    name: str
    code: str
    current_marks: float
    total_marks: float
    compliance: float
    status: StatusEnum
    components: List[Component]
    created_at: datetime = Field(default_factory=datetime.utcnow)

class SubjectCreate(BaseModel):
    name: str
    code: str
    components: List[Component]

class SimulationRequest(BaseModel):
    simulated_scores: dict  # component_name: score

class SimulationResponse(BaseModel):
    predicted_grade: float
    compliance: float
    status: StatusEnum

# Task Models
class Task(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    subject: str
    due_date: datetime
    priority: PriorityEnum
    urgency: int
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TaskCreate(BaseModel):
    title: str
    subject: str
    due_date: datetime
    priority: PriorityEnum
    urgency: int = 50

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    subject: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Optional[PriorityEnum] = None
    urgency: Optional[int] = None
    completed: Optional[bool] = None

# Challenge Models
class Challenge(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    difficulty: DifficultyEnum
    points: int
    submissions: int = 0
    success_rate: float = 0.0
    tags: List[str]
    description: str
    test_cases: int
    starter_code: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Submission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    challenge_id: str
    code: str
    status: str
    test_results: List[dict]
    submitted_at: datetime = Field(default_factory=datetime.utcnow)

# Badge Models
class Badge(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    icon: str
    rarity: RarityEnum
    description: str
    criteria: dict

class UserBadge(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    badge_id: str
    earned: bool = True
    earned_at: datetime = Field(default_factory=datetime.utcnow)

# Legacy Timeline Models
class LegacyEntry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    semester: str
    gpa: float
    milestone: Optional[str] = None
    date: datetime

# Leaderboard Models
class LeaderboardEntry(BaseModel):
    rank: int
    name: str
    points: int
    solved: int
    avatar: str
    is_current_user: bool = False

# AI Models
class TacticalInsight(BaseModel):
    type: str
    subject: str
    message: str
    priority: str

class ScreenshotAnalysisResult(BaseModel):
    subjects: List[dict]
    tactical_moves: List[str]
