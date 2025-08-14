import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Plus,
  Filter, 
  ArrowDownUp, 
  LayoutGrid,
  List,
  Music,
  Volume,
  AudioWaveform,
  MoreVertical,
  Play,
  Pause,
  Clock,
  SearchIcon
} from 'lucide-react';

// Mock audio items
const audioItems = [
  { 
    id: '1', 
    name: 'Background Music 1', 
    type: 'music', 
    duration: '3:45', 
    modified: '2 days ago',
    category: 'Upbeat' 
  },
  { 
    id: '2', 
    name: 'Voiceover Track', 
    type: 'voice', 
    duration: '2:18', 
    modified: '3 days ago',
    category: 'Narration' 
  },
  { 
    id: '3', 
    name: 'Sound Effect - Notification', 
    type: 'effect', 
    duration: '0:02', 
    modified: '1 week ago',
    category: 'UI Sounds' 
  },
  { 
    id: '4', 
    name: 'Epic Cinematic', 
    type: 'music', 
    duration: '4:25', 
    modified: '1 week ago',
    category: 'Soundtrack' 
  },
  { 
    id: '5', 
    name: 'Ambient Background', 
    type: 'music', 
    duration: '5:30', 
    modified: '2 weeks ago',
    category: 'Ambient' 
  },
  { 
    id: '6', 
    name: 'Transition Effect', 
    type: 'effect', 
    duration: '0:03', 
    modified: '2 weeks ago',
    category: 'Transitions' 
  },
  { 
    id: '7', 
    name: 'Product Explanation', 
    type: 'voice', 
    duration: '1:45', 
    modified: '3 weeks ago',
    category: 'Narration' 
  },
  { 
    id: '8', 
    name: 'Upbeat Pop Track', 
    type: 'music', 
    duration: '3:12', 
    modified: '3 weeks ago',
    category: 'Pop' 
  },
  { 
    id: '9', 
    name: 'Corporate Background', 
    type: 'music', 
    duration: '2:58', 
    modified: '1 month ago',
    category: 'Corporate' 
  },
  { 
    id: '10', 
    name: 'Interview Audio', 
    type: 'voice', 
    duration: '12:05', 
    modified: '1 month ago',
    category: 'Interview' 
  }
];

// Get icon for audio type
const getAudioIcon = (type: string) => {
  switch (type) {
    case 'music': return <Music className="h-5 w-5 text-purple-500" />;
    case 'voice': return <AudioWaveform className="h-5 w-5 text-blue-500" />;
    case 'effect': return <Volume className="h-5 w-5 text-green-500" />;
    default: return <Music className="h-5 w-5 text-gray-500" />;
  }
};

export default function AudioLibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Audio Library</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-1.5">
            <AudioWaveform className="h-4 w-4" />
            Generate Audio
          </Button>
          <Button variant="default" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Upload Audio
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-3 border border-gray-200 rounded-lg">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search audio files..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <ArrowDownUp className="h-4 w-4" />
            Sort
          </Button>
          <div className="bg-white border border-gray-200 rounded-lg p-1 flex items-center">
            <Button variant="ghost" size="sm" className="px-2 rounded-r-none">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="px-2 rounded-l-none">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {audioItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getAudioIcon(item.type)}
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="relative bg-gray-50 rounded-md h-14 mb-3 overflow-hidden">
                {/* Waveform visualization */}
                <div className="absolute inset-0 px-4 flex items-center">
                  <div className="w-full h-8">
                    {/* Simulated waveform */}
                    <div className="flex items-center justify-between h-full">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div 
                          key={i}
                          className="w-0.5 bg-primary-400"
                          style={{ 
                            height: `${Math.sin(i * 0.2) * 50 + 50}%`,
                            opacity: i % 3 === 0 ? 0.7 : 0.4
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Play button overlay */}
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white rounded-full p-1.5 hover:bg-primary-600 transition-colors">
                  <Play className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{item.duration}</span>
                </div>
                <span>{item.modified}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Audio Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">AI Generated Audio</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <AudioWaveform className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">AI Voice Generation</h3>
                <p className="text-sm text-gray-600">Create realistic voice narration from text</p>
              </div>
            </div>
            <Button variant="default" size="sm" className="w-full">Generate Voice</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Music className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">AI Music Creation</h3>
                <p className="text-sm text-gray-600">Generate custom music for your videos</p>
              </div>
            </div>
            <Button variant="default" size="sm" className="w-full">Create Music</Button>
          </div>
        </div>
        
        <h3 className="font-medium text-gray-900 mb-3">Popular Categories</h3>
        <div className="flex flex-wrap gap-2">
          {['Upbeat', 'Cinematic', 'Corporate', 'Ambient', 'Energetic', 'Relaxing', 'Epic', 'Emotional'].map((category) => (
            <Button key={category} variant="outline" size="sm" className="rounded-full">
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
