from fastapi import FastAPI, APIRouter, File, UploadFile, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import List, Optional
import base64
from datetime import datetime, timedelta

# Import models and services
from models import *
from database import *
from ai_services import analyze_screenshot, generate_tactical_insights, generate_coding_mentor_feedback

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="TacticalGrade API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Default user ID for demo mode
DEFAULT_USER_ID = "demo-user-001"

# Initialize sample data on startup
@app.on_event("startup")
async def initialize_sample_data():
    """Initialize sample data for demo"""
    try:
        # Check if sample data already exists
        existing_user = await users_collection.find_one({"id": DEFAULT_USER_ID})
        if existing_user:
            return  # Data already initialized
        
        # Create sample challenges
        sample_challenges = [
            Challenge(
                id="challenge-001",
                title="Two Sum Problem",
                difficulty=DifficultyEnum.easy,
                points=100,
                submissions=1247,
                success_rate=0.73,
                tags=["arrays", "hash-table"],
                description="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
                test_cases=3,
                starter_code="def two_sum(nums, target):\n    # Your code here\n    pass"
            ),
            Challenge(
                id="challenge-002", 
                title="Binary Tree Traversal",
                difficulty=DifficultyEnum.medium,
                points=250,
                submissions=892,
                success_rate=0.58,
                tags=["trees", "recursion"],
                description="Implement inorder, preorder, and postorder traversal of a binary tree.",
                test_cases=5,
                starter_code="class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef inorder_traversal(root):\n    # Your code here\n    pass"
            ),
            Challenge(
                id="challenge-003",
                title="Dynamic Programming: Fibonacci",
                difficulty=DifficultyEnum.hard,
                points=500,
                submissions=456,
                success_rate=0.34,
                tags=["dynamic-programming", "optimization"],
                description="Implement an efficient solution to calculate the nth Fibonacci number using dynamic programming.",
                test_cases=8,
                starter_code="def fibonacci(n):\n    # Implement efficient DP solution\n    pass"
            )
        ]
        
        for challenge in sample_challenges:
            await challenges_collection.insert_one(challenge.dict())
        
        # Create sample badges
        sample_badges = [
            Badge(
                id="badge-001",
                name="First Steps",
                icon="🎯",
                rarity=RarityEnum.common,
                description="Complete your first challenge",
                criteria={"challenges_completed": 1}
            ),
            Badge(
                id="badge-002", 
                name="Problem Solver",
                icon="🧠",
                rarity=RarityEnum.rare,
                description="Solve 10 challenges",
                criteria={"challenges_completed": 10}
            ),
            Badge(
                id="badge-003",
                name="Academic Excellence", 
                icon="🏆",
                rarity=RarityEnum.epic,
                description="Maintain 90%+ compliance across all subjects",
                criteria={"min_compliance": 90}
            )
        ]
        
        for badge in sample_badges:
            await badges_collection.insert_one(badge.dict())
            
        print("✅ Sample data initialized successfully")
        
    except Exception as e:
        print(f"❌ Error initializing sample data: {e}")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "TacticalGrade API v1.0"}

# ==================== USER ENDPOINTS ====================

@api_router.get("/users/me", response_model=User)
async def get_current_user():
    """Get current user profile"""
    user = await users_collection.find_one({"id": DEFAULT_USER_ID})
    if not user:
        # Create default user
        default_user = User(
            id=DEFAULT_USER_ID,
            name="Alex Chen",
            email="alex.chen@university.edu",
            avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            level=12,
            points=8450,
            compliance=87,
            streak=23
        )
        await users_collection.insert_one(default_user.dict())
        return default_user
    return User(**user)

@api_router.get("/users/{user_id}/stats", response_model=UserStats)
async def get_user_stats(user_id: str = DEFAULT_USER_ID):
    """Get user statistics"""
    total_subjects = await subjects_collection.count_documents({"user_id": user_id})
    total_tasks = await tasks_collection.count_documents({"user_id": user_id})
    completed_tasks = await tasks_collection.count_documents({"user_id": user_id, "completed": True})
    badges_earned = await user_badges_collection.count_documents({"user_id": user_id, "earned": True})
    
    # Calculate average compliance
    subjects = await subjects_collection.find({"user_id": user_id}).to_list(100)
    avg_compliance = sum(s.get("compliance", 0) for s in subjects) / len(subjects) if subjects else 0
    
    return UserStats(
        total_subjects=total_subjects,
        total_tasks=total_tasks,
        completed_tasks=completed_tasks,
        badges_earned=badges_earned,
        average_compliance=round(avg_compliance, 2)
    )

# ==================== SUBJECT ENDPOINTS ====================

