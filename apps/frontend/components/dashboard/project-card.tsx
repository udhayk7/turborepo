import React from 'react';
import Link from 'next/link';
import { MoreVertical, Clock, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProjectCardProps = {
  id: string;
  title: string;
  thumbnail?: string;
  created: string;
  duration: string;
  className?: string;
};

export function ProjectCard({ 
  id, 
  title, 
  thumbnail, 
  created, 
  duration, 
  className 
}: ProjectCardProps) {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group", className)}>
      <Link href={`/dashboard/projects/${id}`} className="block">
        <div className="relative aspect-video bg-gray-100">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No thumbnail</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
            <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-200">
              <Play className="h-5 w-5 text-white ml-0.5" />
            </div>
          </div>
          
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
            {duration}
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link href={`/dashboard/projects/${id}`} className="block">
            <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{title}</h3>
          </Link>
          <button className="p-1.5 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{created}</span>
          </div>
          <div>•</div>
          <div>{duration}</div>
        </div>
      </div>
    </div>
  );
}
