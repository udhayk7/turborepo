'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Globe, File } from 'lucide-react';
import { FileUploader } from '@/components/dashboard/file-uploader';
import { AIProcessing } from '@/components/dashboard/ai-processing';

enum UploadStep {
  SELECT_METHOD = 'SELECT_METHOD',
  UPLOAD_FILES = 'UPLOAD_FILES',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE'
}

export function NewProjectClient() {
  const [currentStep, setCurrentStep] = useState<UploadStep>(UploadStep.SELECT_METHOD);
  const [selectedMethod, setSelectedMethod] = useState<'upload' | 'url' | 'template'>('upload');

  const handleMethodSelect = (method: 'upload' | 'url' | 'template') => {
    setSelectedMethod(method);
    setCurrentStep(UploadStep.UPLOAD_FILES);
  };

  const startProcessing = () => {
    setCurrentStep(UploadStep.PROCESSING);
  };

  const completeProcessing = () => {
    setCurrentStep(UploadStep.COMPLETE);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Create New Project</h1>
      </div>

      {currentStep === UploadStep.SELECT_METHOD && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            className="bg-white p-6 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all cursor-pointer"
            onClick={() => handleMethodSelect('upload')}
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload Media</h3>
            <p className="text-gray-600 text-sm">
              Upload video files from your device to create a new project.
            </p>
          </div>

          <div 
            className="bg-white p-6 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all cursor-pointer"
            onClick={() => handleMethodSelect('url')}
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Import from URL</h3>
            <p className="text-gray-600 text-sm">
              Import videos from YouTube, TikTok, Instagram, or any video URL.
            </p>
          </div>

          <div 
            className="bg-white p-6 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all cursor-pointer"
            onClick={() => handleMethodSelect('template')}
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <File className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Start from Template</h3>
            <p className="text-gray-600 text-sm">
              Choose from pre-designed templates for common video types.
            </p>
          </div>
        </div>
      )}

      {currentStep === UploadStep.UPLOAD_FILES && (
        <>
          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-medium mb-4">
              {selectedMethod === 'upload' && 'Upload Files'}
              {selectedMethod === 'url' && 'Import from URL'}
              {selectedMethod === 'template' && 'Select a Template'}
            </h2>
            
            {selectedMethod === 'upload' && <FileUploader />}
            
            {selectedMethod === 'url' && (
              <div className="p-6 border border-gray-200 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input 
                  type="text"
                  placeholder="https://youtube.com/watch?v=..." 
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Supports YouTube, Vimeo, TikTok, Instagram, and more
                </p>
              </div>
            )}
            
            {selectedMethod === 'template' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Social Media Post', 'YouTube Video', 'Tutorial', 'Product Demo', 'Testimonial', 'Marketing'].map((template) => (
                  <div key={template} className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 hover:shadow-sm cursor-pointer">
                    <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center text-gray-400 text-sm">
                      Template Preview
                    </div>
                    <h3 className="font-medium text-gray-900">{template}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button 
              variant="outline"
              onClick={() => setCurrentStep(UploadStep.SELECT_METHOD)}
            >
              Back
            </Button>
            <Button 
              variant="default"
              onClick={startProcessing}
            >
              Continue
            </Button>
          </div>
        </>
      )}

      {currentStep === UploadStep.PROCESSING && (
        <AIProcessing onComplete={completeProcessing} />
      )}
      
      {currentStep === UploadStep.COMPLETE && (
        <div className="bg-white p-8 border border-gray-200 rounded-lg text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Your Project is Ready!</h2>
            <p className="text-gray-600 mb-6">
              Your video has been successfully processed and is ready for editing.
            </p>
            
            <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-400">Project Preview</span>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/projects">
                <Button variant="outline">View All Projects</Button>
              </Link>
              <Link href="/dashboard/projects/1">
                <Button variant="default">Edit Project</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
