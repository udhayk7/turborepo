'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, Clock, Wand2 } from 'lucide-react';

type AIProcessingProps = {
  onComplete?: () => void;
};

export function AIProcessing({ onComplete }: AIProcessingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  const processingSteps = [
    {
      title: 'Transcribing audio',
      description: 'Converting speech to text with high accuracy',
      icon: Wand2,
      duration: 3000,
    },
    {
      title: 'Identifying key moments',
      description: 'Finding highlights and important segments',
      icon: Sparkles,
      duration: 4000,
    },
    {
      title: 'Generating B-roll suggestions',
      description: 'Finding relevant visuals for your content',
      icon: Clock,
      duration: 3500,
    },
    {
      title: 'Preparing editing options',
      description: 'Creating multiple edit variations to choose from',
      icon: Wand2,
      duration: 2500,
    },
  ];

  useEffect(() => {
    if (currentStep < processingSteps.length) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
        
        // Small delay before moving to next step
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 500);
        
      }, processingSteps[currentStep].duration);
      
      return () => clearTimeout(timer);
    } else if (onComplete) {
      // Processing complete
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [currentStep, processingSteps.length, onComplete]);

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-primary-600" />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
        AI is processing your video
      </h2>
      <p className="text-gray-500 text-center mb-8">
        Our AI is analyzing your content to create the best possible edit
      </p>
      
      <div className="space-y-4 max-w-lg mx-auto">
        {processingSteps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          
          return (
            <div 
              key={index} 
              className={`flex items-center p-3 rounded-lg transition-all ${
                isActive ? 'bg-primary-50 border border-primary-100' :
                isComplete ? 'bg-green-50' : 'opacity-50'
              }`}
            >
              <div className="mr-4">
                {isComplete ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <step.icon className={`h-6 w-6 ${isActive ? 'text-primary-500' : 'text-gray-400'}`} />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
              
              {isActive && (
                <div className="ml-2">
                  <div className="relative h-5 w-5">
                    <div className="absolute inset-0 rounded-full border-2 border-primary-500 border-r-transparent animate-spin"></div>
                  </div>
                </div>
              )}
              
              {isActive && animating && (
                <div className="absolute left-0 bottom-0 h-1 w-full">
                  <div 
                    className="h-1 bg-primary-500 rounded-full transition-all duration-1000 animate-progressBar" 
                    style={{ 
                      animationDuration: `${processingSteps[currentStep].duration}ms`
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {currentStep >= processingSteps.length && (
        <div className="text-center mt-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Processing Complete!</h3>
          <p className="text-gray-500">Your video is ready for editing</p>
        </div>
      )}
      
      {/* Progress animation handled by Tailwind classes */}
    </div>
  );
}
