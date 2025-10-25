// Mock data for the Tactical Academic App

export const mockUser = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  level: 12,
  points: 8450,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  compliance: 87,
  streak: 23
};

export const mockSubjects = [
  {
    id: '1',
    name: 'Data Structures',
    code: 'CS301',
    currentMarks: 78,
    totalMarks: 100,
    compliance: 85,
    components: [
      { name: 'Quiz 1', scored: 18, total: 20, weight: 15 },
      { name: 'Assignment 1', scored: 28, total: 30, weight: 20 },
      { name: 'Mid Term', scored: 32, total: 50, weight: 30 },
      { name: 'Quiz 2', scored: 0, total: 20, weight: 15, pending: true },
      { name: 'Final Exam', scored: 0, total: 80, weight: 20, pending: true }
    ],
    status: 'on-track'
  },
  {
    id: '2',
    name: 'Machine Learning',
    code: 'CS402',
    currentMarks: 72,
    totalMarks: 100,
    compliance: 76,
    components: [
      { name: 'Assignment 1', scored: 22, total: 25, weight: 20 },
      { name: 'Project Phase 1', scored: 35, total: 40, weight: 30 },
      { name: 'Quiz 1', scored: 15, total: 20, weight: 15 },
      { name: 'Project Phase 2', scored: 0, total: 40, weight: 25, pending: true },
      { name: 'Final Exam', scored: 0, total: 75, weight: 10, pending: true }
    ],
    status: 'at-risk'
  },
  {
    id: '3',
    name: 'Database Systems',
    code: 'CS303',
    currentMarks: 88,
    totalMarks: 100,
    compliance: 92,
    components: [
      { name: 'Lab Work', scored: 48, total: 50, weight: 25 },
      { name: 'Mid Term', scored: 40, total: 50, weight: 30 },
      { name: 'Project', scored: 0, total: 50, weight: 30, pending: true },
      { name: 'Final Exam', scored: 0, total: 50, weight: 15, pending: true }
    ],
    status: 'excellent'
  }
];

export const mockTasks = [
  {
    id: '1',
    title: 'Complete ML Assignment 2',
    subject: 'Machine Learning',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    priority: 'high',
    completed: false,
    urgency: 95
  },
  {
    id: '2',
    title: 'Study for DS Quiz 2',
    subject: 'Data Structures',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    completed: false,
    urgency: 78
  },
  {
    id: '3',
    title: 'Database Project Phase 1',
    subject: 'Database Systems',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    priority: 'high',
    completed: false,
    urgency: 85
  },
  {
    id: '4',
    title: 'Review Backpropagation',
    subject: 'Machine Learning',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    priority: 'low',
    completed: true,
    urgency: 45
  }
];

export const mockChallenges = [
  {
    id: '1',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'hard',
    points: 150,
    submissions: 2847,
    successRate: 34,
    tags: ['trees', 'dynamic-programming', 'recursion'],
    description: 'Find the maximum path sum in a binary tree where each node contains an integer value.',
    testCases: 8,
    completed: false
  },
  {
    id: '2',
    title: 'Implement LRU Cache',
    difficulty: 'medium',
    points: 100,
    submissions: 5621,
    successRate: 52,
    tags: ['hash-table', 'linked-list', 'design'],
    description: 'Design a data structure that follows Least Recently Used (LRU) cache constraints.',
    testCases: 12,
    completed: true
  },
  {
    id: '3',
    title: 'Two Sum Problem',
    difficulty: 'easy',
    points: 50,
    submissions: 12453,
    successRate: 78,
    tags: ['array', 'hash-table'],
    description: 'Find two numbers in an array that add up to a specific target.',
    testCases: 6,
    completed: true
  },
  {
    id: '4',
    title: 'Merge K Sorted Lists',
    difficulty: 'hard',
    points: 150,
    submissions: 3124,
    successRate: 41,
    tags: ['linked-list', 'heap', 'divide-conquer'],
    description: 'Merge k sorted linked lists into one sorted list.',
    testCases: 10,
    completed: false
  }
];

export const mockLeaderboard = [
  { rank: 1, name: 'Sarah Johnson', points: 12450, solved: 87, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { rank: 2, name: 'Alex Chen', points: 8450, solved: 62, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', isCurrentUser: true },
  { rank: 3, name: 'Mike Zhang', points: 7820, solved: 58, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
  { rank: 4, name: 'Emma Davis', points: 6950, solved: 53, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { rank: 5, name: 'James Wilson', points: 6100, solved: 48, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' }
];

export const mockBadges = [
  { id: '1', name: 'First Blood', icon: 'trophy', earned: true, rarity: 'legendary', description: 'First 90% score' },
  { id: '2', name: 'Compliance Champion', icon: 'shield', earned: true, rarity: 'epic', description: '30-day compliance streak' },
  { id: '3', name: 'Code Warrior', icon: 'code', earned: true, rarity: 'rare', description: 'Solved 50 coding challenges' },
  { id: '4', name: 'Perfect Score', icon: 'star', earned: false, rarity: 'legendary', description: 'Achieve 100% in any subject' },
  { id: '5', name: 'Night Owl', icon: 'moon', earned: true, rarity: 'common', description: 'Study session after midnight' },
  { id: '6', name: 'Tactical Master', icon: 'target', earned: false, rarity: 'epic', description: 'Predict grade within 2%' }
];

export const mockLegacyTimeline = [
  { semester: 'Fall 2024', gpa: 3.8, milestone: 'Top 10%', date: '2024-12-15' },
  { semester: 'Spring 2024', gpa: 3.6, milestone: 'First 90%', date: '2024-05-20' },
  { semester: 'Fall 2023', gpa: 3.4, milestone: 'Dean\'s List', date: '2023-12-10' },
  { semester: 'Spring 2023', gpa: 3.2, milestone: null, date: '2023-05-15' }
];

export const mockAIFeedback = [
  {
    type: 'tactical-move',
    subject: 'Machine Learning',
    message: 'Focus on Project Phase 2. A score of 35/40 will push your compliance above 85%.',
    priority: 'high'
  },
  {
    type: 'compliance-alert',
    subject: 'Data Structures',
    message: 'Quiz 2 is critical. Aim for 18/20 to maintain on-track status.',
    priority: 'medium'
  },
  {
    type: 'achievement',
    subject: 'Database Systems',
    message: 'Excellent work! You\'re on track for 90%+ final grade.',
    priority: 'low'
  }
];