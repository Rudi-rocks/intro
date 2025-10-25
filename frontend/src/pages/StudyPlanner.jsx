import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Calendar, Clock, AlertCircle, CheckCircle2, Flame, Brain } from 'lucide-react';
import Navigation from '../components/Navigation';
import { mockTasks, mockAIFeedback } from '../mock';

const StudyPlanner = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [newTask, setNewTask] = useState({ title: '', subject: '', dueDate: '' });

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Overdue';
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `${diff} days`;
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.urgency - a.urgency;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Tactical Study Planner
              </h1>
            </div>
            <p className="text-gray-400 text-lg">AI-powered scheduling with urgency-based prioritization</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tasks Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Insights */}
              <Card className="p-6 bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-6 h-6 text-violet-400" />
                  <h2 className="text-xl font-bold text-white">AI Tactical Insights</h2>
                </div>
                <div className="space-y-3">
                  {mockAIFeedback.map((feedback, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        feedback.priority === 'high' ? 'bg-red-500/5 border-red-500/20' :
                        feedback.priority === 'medium' ? 'bg-yellow-500/5 border-yellow-500/20' :
                        'bg-green-500/5 border-green-500/20'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          feedback.priority === 'high' ? 'text-red-400' :
                          feedback.priority === 'medium' ? 'text-yellow-400' :
                          'text-green-400'
                        }`} />
                        <div>
                          <div className="text-sm font-semibold text-white mb-1">{feedback.subject}</div>
                          <div className="text-sm text-gray-300">{feedback.message}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Task List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Your Tasks</h2>
                {sortedTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={`p-6 border transition-all ${
                      task.completed
                        ? 'bg-gray-900/50 border-gray-700/30 opacity-60'
                        : 'bg-gradient-to-br from-blue-500/5 to-violet-500/5 border-blue-500/20 hover:border-blue-500/40'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mt-1 flex-shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-green-400" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-blue-400 hover:border-violet-400 transition-colors" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`text-lg font-semibold ${
                            task.completed ? 'text-gray-500 line-through' : 'text-white'
                          }`}>
                            {task.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                            {task.priority.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(task.dueDate)}</span>
                          </span>
                          <span>•</span>
                          <span>{task.subject}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Flame className={`w-4 h-4 ${
                              task.urgency > 90 ? 'text-red-400' :
                              task.urgency > 70 ? 'text-yellow-400' :
                              'text-green-400'
                            }`} />
                            <span>{task.urgency}% Urgency</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20">
                <h3 className="text-lg font-bold text-white mb-4">This Week</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Tasks</span>
                    <span className="text-2xl font-bold text-white">{tasks.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Completed</span>
                    <span className="text-2xl font-bold text-green-400">
                      {tasks.filter(t => t.completed).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">High Priority</span>
                    <span className="text-2xl font-bold text-red-400">
                      {tasks.filter(t => t.priority === 'high' && !t.completed).length}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Calendar Integration */}
              <Card className="p-6 bg-gradient-to-br from-violet-500/5 to-blue-500/5 border border-violet-500/20">
                <h3 className="text-lg font-bold text-white mb-4">Calendar Sync</h3>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white">
                  Sync with Google Calendar
                </Button>
                <p className="text-xs text-gray-400 mt-3 text-center">Coming soon in next phase</p>
              </Card>

              {/* Compliance Alert */}
              <Card className="p-6 bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20">
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-bold text-white">Compliance Alert</h3>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  2 high-priority tasks due within 48 hours. Complete them to maintain your compliance score.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Current Streak</span>
                  <span className="text-xl font-bold text-orange-400">23 days</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;