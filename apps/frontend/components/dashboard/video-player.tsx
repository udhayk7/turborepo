'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

type VideoPlayerProps = {
  src?: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
};

export function VideoPlayer({ src, poster, className, autoPlay = false }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Demo video source if none provided
  const videoSrc = src || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.play().catch(() => {
          setPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [playing]);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);
  
  const togglePlay = () => {
    setPlaying(!playing);
  };
  
  const toggleMute = () => {
    setMuted(!muted);
  };
  
  const handleProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isNaN(progress) ? 0 : progress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  const handleProgressBarClick = (e: React.MouseEvent) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    setMuted(value === 0);
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("relative group bg-black rounded-lg overflow-hidden", className)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src={videoSrc}
        poster={poster}
        onTimeUpdate={handleProgress}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
        playsInline
      />
      
      {/* Video overlay controls - visible on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        {/* Progress bar */}
        <div 
          ref={progressBarRef}
          className="w-full h-1.5 bg-gray-600/50 rounded-full mb-4 cursor-pointer"
          onClick={handleProgressBarClick}
        >
          <div 
            className="h-full bg-primary-500 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2"></div>
          </div>
        </div>
        
        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={togglePlay} 
              className="text-white hover:text-primary-300 transition-colors"
            >
              {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            
            <button className="text-white hover:text-primary-300 transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button className="text-white hover:text-primary-300 transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className="text-white hover:text-primary-300 transition-colors"
              >
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 accent-primary-500"
              />
            </div>
            
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-primary-300 transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
