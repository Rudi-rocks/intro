import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Code, Trophy, Zap, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import { mockChallenges, mockLeaderboard } from '../mock';

const CodingArena = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [activeTab, setActiveTab] = useState('challenges');

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'hard': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="w-8 h-8 text-violet-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Coding Arena
              </h1>
            </div>
            <p className="text-gray-400 text-lg">Daily challenges, leaderboards, and AI mentor feedback</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-8">
            {[
              { id: 'challenges', label: 'Challenges', icon: Code },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/20'
                      : 'bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* Challenges Tab */}
          {activeTab === 'challenges' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Challenge List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">Daily Challenges</h2>
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <Clock className="w-4 h-4 text-violet-400" />
                    <span className="text-sm text-violet-400">Resets in 8h 24m</span>
                  </div>
                </div>

                {mockChallenges.map((challenge) => (
                  <Card
                    key={challenge.id}
                    onClick={() => setSelectedChallenge(challenge)}
                    className={`p-6 cursor-pointer transition-all border ${
                      selectedChallenge?.id === challenge.id
                        ? 'bg-gradient-to-br from-violet-500/10 to-blue-500/10 border-violet-500/40'
                        : 'bg-gradient-to-br from-blue-500/5 to-violet-500/5 border-blue-500/20 hover:border-blue-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
                          {challenge.completed && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {challenge.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded border border-blue-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span>{challenge.submissions} submissions</span>
                        <span>•</span>
                        <span>{challenge.successRate}% success</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">{challenge.points} pts</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Challenge Details */}
              <div className="sticky top-24">
                {selectedChallenge ? (
                  <Card className="p-6 bg-gradient-to-br from-violet-500/5 to-blue-500/5 border border-violet-500/20">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-bold text-white">{selectedChallenge.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                        {selectedChallenge.difficulty.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-6">{selectedChallenge.description}</p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-black/30">
                        <span className="text-gray-400">Test Cases</span>
                        <span className="text-white font-semibold">{selectedChallenge.testCases}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-black/30">
                        <span className="text-gray-400">Points Reward</span>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">{selectedChallenge.points}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-black/30">
                        <span className="text-gray-400">Success Rate</span>
                        <span className="text-white font-semibold">{selectedChallenge.successRate}%</span>
                      </div>
                    </div>

                    {selectedChallenge.completed ? (
                      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 mb-4">
                        <div className="flex items-center space-x-2 text-green-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">Challenge Completed!</span>
                        </div>
                      </div>
                    ) : (
                      <Button className="w-full bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white py-6">
                        Start Challenge
                      </Button>
                    )}

                    <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <div className="flex items-start space-x-2">
                        <Zap className="w-4 h-4 text-blue-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-blue-400 mb-1">AI Mentor Tip</div>
                          <div className="text-xs text-gray-400">
                            Consider using a hash map for O(1) lookups. Focus on edge cases with empty inputs.
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center text-gray-500">
                      <Code className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="text-lg">Select a challenge to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Global Leaderboard</h2>
                <p className="text-gray-400">Top performers this month</p>
              </div>

              <div className="space-y-3">
                {mockLeaderboard.map((user, index) => (
                  <Card
                    key={index}
                    className={`p-6 transition-all border ${
                      user.isCurrentUser
                        ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 border-blue-500/40'
                        : 'bg-gradient-to-br from-blue-500/5 to-violet-500/5 border-blue-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Rank */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                          user.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black' :
                          user.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black' :
                          user.rank === 3 ? 'bg-gradient-to-r from-orange-300 to-orange-400 text-black' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {user.rank === 1 && <Trophy className="w-6 h-6" />}
                          {user.rank > 1 && user.rank}
                        </div>

                        {/* User Info */}
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full border-2 border-blue-400/50"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {user.name}
                            {user.isCurrentUser && (
                              <span className="ml-2 px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                                You
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-400">{user.solved} problems solved</p>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Zap className="w-5 h-5 text-yellow-400" />
                          <span className="text-2xl font-bold text-white">{user.points}</span>
                        </div>
                        <p className="text-xs text-gray-400">points</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingArena;