import React, { useState, useMemo } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Slider } from '../components/ui/slider';
import { mockSubjects } from '../mock';
import { Target, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';

const GradeSimulator = () => {
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0]);
  const [simulations, setSimulations] = useState({});

  const simulateGrade = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    selectedSubject.components.forEach((comp) => {
      const score = simulations[comp.name] !== undefined ? simulations[comp.name] : comp.scored;
      totalWeightedScore += (score / comp.total) * comp.weight;
      totalWeight += comp.weight;
    });

    return (totalWeightedScore / totalWeight) * 100;
  };

  const predictedGrade = useMemo(() => simulateGrade(), [selectedSubject, simulations]);

  const getComplianceStatus = (grade) => {
    if (grade >= 90) return { status: 'Excellent', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' };
    if (grade >= 85) return { status: 'On Track', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' };
    if (grade >= 75) return { status: 'At Risk', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
    return { status: 'Critical', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' };
  };

  const complianceStatus = getComplianceStatus(predictedGrade);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Tactical Grade Simulator
              </h1>
            </div>
            <p className="text-gray-400 text-lg">What-if engine to predict and optimize your final grades</p>
          </div>

          {/* Subject Selector */}
          <div className="mb-8 flex flex-wrap gap-3">
            {mockSubjects.map((subject) => (
              <Button
                key={subject.id}
                onClick={() => {
                  setSelectedSubject(subject);
                  setSimulations({});
                }}
                className={`px-6 py-3 rounded-xl transition-all ${
                  selectedSubject.id === subject.id
                    ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20'
                }`}
              >
                {subject.name}
              </Button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Components Panel */}
            <div className="lg:col-span-2 space-y-4">
              {selectedSubject.components.map((component, index) => (
                <Card key={index} className="p-6 bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{component.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Weight: {component.weight}%</span>
                        {component.pending && (
                          <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-400">
                        {simulations[component.name] !== undefined ? simulations[component.name] : component.scored}
                      </div>
                      <div className="text-sm text-gray-400">/ {component.total}</div>
                    </div>
                  </div>

                  {component.pending && (
                    <div className="space-y-3">
                      <Slider
                        value={[simulations[component.name] || 0]}
                        onValueChange={(value) => setSimulations({ ...simulations, [component.name]: value[0] })}
                        max={component.total}
                        step={1}
                        className="w-full"
                      />
                      <Input
                        type="number"
                        min="0"
                        max={component.total}
                        value={simulations[component.name] || 0}
                        onChange={(e) => setSimulations({ ...simulations, [component.name]: parseInt(e.target.value) || 0 })}
                        className="bg-black/40 border-blue-500/20 text-white"
                        placeholder="Enter predicted score"
                      />
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Prediction Panel */}
            <div className="space-y-6">
              {/* Predicted Grade */}
              <Card className={`p-6 bg-gradient-to-br ${complianceStatus.bg} border ${complianceStatus.border}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Predicted Grade</h3>
                  <Zap className={`w-5 h-5 ${complianceStatus.color}`} />
                </div>
                <div className={`text-5xl font-bold ${complianceStatus.color} mb-2`}>
                  {predictedGrade.toFixed(1)}%
                </div>
                <div className={`text-sm ${complianceStatus.color} font-medium`}>
                  {complianceStatus.status}
                </div>
              </Card>

              {/* Compliance Thresholds */}
              <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Compliance Thresholds</h3>
                <div className="space-y-3">
                  {[
                    { threshold: 90, label: 'Excellent', color: 'bg-green-500', reached: predictedGrade >= 90 },
                    { threshold: 85, label: 'On Track', color: 'bg-blue-500', reached: predictedGrade >= 85 },
                    { threshold: 75, label: 'Minimum', color: 'bg-yellow-500', reached: predictedGrade >= 75 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {item.reached ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-600" />
                        )}
                        <span className={item.reached ? 'text-white' : 'text-gray-500'}>{item.label}</span>
                      </div>
                      <span className={item.reached ? 'text-white font-semibold' : 'text-gray-500'}>
                        {item.threshold}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tactical Insights */}
              <Card className="p-6 bg-gradient-to-br from-violet-500/5 to-blue-500/5 border border-violet-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Tactical Insight</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  {predictedGrade >= 90 ? (
                    <p className="flex items-start space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Excellent trajectory! Maintain current performance to secure top grades.</span>
                    </p>
                  ) : predictedGrade >= 85 ? (
                    <p className="flex items-start space-x-2">
                      <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>On track for strong performance. Push pending assessments to reach 90%+.</span>
                    </p>
                  ) : (
                    <p className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Critical: Focus on high-weight pending assessments to improve compliance.</span>
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeSimulator;