import os
import base64
from typing import List, Dict
from emergentintegrations.llm.chat import LlmChat, UserMessage
from models import TacticalInsight, ScreenshotAnalysisResult
import json

# Get Emergent LLM key from environment
EMERGENT_LLM_KEY = os.getenv('EMERGENT_LLM_KEY')

async def analyze_screenshot(image_base64: str) -> ScreenshotAnalysisResult:
    """
    Analyze academic marks screenshot using OpenAI Vision
    """
    try:
        # Initialize chat with GPT-4 Vision
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id="screenshot_analysis",
            system_message="You are an expert academic advisor analyzing student mark screenshots."
        ).with_model("openai", "gpt-4o")
        
        prompt = """Analyze this academic marks screenshot and extract:
1. Subject names and codes
2. Assessment components (quizzes, assignments, exams)
3. Scores obtained and total marks
4. Calculate compliance percentage for each subject
5. Identify tactical opportunities to improve grades

Return a JSON response in this exact format:
{
  "subjects": [
    {
      "name": "Subject Name",
      "code": "SUBJ001",
      "components": [
        {"name": "Quiz 1", "score": 18, "total": 20, "percentage": 90},
        {"name": "Assignment 1", "score": 28, "total": 30, "percentage": 93.3}
      ],
      "overall": 85,
      "compliance": 85,
      "status": "on-track"
    }
  ],
  "tactical_moves": [
    "Focus on Subject X Assignment 2 to push compliance above 85%",
    "Quiz 2 is critical for maintaining trajectory"
  ]
}"""
        
        user_message = UserMessage(
            text=prompt,
            images=[image_base64]
        )
        
        response = await chat.send_message(user_message)
        
        # Parse JSON response
        try:
            # Extract JSON from response
            json_start = response.find('{')
            json_end = response.rfind('}') + 1
            if json_start != -1 and json_end > json_start:
                json_str = response[json_start:json_end]
                result = json.loads(json_str)
                return ScreenshotAnalysisResult(**result)
            else:
                # Fallback response if JSON parsing fails
                return ScreenshotAnalysisResult(
                    subjects=[],
                    tactical_moves=["Unable to parse screenshot. Please ensure the image is clear and contains visible marks."]
                )
        except json.JSONDecodeError:
            return ScreenshotAnalysisResult(
                subjects=[],
                tactical_moves=["Unable to parse screenshot data. Please try again with a clearer image."]
            )
    
    except Exception as e:
        print(f"Screenshot analysis error: {str(e)}")
        return ScreenshotAnalysisResult(
            subjects=[],
            tactical_moves=[f"Error analyzing screenshot: {str(e)}"]
        )


async def generate_tactical_insights(subjects: List[Dict], tasks: List[Dict]) -> List[TacticalInsight]:
    """
    Generate AI-powered tactical insights using GPT-4
    """
    try:
        # Initialize chat with GPT-4
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id="tactical_insights",
            system_message="You are a tactical academic advisor providing actionable insights for students."
        ).with_model("openai", "gpt-4o")
        
        # Prepare context
        subjects_summary = []
        for subject in subjects:
            subjects_summary.append({
                "name": subject.get("name"),
                "compliance": subject.get("compliance"),
                "pending_components": [c for c in subject.get("components", []) if c.get("pending")]
            })
        
        prompt = f"""Based on this student's academic data, provide 3 tactical insights:

Subjects: {json.dumps(subjects_summary, indent=2)}
Tasks: {json.dumps(tasks, indent=2)}

For each insight, identify:
1. Type: 'tactical-move', 'compliance-alert', or 'achievement'
2. Subject name
3. Actionable message (concise, specific)
4. Priority: 'high', 'medium', or 'low'

Return JSON array format:
[
  {{"type": "tactical-move", "subject": "Subject Name", "message": "Focus on X to achieve Y", "priority": "high"}},
  ...
]"""
        
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        # Parse JSON response
        try:
            json_start = response.find('[')
            json_end = response.rfind(']') + 1
            if json_start != -1 and json_end > json_start:
                json_str = response[json_start:json_end]
                insights_data = json.loads(json_str)
                return [TacticalInsight(**insight) for insight in insights_data[:3]]
            else:
                return []
        except json.JSONDecodeError:
            return []
    
    except Exception as e:
        print(f"Tactical insights error: {str(e)}")
        return []


async def generate_coding_mentor_feedback(code: str, test_results: List[Dict]) -> str:
    """
    Generate AI mentor feedback for coding submissions
    """
    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id="coding_mentor",
            system_message="You are an experienced coding mentor providing constructive feedback."
        ).with_model("openai", "gpt-4o")
        
        passed = sum(1 for r in test_results if r.get('passed'))
        total = len(test_results)
        
        prompt = f"""Review this code submission:

Code:
```
{code}
```

Test Results: {passed}/{total} tests passed

Provide brief mentor feedback (2-3 sentences) focusing on:
1. Code quality and optimization opportunities
2. Edge cases to consider
3. Best practices

Keep it encouraging and actionable."""
        
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        return response
    
    except Exception as e:
        print(f"Mentor feedback error: {str(e)}")
        return "Great effort! Keep practicing and reviewing test cases."
