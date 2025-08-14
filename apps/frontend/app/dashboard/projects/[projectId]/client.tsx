'use client';

import React, { useState } from 'react';
import { VideoPlayer } from '@/components/dashboard/video-player';
import { TimelineEditor } from '@/components/dashboard/timeline-editor';
import { CaptionsEditor } from '@/components/dashboard/captions-editor';
import { ExportModal } from '@/components/dashboard/export-modal';
import { Button } from '@/components/ui/button';
import { 
  Layers, 
  Text, 
  Music, 
  Image as ImageIcon, 
  Film, 
  Wand2,
  ChevronDown,
  FileDown
} from 'lucide-react';

type ProjectEditorProps = {
  projectId: string;
};

type Tab = 'media' | 'text' | 'audio' | 'graphics' | 'effects';

export function ProjectEditor({ projectId }: ProjectEditorProps) {
  const [activeTab, setActiveTab] = useState<Tab>('media');
  const [showExportModal, setShowExportModal] = useState(false);
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'media':
        return (
          <div className="grid grid-cols-3 gap-3 p-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="aspect-video bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 cursor-pointer">
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Video clip {item}
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'text':
        return (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Title', 'Subtitle', 'Caption', 'Lower Third', 'Quote', 'End Card'].map((style) => (
                <div key={style} className="border border-gray-200 rounded-lg p-3 hover:border-primary-500 cursor-pointer">
                  <div className="text-center font-medium text-gray-800 mb-2">{style}</div>
                  <div className="h-12 bg-gray-100 rounded flex items-center justify-center">
                    <Text className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'audio':
        return (
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Background Music</h4>
              <div className="grid grid-cols-2 gap-3">
                {['Upbeat', 'Cinematic', 'Relaxed', 'Dramatic'].map((style) => (
                  <div key={style} className="border border-gray-200 rounded-lg p-3 flex items-center gap-3 hover:border-primary-500 cursor-pointer">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Music className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{style}</div>
                      <div className="text-xs text-gray-500">8 tracks</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Sound Effects</h4>
              <div className="grid grid-cols-3 gap-2">
                {['Transition', 'Notification', 'Impact', 'Whoosh', 'Pop', 'Ambient'].map((effect) => (
                  <div key={effect} className="border border-gray-200 rounded-lg p-2 text-center text-sm hover:border-primary-500 cursor-pointer">
                    {effect}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'graphics':
        return (
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Logos</h4>
              <div className="flex gap-3">
                <button className="p-8 border border-dashed border-gray-300 rounded-lg hover:border-primary-500">
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Upload logo</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Shapes & Icons</h4>
              <div className="grid grid-cols-4 gap-2">
                {['Rectangle', 'Circle', 'Triangle', 'Arrow', 'Star', 'Heart', 'Speech', 'Line'].map((shape) => (
                  <div key={shape} className="border border-gray-200 rounded-lg p-3 flex flex-col items-center gap-1 hover:border-primary-500 cursor-pointer">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-400 rounded" />
                    </div>
                    <span className="text-xs text-gray-600">{shape}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'effects':
        return (
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Transitions</h4>
              <div className="grid grid-cols-3 gap-2">
                {['Cut', 'Fade', 'Dissolve', 'Slide', 'Wipe', 'Zoom'].map((transition) => (
                  <div key={transition} className="border border-gray-200 rounded-lg p-3 text-center hover:border-primary-500 cursor-pointer">
                    <Film className="h-5 w-5 mx-auto mb-1 text-gray-400" />
                    <span className="text-sm">{transition}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Filters</h4>
              <div className="grid grid-cols-4 gap-2">
                {['None', 'Vivid', 'Dramatic', 'Cool', 'Warm', 'Vintage', 'B&W', 'Sepia'].map((filter) => (
                  <div key={filter} className="border border-gray-200 rounded-lg p-2 text-center text-sm hover:border-primary-500 cursor-pointer">
                    {filter}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-5 gap-6">
      {/* Export Modal */}
      <ExportModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)} 
      />

      {/* Main editor */}
      <div className="col-span-3 space-y-4">
        {/* Video preview */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden p-4">
          <div className="relative">
            <VideoPlayer className="aspect-video" />
            <div className="absolute top-4 right-4">
              <Button 
                variant="default" 
                size="sm" 
                className="gap-1.5"
                onClick={() => setShowExportModal(true)}
              >
                <FileDown className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
        
        {/* Timeline editor */}
        <TimelineEditor />
        
        {/* Project details */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex gap-3 mb-3">
            <input 
              type="text" 
              defaultValue="Product Demo Video" 
              className="text-xl font-semibold text-gray-900 border-0 focus:outline-none focus:ring-0 flex-1" 
            />
            <Button variant="outline" size="sm">Edit Details</Button>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-600">
            <div>Created: Aug 11, 2025</div>
            <div>Duration: 00:18:45</div>
            <div>Format: 16:9</div>
            <div>Quality: 1080p</div>
          </div>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="col-span-2 space-y-4">
        {/* Tools tabs */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-2.5 px-3 text-sm font-medium ${activeTab === 'media' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('media')}
            >
              <div className="flex flex-col items-center gap-1">
                <Layers className="h-5 w-5" />
                <span>Media</span>
              </div>
            </button>
            
            <button 
              className={`flex-1 py-2.5 px-3 text-sm font-medium ${activeTab === 'text' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('text')}
            >
              <div className="flex flex-col items-center gap-1">
                <Text className="h-5 w-5" />
                <span>Text</span>
              </div>
            </button>
            
            <button 
              className={`flex-1 py-2.5 px-3 text-sm font-medium ${activeTab === 'audio' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('audio')}
            >
              <div className="flex flex-col items-center gap-1">
                <Music className="h-5 w-5" />
                <span>Audio</span>
              </div>
            </button>
            
            <button 
              className={`flex-1 py-2.5 px-3 text-sm font-medium ${activeTab === 'graphics' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('graphics')}
            >
              <div className="flex flex-col items-center gap-1">
                <ImageIcon className="h-5 w-5" />
                <span>Graphics</span>
              </div>
            </button>
            
            <button 
              className={`flex-1 py-2.5 px-3 text-sm font-medium ${activeTab === 'effects' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('effects')}
            >
              <div className="flex flex-col items-center gap-1">
                <Wand2 className="h-5 w-5" />
                <span>Effects</span>
              </div>
            </button>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
        
        {/* Captions editor */}
        <CaptionsEditor />
        
        {/* AI suggestions */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary-500" />
              <h3 className="font-medium">AI Suggestions</h3>
            </div>
            <Button variant="outline" size="sm" className="gap-1 text-xs">
              Generate More
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="p-3 space-y-3">
            <div className="border border-gray-100 rounded-lg p-2 hover:border-primary-300 cursor-pointer">
              <div className="text-sm font-medium text-gray-900">Add background music</div>
              <div className="text-xs text-gray-500">Upbeat electronic track would enhance the mood</div>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-2 hover:border-primary-300 cursor-pointer">
              <div className="text-sm font-medium text-gray-900">Trim intro sequence</div>
              <div className="text-xs text-gray-500">First 3 seconds could be removed for better pacing</div>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-2 hover:border-primary-300 cursor-pointer">
              <div className="text-sm font-medium text-gray-900">Enhance audio clarity</div>
              <div className="text-xs text-gray-500">Remove background noise for clearer voice</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
