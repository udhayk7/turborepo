import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/dashboard/project-card';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Plus, Video, Clock, Zap, BarChart3 } from 'lucide-react';

// Mock data
const recentProjects = [
  { 
    id: '1', 
    title: 'Product Showcase Video', 
    thumbnail: undefined, 
    created: '3 days ago', 
    duration: '2:45' 
  },
  { 
    id: '2', 
    title: 'YouTube Tutorial', 
    thumbnail: undefined, 
    created: '1 week ago', 
    duration: '12:18' 
  },
  { 
    id: '3', 
    title: 'Social Media Promo', 
    thumbnail: undefined, 
    created: '2 weeks ago', 
    duration: '0:45' 
  },
  { 
    id: '4', 
    title: 'Customer Testimonial', 
    thumbnail: undefined, 
    created: '3 weeks ago', 
    duration: '5:30' 
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <Link href="/dashboard/projects/new">
          <Button variant="default" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Projects"
          value="12"
          icon={<Video className="h-5 w-5 text-primary-500" />}
          className="border-l-4 border-primary-500"
        />
        <StatsCard
          title="Storage Used"
          value="1.8 GB"
          description="6.2 GB remaining"
          icon={<BarChart3 className="h-5 w-5 text-blue-500" />}
          className="border-l-4 border-blue-500"
        />
        <StatsCard
          title="Processing Time"
          value="45 min"
          description="This month"
          icon={<Clock className="h-5 w-5 text-orange-500" />}
          className="border-l-4 border-orange-500"
        />
        <StatsCard
          title="AI Credits"
          value="120"
          description="Renews in 12 days"
          icon={<Zap className="h-5 w-5 text-secondary-500" />}
          className="border-l-4 border-secondary-500"
        />
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
          <Link href="/dashboard/projects" className="text-sm text-primary-600 hover:underline">
            View all projects
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              id={project.id}
              title={project.title}
              thumbnail={project.thumbnail}
              created={project.created}
              duration={project.duration}
            />
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Getting Started with OpusPro</h2>
        <p className="text-gray-600 mb-4">
          Learn how to create professional videos with AI assistance in minutes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-medium mb-3">
              1
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Upload Content</h3>
            <p className="text-sm text-gray-600">
              Upload your video files or connect your content from YouTube, TikTok, or other platforms.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-medium mb-3">
              2
            </div>
            <h3 className="font-medium text-gray-900 mb-1">AI Editing</h3>
            <p className="text-sm text-gray-600">
              Let our AI analyze your content and suggest the best edits, clips, and enhancements.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-medium mb-3">
              3
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Export & Share</h3>
            <p className="text-sm text-gray-600">
              Choose your preferred format and resolution, then export and share to any platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
