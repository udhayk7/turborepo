'use client';

import React, { useState } from 'react';
import { 
  Check, 
  X, 
  FileDown, 
  Youtube, 
  Instagram, 
  Twitter,
  Linkedin,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ExportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ExportFormat = {
  id: string;
  name: string;
  resolution: string;
  icon: React.ReactNode;
  platforms?: string[];
};

type ExportStep = 'format' | 'settings' | 'processing' | 'complete';

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [currentStep, setCurrentStep] = useState<ExportStep>('format');
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState(0);
  
  const exportFormats: ExportFormat[] = [
    { 
      id: 'youtube', 
      name: 'YouTube', 
      resolution: '1920x1080', 
      icon: <Youtube className="h-5 w-5 text-red-500" /> 
    },
    { 
      id: 'instagram', 
      name: 'Instagram Post', 
      resolution: '1080x1080', 
      icon: <Instagram className="h-5 w-5 text-purple-500" />
    },
    { 
      id: 'instastory', 
      name: 'Instagram Story', 
      resolution: '1080x1920', 
      icon: <Instagram className="h-5 w-5 text-purple-500" />
    },
    { 
      id: 'twitter', 
      name: 'Twitter', 
      resolution: '1280x720', 
      icon: <Twitter className="h-5 w-5 text-blue-400" />
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      resolution: '1920x1080', 
      icon: <Linkedin className="h-5 w-5 text-blue-700" />
    },
    { 
      id: 'mp4', 
      name: 'MP4 File', 
      resolution: '1920x1080', 
      icon: <FileDown className="h-5 w-5 text-gray-700" />,
      platforms: ['High Quality', 'Medium Quality', 'Web Optimized']
    }
  ];
  
  const handleSelectFormat = (formatId: string) => {
    setSelectedFormat(formatId);
  };
  
  const handleContinue = () => {
    if (currentStep === 'format') {
      setCurrentStep('settings');
    } else if (currentStep === 'settings') {
      setCurrentStep('processing');
      simulateExport();
    }
  };
  
  const simulateExport = () => {
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentStep('complete');
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  
  const handleDownload = () => {
    // Simulate download
    setTimeout(() => {
      onClose();
      setCurrentStep('format');
      setSelectedFormat(null);
      setExportProgress(0);
    }, 1000);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {currentStep === 'format' && 'Export Video'}
            {currentStep === 'settings' && 'Export Settings'}
            {currentStep === 'processing' && 'Exporting Video'}
            {currentStep === 'complete' && 'Export Complete'}
          </h2>
          <button 
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentStep === 'format' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Select an export format for your video
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {exportFormats.map((format) => (
                  <div 
                    key={format.id}
                    className={cn(
                      "border rounded-lg p-3 cursor-pointer hover:border-primary-300 transition-colors",
                      selectedFormat === format.id ? "border-primary-500 bg-primary-50" : "border-gray-200"
                    )}
                    onClick={() => handleSelectFormat(format.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {format.icon}
                        <div>
                          <div className="font-medium">{format.name}</div>
                          <div className="text-xs text-gray-500">{format.resolution}</div>
                        </div>
                      </div>
                      {selectedFormat === format.id && (
                        <div className="h-5 w-5 bg-primary-100 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-600" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentStep === 'settings' && (
            <div className="space-y-5">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Resolution
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['1080p', '720p', '480p'].map((res) => (
                    <div 
                      key={res} 
                      className={cn(
                        "border rounded-lg p-2 text-center cursor-pointer",
                        res === '1080p' ? "border-primary-500 bg-primary-50" : "border-gray-200"
                      )}
                    >
                      {res}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['MP4', 'WebM'].map((format) => (
                    <div 
                      key={format} 
                      className={cn(
                        "border rounded-lg p-2 text-center cursor-pointer",
                        format === 'MP4' ? "border-primary-500 bg-primary-50" : "border-gray-200"
                      )}
                    >
                      {format}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Include Captions
                  </label>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      className="opacity-0 w-0 h-0" 
                      id="toggleCaptions" 
                      defaultChecked 
                    />
                    <label 
                      htmlFor="toggleCaptions"
                      className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-primary-500 rounded-full transition-all duration-300 before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300"
                    ></label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Add Intro & Outro
                  </label>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      className="opacity-0 w-0 h-0" 
                      id="toggleIntroOutro" 
                    />
                    <label 
                      htmlFor="toggleIntroOutro"
                      className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300"
                    ></label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'processing' && (
            <div className="space-y-6 py-4 text-center">
              <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                <svg className="absolute w-24 h-24 -rotate-90">
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    fill="transparent" 
                    stroke="#e5e7eb" 
                    strokeWidth="6" 
                  />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    fill="transparent" 
                    stroke="#7c5cff" 
                    strokeWidth="6" 
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - exportProgress / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-xl font-semibold">{exportProgress}%</span>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Exporting Your Video</h3>
                <p className="text-sm text-gray-600">
                  This might take a few minutes depending on the video length and quality.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Processing video files</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Rendering captions</span>
                </div>
                <div className="flex items-center gap-2">
                  {exportProgress > 50 ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
                  )}
                  <span className="text-sm">Applying effects</span>
                </div>
                <div className="flex items-center gap-2">
                  {exportProgress > 75 ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
                  )}
                  <span className="text-sm">Encoding final video</span>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'complete' && (
            <div className="space-y-6 py-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Export Complete</h3>
                <p className="text-sm text-gray-600">
                  Your video has been successfully exported and is ready to download.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <FileDown className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">product_demo_final.mp4</div>
                    <div className="text-sm text-gray-500">18.6 MB • 1080p</div>
                  </div>
                </div>
                
                <Button variant="default" size="sm" onClick={handleDownload}>
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
          {currentStep !== 'processing' && currentStep !== 'complete' && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          
          {(currentStep === 'format' || currentStep === 'settings') && (
            <Button 
              variant="default" 
              onClick={handleContinue}
              disabled={currentStep === 'format' && !selectedFormat}
              className="gap-1"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          
          {currentStep === 'complete' && (
            <Button 
              variant="default" 
              onClick={onClose}
            >
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
