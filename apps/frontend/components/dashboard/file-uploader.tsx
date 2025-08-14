'use client';

import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, XCircle, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FileUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadStatus, setUploadStatus] = useState<Record<string, 'uploading' | 'success' | 'error'>>({});
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // Process selected files
  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).filter(file => file.type.startsWith('video/'));
    if (newFiles.length === 0) return;
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress for each file
    newFiles.forEach(file => {
      const fileId = `${file.name}-${Date.now()}`;
      
      setUploadStatus(prev => ({...prev, [fileId]: 'uploading'}));
      setUploadProgress(prev => ({...prev, [fileId]: 0}));
      setIsPlaying(prev => ({...prev, [fileId]: false}));
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadStatus(prev => ({...prev, [fileId]: 'success'}));
        }
        setUploadProgress(prev => ({...prev, [fileId]: progress}));
      }, 300);
    });
  };

  const togglePlayPause = (fileId: string) => {
    const videoRef = videoRefs.current[fileId];
    if (!videoRef) return;
    
    if (videoRef.paused) {
      videoRef.play();
      setIsPlaying(prev => ({...prev, [fileId]: true}));
    } else {
      videoRef.pause();
      setIsPlaying(prev => ({...prev, [fileId]: false}));
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter((_, i) => `${prev[i].name}-${Date.now()}` !== fileId));
    setUploadProgress(prev => {
      const newProgress = {...prev};
      delete newProgress[fileId];
      return newProgress;
    });
    setUploadStatus(prev => {
      const newStatus = {...prev};
      delete newStatus[fileId];
      return newStatus;
    });
  };

  return (
    <div className="w-full">
      {/* Drag and drop area */}
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
          dragActive ? "border-primary-500 bg-primary-50" : "border-gray-300"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Upload className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-gray-600 mb-2">
          Drag and drop video files here, or click to browse
        </p>
        <p className="text-gray-500 text-sm">
          Supports MP4, MOV, AVI up to 4GB
        </p>
        <Button variant="outline" className="mt-4" onClick={handleButtonClick}>
          Browse files
        </Button>
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="video/*"
          multiple
        />
      </div>

      {/* Uploaded files */}
      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="font-medium text-gray-900">Uploaded Files</h3>
          <div className="space-y-4">
            {files.map((file, index) => {
              const fileId = `${file.name}-${Date.now()}`;
              const progress = uploadProgress[fileId] || 0;
              const status = uploadStatus[fileId] || 'uploading';
              
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center p-4 border-b border-gray-200">
                    <span className="font-medium text-gray-900 flex-1 truncate">{file.name}</span>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded-full ml-2" 
                      onClick={() => removeFile(fileId)}
                    >
                      <XCircle className="h-5 w-5 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  
                  <div className="relative">
                    {/* Video preview */}
                    {status === 'success' && (
                      <video 
                        ref={(el) => {
                          if (el) videoRefs.current[fileId] = el;
                        }}
                        className="w-full h-48 object-cover"
                        src={URL.createObjectURL(file)}
                      />
                    )}
                    
                    {/* Play/pause overlay */}
                    {status === 'success' && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 cursor-pointer transition-all"
                        onClick={() => togglePlayPause(fileId)}
                      >
                        {isPlaying[fileId] ? (
                          <Pause className="h-12 w-12 text-white" />
                        ) : (
                          <Play className="h-12 w-12 text-white" />
                        )}
                      </div>
                    )}
                    
                    {/* Upload progress overlay */}
                    {status === 'uploading' && (
                      <div className="p-6 flex flex-col items-center justify-center bg-gray-100 h-48">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 max-w-md">
                          <div 
                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-gray-600 text-sm font-medium">
                          Uploading... {progress}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 bg-gray-50 flex items-center">
                    <div className="flex items-center">
                      {status === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <div className="h-5 w-5 mr-2" />
                      )}
                      <span className="text-sm text-gray-700">
                        {status === 'success' 
                          ? 'Ready to use' 
                          : `${Math.round(file.size / (1024 * 1024) * 10) / 10} MB`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
