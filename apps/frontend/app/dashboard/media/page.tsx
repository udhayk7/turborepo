import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Plus,
  Filter, 
  ArrowDownUp, 
  LayoutGrid,
  List,
  File,
  Video,
  Image as ImageIcon,
  Music,
  MoreHorizontal,
  Folder,
  Upload
} from 'lucide-react';

// Mock media items
const mediaItems = [
  { 
    id: '1', 
    name: 'Main Product Video.mp4', 
    type: 'video', 
    size: '1.2 GB', 
    modified: '2 days ago',
    duration: '15:42' 
  },
  { 
    id: '2', 
    name: 'Logo Animation.mp4', 
    type: 'video', 
    size: '58.3 MB', 
    modified: '1 week ago',
    duration: '0:12' 
  },
  { 
    id: '3', 
    name: 'Product Images', 
    type: 'folder', 
    size: '204.5 MB', 
    modified: '1 week ago',
    items: 24
  },
  { 
    id: '4', 
    name: 'Brand Assets', 
    type: 'folder', 
    size: '156.7 MB', 
    modified: '2 weeks ago',
    items: 18
  },
  { 
    id: '5', 
    name: 'Background Music.mp3', 
    type: 'audio', 
    size: '8.7 MB', 
    modified: '3 weeks ago',
    duration: '3:45' 
  },
  { 
    id: '6', 
    name: 'Company Logo.png', 
    type: 'image', 
    size: '2.1 MB', 
    modified: '1 month ago',
    dimensions: '2560 x 1440'
  },
  { 
    id: '7', 
    name: 'Presentation.pdf', 
    type: 'document', 
    size: '5.4 MB', 
    modified: '1 month ago',
    pages: 24
  },
  { 
    id: '8', 
    name: 'Customer Testimonial.mp4', 
    type: 'video', 
    size: '721.5 MB', 
    modified: '1 month ago',
    duration: '8:52'
  },
  { 
    id: '9', 
    name: 'Sound Effects', 
    type: 'folder', 
    size: '45.2 MB', 
    modified: '2 months ago',
    items: 12
  },
  { 
    id: '10', 
    name: 'Product Demo.mp4', 
    type: 'video', 
    size: '384.6 MB', 
    modified: '2 months ago',
    duration: '4:18'
  },
  { 
    id: '11', 
    name: 'Team Photo.jpg', 
    type: 'image', 
    size: '3.8 MB', 
    modified: '3 months ago',
    dimensions: '3840 x 2160'
  },
  { 
    id: '12', 
    name: 'Marketing Scripts.docx', 
    type: 'document', 
    size: '1.2 MB', 
    modified: '3 months ago',
    pages: 15
  },
];

// Icons for different file types
const getFileIcon = (type: string) => {
  switch (type) {
    case 'video': return <Video className="h-5 w-5 text-blue-500" />;
    case 'audio': return <Music className="h-5 w-5 text-green-500" />;
    case 'image': return <ImageIcon className="h-5 w-5 text-purple-500" />;
    case 'folder': return <Folder className="h-5 w-5 text-yellow-500" />;
    default: return <File className="h-5 w-5 text-gray-500" />;
  }
};

// Get additional info based on file type
const getFileInfo = (item: any) => {
  switch (item.type) {
    case 'video': return `${item.duration} • ${item.size}`;
    case 'audio': return `${item.duration} • ${item.size}`;
    case 'image': return `${item.dimensions} • ${item.size}`;
    case 'folder': return `${item.items} items • ${item.size}`;
    default: return `${item.pages} pages • ${item.size}`;
  }
};

export default function MediaLibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-1.5">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button variant="default" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Folder
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-white border border-gray-200 rounded-lg p-1 flex items-center">
            <Button variant="ghost" size="sm" className="rounded-r-none border-r">
              All Files
            </Button>
            <Button variant="ghost" size="sm" className="rounded-none border-r">
              Videos
            </Button>
            <Button variant="ghost" size="sm" className="rounded-none border-r">
              Images
            </Button>
            <Button variant="ghost" size="sm" className="rounded-none border-r">
              Audio
            </Button>
            <Button variant="ghost" size="sm" className="rounded-l-none">
              Documents
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <ArrowDownUp className="h-4 w-4" />
            Sort
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-white border border-gray-200 rounded-lg p-1 flex items-center">
            <Button variant="ghost" size="sm" className="px-2 rounded-r-none border-r">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="px-2 rounded-l-none">
              <List className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            {mediaItems.length} items
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          {mediaItems.map((item) => (
            <div 
              key={item.id}
              className="border border-gray-200 rounded-lg p-3 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getFileIcon(item.type)}
                  <span className="font-medium text-gray-900 truncate max-w-[160px]">
                    {item.name}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              {item.type === 'video' && (
                <div className="relative aspect-video bg-gray-100 rounded mb-3 overflow-hidden">
                  <div className="flex items-center justify-center h-full">
                    <Video className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
              )}
              
              {item.type === 'image' && (
                <div className="relative aspect-video bg-gray-100 rounded mb-3 overflow-hidden">
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div>{getFileInfo(item)}</div>
                <div>{item.modified}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
