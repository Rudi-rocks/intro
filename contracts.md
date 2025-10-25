# TacticalGrade Backend Contracts & Integration Plan

## API Endpoints

### 1. User Management
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/users/{user_id}/stats` - Get user statistics

### 2. Subjects & Grades
- `GET /api/subjects` - List all subjects
- `POST /api/subjects` - Create new subject
- `GET /api/subjects/{subject_id}` - Get subject details
- `PUT /api/subjects/{subject_id}` - Update subject
- `DELETE /api/subjects/{subject_id}` - Delete subject
- `POST /api/subjects/{subject_id}/simulate` - Simulate grade with what-if scores

### 3. Screenshot Analysis (OpenAI Vision)
- `POST /api/analysis/screenshot` - Upload and analyze screenshot
  - Request: multipart/form-data with image file
  - Response: Detected subjects, components, scores, tactical insights

### 4. Study Planner
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{task_id}` - Update task
- `DELETE /api/tasks/{task_id}` - Delete task
- `POST /api/tasks/{task_id}/toggle` - Toggle task completion
- `GET /api/insights/tactical` - Get AI-powered tactical insights (GPT-4)

### 5. Coding Arena
- `GET /api/challenges` - List all challenges
- `GET /api/challenges/{challenge_id}` - Get challenge details
- `POST /api/challenges/{challenge_id}/submit` - Submit solution
- `GET /api/leaderboard` - Get global leaderboard

### 6. Dashboard & Legacy
- `GET /api/dashboard/timeline` - Get legacy timeline
- `GET /api/badges` - List all badges
- `GET /api/badges/earned` - List earned badges
- `POST /api/dashboard/share` - Generate shareable link

## MongoDB Collections

### users
```
{
  _id: ObjectId,
  name: string,
  email: string,
  avatar: string,
  level: number,
  points: number,
  compliance: number,
  streak: number,
  created_at: datetime
}
```

### subjects
```
{
  _id: ObjectId,
  user_id: ObjectId,
  name: string,
  code: string,
  current_marks: number,
  total_marks: number,
  compliance: number,
  status: enum['excellent', 'on-track', 'at-risk', 'critical'],
  components: [{
    name: string,
    scored: number,
    total: number,
    weight: number,
    pending: boolean
  }],
  created_at: datetime
}
```

### tasks
```
{
  _id: ObjectId,
  user_id: ObjectId,
  title: string,
  subject: string,
  due_date: datetime,
  priority: enum['high', 'medium', 'low'],
  urgency: number,
  completed: boolean,
  created_at: datetime
}
```

### challenges
```
{
  _id: ObjectId,
  title: string,
  difficulty: enum['easy', 'medium', 'hard'],
  points: number,
  submissions: number,
  success_rate: number,
  tags: [string],
  description: string,
  test_cases: number,
  starter_code: string,
  test_cases_data: array,
  created_at: datetime
}
```

### submissions
```
{
  _id: ObjectId,
  user_id: ObjectId,
  challenge_id: ObjectId,
  code: string,
  status: enum['passed', 'failed', 'error'],
  test_results: array,
  submitted_at: datetime
}
```

### badges
```
{
  _id: ObjectId,
  name: string,
  icon: string,
  rarity: enum['common', 'rare', 'epic', 'legendary'],
  description: string,
  criteria: object
}
```

### user_badges
```
{
  _id: ObjectId,
  user_id: ObjectId,
  badge_id: ObjectId,
  earned_at: datetime
}
```

### legacy_timeline
```
{
  _id: ObjectId,
  user_id: ObjectId,
  semester: string,
  gpa: number,
  milestone: string,
  date: datetime
}
```

## Mock Data Replacement Map

### mock.js -> API Integration

1. **mockUser** → `GET /api/users/me`
   - Replace in: Navigation.jsx, Dashboard.jsx

2. **mockSubjects** → `GET /api/subjects`
   - Replace in: GradeSimulator.jsx, Dashboard.jsx
   - Add: Subject CRUD operations

3. **mockTasks** → `GET /api/tasks`
   - Replace in: StudyPlanner.jsx
   - Add: Task CRUD and toggle operations

4. **mockChallenges** → `GET /api/challenges`
   - Replace in: CodingArena.jsx

5. **mockLeaderboard** → `GET /api/leaderboard`
   - Replace in: CodingArena.jsx

6. **mockBadges** → `GET /api/badges` + `GET /api/badges/earned`
   - Replace in: Dashboard.jsx

7. **mockLegacyTimeline** → `GET /api/dashboard/timeline`
   - Replace in: Dashboard.jsx

8. **mockAIFeedback** → `GET /api/insights/tactical` (GPT-4)
   - Replace in: StudyPlanner.jsx

## OpenAI Integration via Emergent LLM Key

### 1. Screenshot Analysis (OpenAI Vision)
- Model: gpt-4-vision-preview or gpt-4o
- Input: Image file (base64 encoded)
- Prompt: "Analyze this academic mark screenshot. Extract subject names, component names, scores, and total marks. Return structured JSON with subjects, components, and tactical recommendations."

### 2. Tactical Insights (GPT-4)
- Model: gpt-4
- Input: User's subjects, current marks, pending assessments
- Prompt: "Based on these academic scores and pending assessments, provide tactical insights for improving compliance and achieving target grades. Focus on high-impact moves."

### 3. Coding Mentor Feedback (GPT-4)
- Model: gpt-4
- Input: Code submission, test results
- Prompt: "Review this code submission and provide mentor-style feedback focusing on optimization, edge cases, and best practices."

## Frontend-Backend Integration Strategy

### Phase 1: User & Subjects
1. Create user model and endpoints
2. Create subjects model and CRUD endpoints
3. Update GradeSimulator.jsx to fetch from API
4. Update Dashboard.jsx compliance radar

### Phase 2: Screenshot Analysis
1. Integrate OpenAI Vision via Emergent LLM key
2. Create analysis endpoint with file upload
3. Update ScreenshotAnalysis.jsx to call API

### Phase 3: Study Planner & Tasks
1. Create tasks model and endpoints
2. Integrate GPT-4 for tactical insights
3. Update StudyPlanner.jsx to use real data

### Phase 4: Coding Arena
1. Create challenges and submissions models
2. Implement simple test runner
3. Update CodingArena.jsx

### Phase 5: Dashboard & Badges
1. Create badges and legacy timeline models
2. Implement badge earning logic
3. Update Dashboard.jsx

## Error Handling
- All endpoints return consistent error format:
```json
{
  "error": "error_code",
  "message": "Human readable message",
  "details": {}
}
```

## Authentication
- Demo mode: Single default user for MVP
- Future: JWT-based auth with Google OAuth

## Testing Strategy
1. Backend: curl tests for each endpoint
2. Frontend: Manual testing + automated testing agent
3. Integration: End-to-end flow testing
