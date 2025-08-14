'use client';

import React, { useState } from 'react';
import { 
  Scissors, 
  Plus, 
  Trash, 
  Copy, 
  Type, 
  Volume, 
  Image as ImageIcon,
  ChevronDown,
  Move
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TimelineProps = {
  className?: string;
};

type Clip = {
  id: string;
  start: number;
  end: number;
  type: 'video' | 'audio' | 'caption' | 'image';
  color: string;
  name: string;
  selected?: boolean;
};

export function TimelineEditor({ className }: TimelineProps) {
  const [selectedTrack, setSelectedTrack] = useState<string | null>('video');
  const [zoom, setZoom] = useState(1);
  const [tracks, setTracks] = useState({
    video: [
      { id: 'v1', start: 0, end: 10, type: 'video', color: 'bg-primary-500', name: 'Main video', selected: true },
      { id: 'v2', start: 12, end: 18, type: 'video', color: 'bg-primary-400', name: 'B-roll 1' },
    ],
    audio: [
      { id: 'a1', start: 0, end: 8, type: 'audio', color: 'bg-green-500', name: 'Background music' },
      { id: 'a2', start: 8, end: 15, type: 'audio', color: 'bg-green-400', name: 'Voiceover' },
    ],
    captions: [
      { id: 'c1', start: 2, end: 5, type: 'caption', color: 'bg-yellow-500', name: 'Caption 1' },
      { id: 'c2', start: 7, end: 9, type: 'caption', color: 'bg-yellow-500', name: 'Caption 2' },
      { id: 'c3', start: 14, end: 16, type: 'caption', color: 'bg-yellow-500', name: 'Caption 3' },
    ],
    graphics: [
      { id: 'g1', start: 3, end: 7, type: 'image', color: 'bg-blue-500', name: 'Logo overlay' },
    ],
  });
  
  const timelineDuration = 20; // seconds
  const timelineWidth = timelineDuration * 50 * zoom; // 50px per second at zoom level 1
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };
  
  const selectClip = (trackName: string, clipId: string) => {
    setTracks(prev => {
      const newTracks = { ...prev };
      
      // Unselect all clips
      Object.keys(newTracks).forEach(track => {
        newTracks[track] = newTracks[track].map(clip => ({
          ...clip,
          selected: false
        }));
      });
      
      // Select the clicked clip
      newTracks[trackName] = newTracks[trackName].map(clip => ({
        ...clip,
        selected: clip.id === clipId
      }));
      
      return newTracks;
    });
    
    setSelectedTrack(trackName);
  };
  
  const getTrackIcon = (trackName: string) => {
    switch (trackName) {
      case 'video': return <ImageIcon className="w-4 h-4" />;
      case 'audio': return <Volume className="w-4 h-4" />;
      case 'captions': return <Type className="w-4 h-4" />;
      case 'graphics': return <ImageIcon className="w-4 h-4" />;
      default: return <ImageIcon className="w-4 h-4" />;
    }
  };
  
  const renderTimeMarkers = () => {
    const markers = [];
    
    for (let i = 0; i <= timelineDuration; i++) {
      markers.push(
        <div 
          key={i} 
          className="absolute top-0 h-full"
          style={{ left: `${(i / timelineDuration) * 100}%` }}
        >
          <div className="h-4 border-l border-gray-400"></div>
          <div className="text-xs text-gray-600">{formatTime(i)}</div>
        </div>
      );
    }
    
    return markers;
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg", className)}>
      {/* Timeline toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200">
        <button className="p-1.5 rounded hover:bg-gray-100">
          <Scissors className="w-4 h-4 text-gray-700" />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-100">
          <Plus className="w-4 h-4 text-gray-700" />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-100">
          <Trash className="w-4 h-4 text-gray-700" />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-100">
          <Copy className="w-4 h-4 text-gray-700" />
        </button>
        
        <div className="h-5 border-l border-gray-300 mx-1"></div>
        
        <button 
          className="p-1.5 rounded hover:bg-gray-100" 
          onClick={handleZoomOut}
        >
          <span className="text-gray-700 font-medium text-sm">-</span>
        </button>
        <div className="text-xs text-gray-600">{Math.round(zoom * 100)}%</div>
        <button 
          className="p-1.5 rounded hover:bg-gray-100"
          onClick={handleZoomIn}
        >
          <span className="text-gray-700 font-medium text-sm">+</span>
        </button>
        
        <div className="ml-auto flex items-center gap-2">
          <div className="text-xs text-gray-600">Current: 00:03:24</div>
          <div className="text-xs text-gray-600">Total: 00:18:45</div>
        </div>
      </div>
      
      {/* Timeline tracks */}
      <div className="relative overflow-x-auto" style={{ height: '300px' }}>
        <div style={{ width: `${timelineWidth}px` }}>
          {/* Time markers */}
          <div className="relative h-6 border-b border-gray-200 bg-gray-50">
            {renderTimeMarkers()}
            
            {/* Playhead */}
            <div 
              className="absolute top-0 h-full border-l-2 border-red-500 z-10"
              style={{ left: '30%' }}
            >
              <div className="w-3 h-3 bg-red-500 rounded-full -translate-x-1/2"></div>
            </div>
          </div>
          
          {/* Tracks */}
          <div>
            {Object.keys(tracks).map((trackName) => (
              <div key={trackName} className="flex">
                {/* Track label */}
                <div 
                  className={cn(
                    "w-40 flex items-center gap-2 p-2 border-r border-b border-gray-200 bg-gray-50",
                    selectedTrack === trackName ? "bg-gray-100" : ""
                  )}
                >
                  <div className="flex-shrink-0">
                    {getTrackIcon(trackName)}
                  </div>
                  <div className="flex-1 font-medium text-sm truncate">
                    {trackName.charAt(0).toUpperCase() + trackName.slice(1)}
                  </div>
                  <button className="text-gray-400 hover:text-gray-700">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Track timeline */}
                <div 
                  className="relative flex-1 h-20 border-b border-gray-200"
                >
                  {tracks[trackName].map((clip) => (
                    <div
                      key={clip.id}
                      className={cn(
                        "absolute top-2 bottom-2 rounded",
                        clip.color,
                        clip.selected ? "ring-2 ring-black ring-offset-1" : ""
                      )}
                      style={{ 
                        left: `${(clip.start / timelineDuration) * 100}%`, 
                        width: `${((clip.end - clip.start) / timelineDuration) * 100}%` 
                      }}
                      onClick={() => selectClip(trackName, clip.id)}
                    >
                      <div className="flex items-center h-full px-2 text-white text-xs font-medium truncate">
                        {clip.name}
                      </div>
                      {/* Drag handles */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize bg-white bg-opacity-30"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize bg-white bg-opacity-30"></div>
                      {/* Move handle in middle */}
                      {clip.selected && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-0.5 cursor-move shadow-sm">
                          <Move className="w-3 h-3 text-gray-700" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
