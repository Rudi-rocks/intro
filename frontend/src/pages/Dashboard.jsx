import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trophy, Shield, Star, Moon, Target, Code, TrendingUp, Share2, Lock, Unlock } from 'lucide-react';
import Navigation from '../components/Navigation';
import { mockUser, mockBadges, mockLegacyTimeline, mockSubjects } from '../mock';

const Dashboard = () => {
  const getBadgeIcon = (iconName) => {
    const icons = {
      trophy: Trophy,
      shield: Shield,
      star: Star,
      moon: Moon,
      target: Target,
      code: Code
    };
    return icons[iconName] || Trophy;
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-400';
      case 'epic': return 'from-purple-400 to-pink-400';
      case 'rare': return 'from-blue-400 to-cyan-400';
      case 'common': return 'from-gray-400 to-gray-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header with Profile */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-24 h-24 rounded-full border-4 border-blue-400"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center border-4 border-black">
                    <span className="text-sm font-bold">{mockUser.level}</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{mockUser.name}</h1>
                  <p className="text-gray-400">{mockUser.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">{mockUser.points} Points</span>
                    </div>
                    <div className="w-px h-4 bg-gray-700" />
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">Level {mockUser.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
                <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                  <Lock className="w-4 h-4 mr-2" />
                  Private Link
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Compliance Score', value: `${mockUser.compliance}%`, icon: Shield, color: 'text-green-400' },
              { label: 'Active Streak', value: `${mockUser.streak} days`, icon: TrendingUp, color: 'text-orange-400' },
              { label: 'Total Subjects', value: mockSubjects.length, icon: Target, color: 'text-blue-400' },
              { label: 'Badges Earned', value: mockBadges.filter(b => b.earned).length, icon: Trophy, color: 'text-yellow-400' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Legacy Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  <span>Legacy Timeline</span>
                </h2>
                
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-blue-500" />
                  
                  <div className="space-y-6">
                    {mockLegacyTimeline.map((entry, index) => (
                      <div key={index} className="relative pl-16">
                        {/* Timeline Dot */}
                        <div className="absolute left-3 top-6 w-6 h-6 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full border-4 border-black" />
                        
                        <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">{entry.semester}</h3>
                              <p className="text-sm text-gray-400">{new Date(entry.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-400">GPA {entry.gpa}</div>
                            </div>
                          </div>
                          {entry.milestone && (
                            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                              <Trophy className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm text-yellow-400 font-medium">{entry.milestone}</span>
                            </div>
                          )}
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compliance Radar */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-green-400" />
                  <span>Compliance Radar</span>
                </h2>
                
                <div className="grid gap-4">
                  {mockSubjects.map((subject) => (
                    <Card key={subject.id} className="p-6 bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">{subject.name}</h3>
                          <p className="text-sm text-gray-400">{subject.code}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            subject.compliance >= 90 ? 'text-green-400' :
                            subject.compliance >= 85 ? 'text-blue-400' :
                            subject.compliance >= 75 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {subject.compliance}%
                          </div>
                          <div className="text-xs text-gray-400">Compliance</div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            subject.compliance >= 90 ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
                            subject.compliance >= 85 ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                            subject.compliance >= 75 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                            'bg-gradient-to-r from-red-400 to-orange-400'
                          }`}
                          style={{ width: `${subject.compliance}%` }}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges Wall */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span>Flex Badges</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {mockBadges.map((badge) => {
                  const Icon = getBadgeIcon(badge.icon);
                  return (
                    <Card
                      key={badge.id}
                      className={`p-4 border transition-all ${
                        badge.earned
                          ? 'bg-gradient-to-br from-blue-500/10 to-violet-500/10 border-blue-500/30 hover:border-blue-500/50 cursor-pointer'
                          : 'bg-gray-900/50 border-gray-700/30 opacity-50'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`inline-flex p-4 rounded-full mb-3 ${
                          badge.earned
                            ? `bg-gradient-to-r ${getRarityColor(badge.rarity)}`
                            : 'bg-gray-700'
                        }`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`text-sm font-bold mb-1 ${
                          badge.earned ? 'text-white' : 'text-gray-500'
                        }`}>
                          {badge.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-2">{badge.description}</p>
                        {badge.earned ? (
                          <span className={`inline-block px-2 py-1 text-xs rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white font-medium`}>
                            {badge.rarity}
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-400">
                            Locked
                          </span>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;