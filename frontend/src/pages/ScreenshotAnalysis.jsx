import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Image, Upload, Sparkles, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import Navigation from '../components/Navigation';

const ScreenshotAnalysis = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setAnalyzing(true);
    // Mock analysis result
    setTimeout(() => {
      setAnalysisResult({
        subjects: [
          {
            name: 'Data Structures',
            components: [
              { name: 'Quiz 1', score: 18, total: 20, percentage: 90 },
              { name: 'Assignment 1', score: 28, total: 30, percentage: 93.3 },
              { name: 'Mid Term', score: 32, total: 50, percentage: 64 }
            ],
            overall: 78,
            compliance: 85,
            status: 'on-track'
          },
          {
            name: 'Machine Learning',
            components: [
              { name: 'Assignment 1', score: 22, total: 25, percentage: 88 },
              { name: 'Project Phase 1', score: 35, total: 40, percentage: 87.5 }
            ],
            overall: 72,
            compliance: 76,
            status: 'at-risk'
          }
        ],
        tacticalMoves: [
          'Focus on ML Project Phase 2: Score 35+ to push compliance above 85%',
          'DS Quiz 2 critical: Aim for 18/20 to maintain trajectory',
          'Mid Term performance suggests review of core concepts'
        ]
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Image className="w-8 h-8 text-violet-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Screenshot Analysis
              </h1>
            </div>
            <p className="text-gray-400 text-lg">AI-powered mark detection and tactical insights from screenshots</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div>
              <Card className="p-8 bg-gradient-to-br from-violet-500/5 to-blue-500/5 border border-violet-500/20">
                <div className="text-center">
                  {!uploadedImage ? (
                    <label className="cursor-pointer block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-violet-500/30 rounded-xl p-12 hover:border-violet-500/50 transition-all">
                        <Upload className="w-16 h-16 text-violet-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Upload Mark Screenshot</h3>
                        <p className="text-gray-400 text-sm">Click to upload or drag and drop</p>
                        <p className="text-gray-500 text-xs mt-2">PNG, JPG up to 10MB</p>
                      </div>
                    </label>
                  ) : (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded screenshot"
                        className="w-full rounded-xl border border-violet-500/20"
                      />
                      <Button
                        onClick={() => {
                          setUploadedImage(null);
                          setAnalysisResult(null);
                        }}
                        variant="outline"
                        className="border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
                      >
                        Upload New Screenshot
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              {analyzing && (
                <Card className="mt-6 p-6 bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-violet-400 animate-pulse" />
                    <span className="text-white font-medium">Analyzing screenshot with AI...</span>
                  </div>
                </Card>
              )}
            </div>

            {/* Analysis Results */}
            {analysisResult && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Analysis Results</h2>

                {/* Detected Subjects */}
                {analysisResult.subjects.map((subject, index) => (
                  <Card key={index} className="p-6 bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{subject.name}</h3>
                      <div className="flex items-center space-x-2">
                        {subject.status === 'on-track' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-400" />
                        )}
                        <span className={`text-sm font-medium ${
                          subject.status === 'on-track' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {subject.compliance}% Compliance
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {subject.components.map((comp, compIndex) => (
                        <div key={compIndex} className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                          <span className="text-white">{comp.name}</span>
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-400 text-sm">
                              {comp.score}/{comp.total}
                            </span>
                            <span className={`font-semibold ${
                              comp.percentage >= 90 ? 'text-green-400' :
                              comp.percentage >= 75 ? 'text-blue-400' : 'text-yellow-400'
                            }`}>
                              {comp.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-blue-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Overall Score</span>
                        <span className="text-2xl font-bold text-blue-400">{subject.overall}%</span>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Tactical Moves */}
                <Card className="p-6 bg-gradient-to-br from-violet-500/5 to-blue-500/5 border border-violet-500/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-violet-400" />
                    <span>Tactical Moves</span>
                  </h3>
                  <ul className="space-y-3">
                    {analysisResult.tacticalMoves.map((move, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{move}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}

            {!analysisResult && !uploadedImage && (
              <div className="flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Upload a screenshot to see AI-powered analysis</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotAnalysis;