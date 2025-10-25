import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, Image, Calendar, LayoutDashboard, Code, Zap } from 'lucide-react';
import { mockUser } from '../mock';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/simulator', label: 'Grade Simulator', icon: Target },
    { path: '/screenshot', label: 'Screenshot Analysis', icon: Image },
    { path: '/planner', label: 'Study Planner', icon: Calendar },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/arena', label: 'Coding Arena', icon: Code }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="w-8 h-8 text-blue-400 group-hover:text-violet-400 transition-colors" />
              <div className="absolute inset-0 bg-blue-400/20 blur-xl group-hover:bg-violet-400/20 transition-colors" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              TacticalGrade
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20'
                      : 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Level</span>
                <span className="text-sm font-bold text-blue-400">{mockUser.level}</span>
              </div>
              <div className="w-px h-4 bg-blue-500/20" />
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Points</span>
                <span className="text-sm font-bold text-violet-400">{mockUser.points}</span>
              </div>
            </div>
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="w-10 h-10 rounded-full border-2 border-blue-400/50 hover:border-violet-400/50 transition-colors cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;