@api_router.get("/subjects", response_model=List[Subject])
async def get_subjects(user_id: str = DEFAULT_USER_ID):
    """List all subjects for user"""
    subjects = await subjects_collection.find({"user_id": user_id}).to_list(100)
    return [Subject(**s) for s in subjects]

@api_router.post("/subjects", response_model=Subject)
async def create_subject(subject_data: SubjectCreate, user_id: str = DEFAULT_USER_ID):
    """Create new subject"""
    # Calculate current marks and compliance
    total_weighted = 0
    total_weight = 0
    for comp in subject_data.components:
        if not comp.pending:
            total_weighted += (comp.scored / comp.total) * comp.weight
            total_weight += comp.weight
    
    current_marks = (total_weighted / total_weight * 100) if total_weight > 0 else 0
    compliance = current_marks
    
    # Determine status
    if compliance >= 90:
        status = StatusEnum.excellent
    elif compliance >= 85:
        status = StatusEnum.on_track
    elif compliance >= 75:
        status = StatusEnum.at_risk
    else:
        status = StatusEnum.critical
    
    subject = Subject(
        user_id=user_id,
        name=subject_data.name,
        code=subject_data.code,
        current_marks=current_marks,
        total_marks=100,
        compliance=compliance,
        status=status,
        components=subject_data.components
    )
    
    await subjects_collection.insert_one(subject.dict())
    return subject

@api_router.post("/subjects/{subject_id}/simulate", response_model=SimulationResponse)
async def simulate_grade(subject_id: str, simulation: SimulationRequest):
    """Simulate final grade with what-if scores"""
    subject = await subjects_collection.find_one({"id": subject_id})
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    subject_obj = Subject(**subject)
    
    # Calculate with simulated scores
    total_weighted = 0
    total_weight = 0
    
    for comp in subject_obj.components:
        score = simulation.simulated_scores.get(comp.name, comp.scored)
        total_weighted += (score / comp.total) * comp.weight
        total_weight += comp.weight
    
    predicted_grade = (total_weighted / total_weight * 100) if total_weight > 0 else 0
    
    # Determine status
    if predicted_grade >= 90:
        status = StatusEnum.excellent
    elif predicted_grade >= 85:
        status = StatusEnum.on_track
    elif predicted_grade >= 75:
        status = StatusEnum.at_risk
    else:
        status = StatusEnum.critical
    
    return SimulationResponse(
        predicted_grade=round(predicted_grade, 2),
        compliance=round(predicted_grade, 2),
        status=status
    )

# ==================== SCREENSHOT ANALYSIS ENDPOINT ====================

@api_router.post("/analysis/screenshot")
async def analyze_screenshot_endpoint(file: UploadFile = File(...)):
    """Upload and analyze marks screenshot"""
    try:
        # Read file and convert to base64
        contents = await file.read()
        image_base64 = base64.b64encode(contents).decode('utf-8')
        
        # Analyze with AI
        result = await analyze_screenshot(image_base64)
        
        return result.dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

# ==================== TASK ENDPOINTS ====================

@api_router.get("/tasks", response_model=List[Task])
async def get_tasks(user_id: str = DEFAULT_USER_ID):
    """List all tasks"""
    tasks = await tasks_collection.find({"user_id": user_id}).to_list(100)
    return [Task(**t) for t in tasks]

@api_router.post("/tasks", response_model=Task)
async def create_task(task_data: TaskCreate, user_id: str = DEFAULT_USER_ID):
    """Create new task"""
    task = Task(user_id=user_id, **task_data.dict())
    await tasks_collection.insert_one(task.dict())
    return task

@api_router.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, task_update: TaskUpdate):
    """Update task"""
    task = await tasks_collection.find_one({"id": task_id})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = {k: v for k, v in task_update.dict().items() if v is not None}
    await tasks_collection.update_one({"id": task_id}, {"$set": update_data})
    
    updated_task = await tasks_collection.find_one({"id": task_id})
    return Task(**updated_task)

@api_router.post("/tasks/{task_id}/toggle")
async def toggle_task(task_id: str):
    """Toggle task completion"""
    task = await tasks_collection.find_one({"id": task_id})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    new_status = not task.get("completed", False)
    await tasks_collection.update_one({"id": task_id}, {"$set": {"completed": new_status}})
    
    return {"success": True, "completed": new_status}

