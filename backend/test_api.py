#!/usr/bin/env python3
"""
Test script for TacticalGrade API endpoints
"""
import asyncio
import aiohttp
import json
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000/api"

async def test_endpoints():
    """Test all API endpoints"""
    async with aiohttp.ClientSession() as session:
        
        print("🧪 Testing TacticalGrade API Endpoints")
        print("=" * 50)
        
        # Test 1: Root endpoint
        try:
            async with session.get(f"{BASE_URL}/") as resp:
                data = await resp.json()
                print(f"✅ Root endpoint: {data['message']}")
        except Exception as e:
            print(f"❌ Root endpoint failed: {e}")
        
        # Test 2: Get current user
        try:
            async with session.get(f"{BASE_URL}/users/me") as resp:
                user = await resp.json()
                print(f"✅ User profile: {user['name']} (Level {user['level']})")
        except Exception as e:
            print(f"❌ User profile failed: {e}")
        
        # Test 3: Get user stats
        try:
            async with session.get(f"{BASE_URL}/users/demo-user-001/stats") as resp:
                stats = await resp.json()
                print(f"✅ User stats: {stats['total_subjects']} subjects, {stats['total_tasks']} tasks")
        except Exception as e:
            print(f"❌ User stats failed: {e}")
        
        # Test 4: Create a subject
        try:
            subject_data = {
                "name": "Advanced Algorithms",
                "code": "CS401",
                "components": [
                    {"name": "Assignment 1", "scored": 18, "total": 20, "weight": 0.3, "pending": False},
                    {"name": "Midterm Exam", "scored": 42, "total": 50, "weight": 0.4, "pending": False},
                    {"name": "Final Project", "scored": 0, "total": 30, "weight": 0.3, "pending": True}
                ]
            }
            async with session.post(f"{BASE_URL}/subjects", json=subject_data) as resp:
                subject = await resp.json()
                print(f"✅ Created subject: {subject['name']} ({subject['compliance']:.1f}% compliance)")
        except Exception as e:
            print(f"❌ Create subject failed: {e}")
        
        # Test 5: Get subjects
        try:
            async with session.get(f"{BASE_URL}/subjects") as resp:
                subjects = await resp.json()
                print(f"✅ Retrieved {len(subjects)} subjects")
        except Exception as e:
            print(f"❌ Get subjects failed: {e}")
        
        # Test 6: Create a task
        try:
            task_data = {
                "title": "Complete Algorithm Analysis Assignment",
                "subject": "CS401",
                "due_date": (datetime.now() + timedelta(days=7)).isoformat(),
                "priority": "high",
                "urgency": 85
            }
            async with session.post(f"{BASE_URL}/tasks", json=task_data) as resp:
                task = await resp.json()
                print(f"✅ Created task: {task['title']}")
        except Exception as e:
            print(f"❌ Create task failed: {e}")
        
        # Test 7: Get challenges
        try:
            async with session.get(f"{BASE_URL}/challenges") as resp:
                challenges = await resp.json()
                print(f"✅ Retrieved {len(challenges)} coding challenges")
        except Exception as e:
            print(f"❌ Get challenges failed: {e}")
        
        # Test 8: Get tactical insights
        try:
            async with session.get(f"{BASE_URL}/insights/tactical") as resp:
                insights = await resp.json()
                print(f"✅ Generated {len(insights)} tactical insights")
        except Exception as e:
            print(f"❌ Tactical insights failed: {e}")
        
        # Test 9: Get leaderboard
        try:
            async with session.get(f"{BASE_URL}/leaderboard") as resp:
                leaderboard = await resp.json()
                print(f"✅ Retrieved leaderboard with {len(leaderboard)} entries")
        except Exception as e:
            print(f"❌ Leaderboard failed: {e}")
        
        print("\n🎉 API testing completed!")

if __name__ == "__main__":
    asyncio.run(test_endpoints())