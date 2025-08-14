import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Plus,
  Filter, 
  ArrowDownUp, 
  Clock,
  Film,
  MoreVertical,
  Play
} from 'lucide-react';

// Mock data
const clips = [
  { 
    id: '1', 
    title: 'Product Feature Highlight', 
    thumbnail: undefined, 
    created: '2 days ago', 
    duration: '0:45',
    views: '1.2k',
    platform: 'YouTube'
  },
  { 
    id: '2', 
    title: 'Tutorial Intro Clip', 
    thumbnail: undefined, 
    created: '4 days ago', 
    duration: '0:30',
    views: '856',
    platform: 'Instagram'
  },
  { 
    id: '3', 
    title: 'Customer Testimonial Highlight', 
    thumbnail: undefined, 
    created: '1 week ago', 
    duration: '0:22',
    views: '3.1k',
    platform: 'TikTok'
  },
  { 
    id: '4', 
    title: 'Quick Tip #1', 
    thumbnail: undefined, 
    created: '1 week ago', 
    duration: '0:18',
    views: '672',
    platform: 'LinkedIn'
  },
  { 
    id: '5', 
    title: 'Product Launch Teaser', 
    thumbnail: undefined, 
    created: '2 weeks ago', 
    duration: '0:15',
    views: '1.5k',
    platform: 'Twitter'
  },
  { 
    id: '6', 
    title: 'Behind the Scenes', 
    thumbnail: undefined, 
    created: '2 weeks ago', 
    duration: '1:20',
    views: '982',
    platform: 'YouTube'
  },
  { 
    id: '7', 
    title: 'Quick Demo', 
    thumbnail: undefined, 
    created: '3 weeks ago', 
    duration: '0:40',
    views: '452',
    platform: 'Instagram'
  },
  { 
    id: '8', 
    title: 'Feature Comparison', 
    thumbnail: undefined, 
    created: '1 month ago', 
    duration: '0:55',
    views: '1.8k',
    platform: 'YouTube'
  },
];

// Platform icons or colors
const platformColors: Record<string, string> = {
  'YouTube': 'bg-red-500',
  'Instagram': 'bg-purple-500',
  'TikTok': 'bg-black',
  'Twitter': 'bg-blue-400',
  'LinkedIn': 'bg-blue-600',
};

export default function ClipsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Clips</h1>
        <Link href="/dashboard/clips/create">
          <Button variant="default" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Create Clip
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <ArrowDownUp className="h-4 w-4" />
            Sort
          </Button>
          <Button variant="ghost" size="sm">All Clips</Button>
          <Button variant="ghost" size="sm">Recent</Button>
          <Button variant="ghost" size="sm">Popular</Button>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {clips.length} clips
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {clips.map((clip) => (
          <div 
            key={clip.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <Link href={`/dashboard/clips/${clip.id}`} className="block">
              <div className="relative aspect-video bg-gray-200">
                {clip.thumbnail ? (
                  <img 
                    src={clip.thumbnail} 
                    alt={clip.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Film className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                  <Play className="h-12 w-12 text-white" />
                </div>
                
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {clip.duration}
                </div>
                
                {/* Platform badge */}
                <div className={`absolute top-2 left-2 ${platformColors[clip.platform] || 'bg-gray-500'} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                  {clip.platform.charAt(0)}
                </div>
              </div>
            </Link>
            
            <div className="p-3">
              <div className="flex justify-between items-start">
                <Link href={`/dashboard/clips/${clip.id}`} className="block">
                  <h3 className="font-medium text-gray-900 line-clamp-1">{clip.title}</h3>
                </Link>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{clip.created}</span>
                </div>
                <div>•</div>
                <div>{clip.views} views</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
