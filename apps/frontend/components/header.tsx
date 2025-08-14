'use client';
import React from 'react';
import Link from 'next/link';
import { Search, Bell, HelpCircle, Plus } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const { logout } = useAuth0();
  return (
    <header className={cn("flex items-center justify-between p-3 bg-white border-b border-gray-200 shadow-sm", className)}>
      <div className="flex items-center gap-3">
        <Link href="/dashboard/projects/new">
          <Button 
            variant="default" 
            size="sm" 
            className="gap-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white border-0 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>
      
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, clips, media..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
          <HelpCircle className="h-5 w-5 text-gray-500" />
        </button>
        <div className="relative">
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-500" />
          </button>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </div>
        <button className="bg-gray-100 p-0.5 rounded-full hover:bg-gray-200 transition-colors" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium text-sm">
            U
          </div>
        </button>
      </div>
    </header>
  );
}
