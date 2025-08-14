import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/dashboard/project-card';
import { Plus, Filter, ArrowDownUp } from 'lucide-react';

// Mock data
const allProjects = [
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
  },
  { 
    id: '5', 
    title: 'Product Demo for Website', 
    thumbnail: undefined, 
    created: '1 month ago', 
    duration: '3:15' 
  },
  { 
    id: '6', 
    title: 'Internal Training Video', 
    thumbnail: undefined, 
    created: '1 month ago', 
    duration: '22:05' 
  },
  { 
    id: '7', 
    title: 'Conference Presentation', 
    thumbnail: undefined, 
    created: '2 months ago', 
    duration: '18:30' 
  },
  { 
    id: '8', 
    title: 'Marketing Campaign Video', 
    thumbnail: undefined, 
    created: '2 months ago', 
    duration: '1:45' 
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
        <Link href="/dashboard/projects/new">
          <Button variant="default" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Project
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
          <Button variant="ghost" size="sm">All</Button>
          <Button variant="ghost" size="sm">Recent</Button>
          <Button variant="ghost" size="sm">Archived</Button>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing 8 projects
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {allProjects.map((project) => (
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
  );
}
