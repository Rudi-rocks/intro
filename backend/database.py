from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
users_collection = db['users']
subjects_collection = db['subjects']
tasks_collection = db['tasks']
challenges_collection = db['challenges']
submissions_collection = db['submissions']
badges_collection = db['badges']
user_badges_collection = db['user_badges']
legacy_timeline_collection = db['legacy_timeline']
