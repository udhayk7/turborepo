'use client';

import React, { useState } from 'react';
import { 
  Type, 
  Settings, 
  RefreshCw, 
  Download, 
  Languages,
  GripHorizontal,
  Edit,
  Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CaptionsEditorProps = {
  className?: string;
};

type Caption = {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  selected?: boolean;
};

export function CaptionsEditor({ className }: CaptionsEditorProps) {
  const [captions, setCaptions] = useState<Caption[]>([
    { id: '1', startTime: 1.2, endTime: 4.5, text: "Welcome to OpusPro, the AI-powered video editing platform." },
    { id: '2', startTime: 5.0, endTime: 8.1, text: "In this tutorial, we'll show you how to create professional videos in minutes." },
    { id: '3', startTime: 8.5, endTime: 12.3, text: "Let's start by uploading your first video file." },
    { id: '4', startTime: 13.0, endTime: 16.2, text: "Our AI will analyze your content and suggest the best edits." },
    { id: '5', startTime: 17.0, endTime: 20.5, text: "You can customize everything to match your brand style and preferences." },
  ]);
  
  const [activeCaption, setActiveCaption] = useState<string | null>('1');
  const [captionsStyle, setCaptionsStyle] = useState<'standard' | 'fancy'>('standard');
  
  const selectCaption = (id: string) => {
    setCaptions(prev => prev.map(cap => ({
      ...cap,
      selected: cap.id === id
    })));
    setActiveCaption(id);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${mins}:${secs < 10 ? '0' + secs : secs}.${ms.toString().padStart(3, '0')}`;
  };
  
  const toggleCaptionsStyle = () => {
    setCaptionsStyle(prev => prev === 'standard' ? 'fancy' : 'standard');
  };

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg overflow-hidden", className)}>
      {/* Captions header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Type className="h-5 w-5 text-gray-700" />
          <h3 className="font-medium">Captions</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <Languages className="h-3.5 w-3.5" />
            English
          </Button>
          <Button variant="outline" size="sm" onClick={toggleCaptionsStyle} className="text-xs gap-1">
            <Settings className="h-3.5 w-3.5" />
            {captionsStyle === 'standard' ? 'Standard' : 'Fancy'}
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      {/* Captions list */}
      <div className="h-64 overflow-y-auto divide-y divide-gray-100">
        {captions.map((caption) => (
          <div 
            key={caption.id} 
            className={cn(
              "flex p-3 hover:bg-gray-50 cursor-pointer",
              caption.id === activeCaption ? "bg-primary-50" : ""
            )}
            onClick={() => selectCaption(caption.id)}
          >
            <div className="flex-shrink-0 pr-3">
              <GripHorizontal className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">
                {formatTime(caption.startTime)} - {formatTime(caption.endTime)}
              </div>
              <div className="text-gray-800">{caption.text}</div>
            </div>
            
            <div className="flex-shrink-0 flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity">
              <button className="text-gray-400 hover:text-gray-700">
                <Edit className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-red-600">
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Caption preview */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className={cn(
          "p-3 rounded-lg max-w-md mx-auto text-center",
          captionsStyle === 'standard' 
            ? "bg-black/80 text-white" 
            : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium"
        )}>
          {captions.find(c => c.id === activeCaption)?.text || "Select a caption to preview"}
        </div>
      </div>
    </div>
  );
}