@api_router.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    """Delete task"""
    result = await tasks_collection.delete_one({"id": task_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"success": True}

# ==================== AI INSIGHTS ENDPOINT ====================

@api_router.get("/insights/tactical", response_model=List[TacticalInsight])
async def get_tactical_insights(user_id: str = DEFAULT_USER_ID):
    """Get AI-powered tactical insights"""
    subjects = await subjects_collection.find({"user_id": user_id}).to_list(100)
    tasks = await tasks_collection.find({"user_id": user_id, "completed": False}).to_list(100)
    
    subjects_data = [s for s in subjects]
    tasks_data = [t for t in tasks]
    
    insights = await generate_tactical_insights(subjects_data, tasks_data)
    return insights

# ==================== CHALLENGE ENDPOINTS ====================

@api_router.get("/challenges", response_model=List[Challenge])
async def get_challenges():
    """List all coding challenges"""
    challenges = await challenges_collection.find().to_list(100)
    return [Challenge(**c) for c in challenges]

@api_router.get("/challenges/{challenge_id}", response_model=Challenge)
async def get_challenge(challenge_id: str):
    """Get specific challenge details"""
    challenge = await challenges_collection.find_one({"id": challenge_id})
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return Challenge(**challenge)

@api_router.post("/challenges/{challenge_id}/submit")
async def submit_solution(challenge_id: str, submission_data: dict, user_id: str = DEFAULT_USER_ID):
    """Submit solution for a challenge"""
    challenge = await challenges_collection.find_one({"id": challenge_id})
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    
    # Mock test execution (in real implementation, this would run actual tests)
    test_results = [
        {"test_case": 1, "passed": True, "expected": "output1", "actual": "output1"},
        {"test_case": 2, "passed": True, "expected": "output2", "actual": "output2"},
        {"test_case": 3, "passed": False, "expected": "output3", "actual": "wrong_output"}
    ]
    
    passed_tests = sum(1 for r in test_results if r["passed"])
    total_tests = len(test_results)
    status = "passed" if passed_tests == total_tests else "failed"
    
    # Create submission record
    submission = Submission(
        user_id=user_id,
        challenge_id=challenge_id,
        code=submission_data.get("code", ""),
        status=status,
        test_results=test_results
    )
    
    await submissions_collection.insert_one(submission.dict())
    
    # Generate AI mentor feedback
    feedback = await generate_coding_mentor_feedback(submission.code, test_results)
    
    return {
        "submission_id": submission.id,
        "status": status,
        "passed_tests": passed_tests,
        "total_tests": total_tests,
        "test_results": test_results,
        "mentor_feedback": feedback
    }

@api_router.get("/users/{user_id}/submissions")
async def get_user_submissions(user_id: str = DEFAULT_USER_ID):
    """Get user's challenge submissions"""
    submissions = await submissions_collection.find({"user_id": user_id}).to_list(100)
    return [Submission(**s) for s in submissions]

# ==================== BADGE ENDPOINTS ====================

@api_router.get("/badges", response_model=List[Badge])
async def get_all_badges():
    """List all available badges"""
    badges = await badges_collection.find().to_list(100)
    return [Badge(**b) for b in badges]

@api_router.get("/users/{user_id}/badges")
async def get_user_badges(user_id: str = DEFAULT_USER_ID):
    """Get user's earned badges"""
    user_badges = await user_badges_collection.find({"user_id": user_id, "earned": True}).to_list(100)
    
    # Get badge details
    badge_ids = [ub["badge_id"] for ub in user_badges]
    badges = await badges_collection.find({"id": {"$in": badge_ids}}).to_list(100)
    
    return [Badge(**b) for b in badges]

# ==================== LEADERBOARD ENDPOINTS ====================

@api_router.get("/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard(user_id: str = DEFAULT_USER_ID):
    """Get global leaderboard"""
    # Get top users by points
    users = await users_collection.find().sort("points", -1).limit(50).to_list(50)
    
    leaderboard = []
    for rank, user in enumerate(users, 1):
        # Count solved challenges
        solved_count = await submissions_collection.count_documents({
            "user_id": user["id"], 
            "status": "passed"
        })
        
        leaderboard.append(LeaderboardEntry(
            rank=rank,
            name=user["name"],
            points=user["points"],
            solved=solved_count,
            avatar=user["avatar"],
            is_current_user=(user["id"] == user_id)
        ))
    
    return leaderboard

# ==================== LEGACY TIMELINE ENDPOINTS ====================

@api_router.get("/users/{user_id}/timeline")
async def get_user_timeline(user_id: str = DEFAULT_USER_ID):
    """Get user's academic timeline"""
    timeline = await legacy_timeline_collection.find({"user_id": user_id}).sort("date", -1).to_list(100)
    return [LegacyEntry(**entry) for entry in timeline]

@api_router.post("/users/{user_id}/timeline")
async def add_timeline_entry(entry_data: dict, user_id: str = DEFAULT_USER_ID):
    """Add entry to user's timeline"""
    entry = LegacyEntry(user_id=user_id, **entry_data)
    await legacy_timeline_collection.insert_one(entry.dict())
    return entry

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    from database import client
    client.close()