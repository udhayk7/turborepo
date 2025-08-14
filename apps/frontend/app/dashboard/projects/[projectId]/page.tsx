import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Share2, 
  MoreHorizontal,
  MessageSquareText,
  Eye,
  FileDown,
  Zap
} from 'lucide-react';
import { ProjectEditor } from './client';
import { ProjectPageScript } from './script';

export default function ProjectDetailsPage({ params }: { params: { projectId: string } }) {
  return (
    <>
      <ProjectPageScript />
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Project Editor</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" id="header-export-btn">
            <FileDown className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Project details and editor */}
      <ProjectEditor projectId={params.projectId} />
      
      {/* AI Assistant section */}
      <div className="bg-white rounded-lg border border-primary-100 p-4 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
          <Zap className="h-5 w-5 text-primary-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">AI Assistant</h3>
          <p className="text-gray-600 text-sm mb-3">
            I've analyzed your video and found several highlights that would make great clips. Would you like me to create these for you?
          </p>
          <div className="flex gap-2">
            <Button variant="default" size="sm">Generate Clips</Button>
            <Button variant="outline" size="sm">Improve Audio</Button>
            <Button variant="outline" size="sm">Add Music</Button>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">
            <MessageSquareText className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
