import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Trophy, Brain, Shield, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">The Future of Academic Excellence</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Tactical Grade
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto animate-slide-up delay-200">
            Master your academics with AI-powered grade simulation, screenshot analysis, 
            and tactical study planning. Build your legacy, one score at a time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 animate-slide-up delay-400">
            <Link to="/simulator">
              <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                Launch Simulator
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 px-8 py-6 text-lg rounded-xl">
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in delay-600">
            {[
              { icon: Target, label: 'Grade Predictions', value: '99.2%' },
              { icon: Brain, label: 'AI Analysis', value: 'Real-time' },
              { icon: Trophy, label: 'Students', value: '10K+' },
              { icon: Shield, label: 'Compliance', value: '100%' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all group"
                >
                  <Icon className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Tactical Features
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Grade Simulator',
                description: 'What-if engine with compliance radar. Predict your final grades and optimize your strategy.',
                link: '/simulator'
              },
              {
                icon: Brain,
                title: 'Screenshot Analysis',
                description: 'AI-powered mark detection. Upload screenshots and get instant tactical insights.',
                link: '/screenshot'
              },
              {
                icon: Trophy,
                title: 'Coding Arena',
                description: 'Daily challenges, leaderboards, and AI mentor feedback. Sharpen your skills.',
                link: '/arena'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all group cursor-pointer h-full">
                    <div className="relative mb-6">
                      <Icon className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;