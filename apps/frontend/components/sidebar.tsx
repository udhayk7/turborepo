"use client";
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  Home, 
  VideoIcon, 
  Image, 
  Music, 
  PanelLeft, 
  Settings, 
  LogOut,
  Film
} from 'lucide-react';

type SidebarProps = {
  className?: string;
};

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: VideoIcon,
  },
  {
    title: 'Clips',
    href: '/dashboard/clips',
    icon: Film,
  },
  {
    title: 'Media Library',
    href: '/dashboard/media',
    icon: Image,
  },
  {
    title: 'Audio',
    href: '/dashboard/audio',
    icon: Music,
  },
];

const bottomNavItems: NavItem[] = [
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    title: 'Log Out',
    href: '/login',
    icon: LogOut,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-gray-900 w-64 p-4",
        className
      )}
    >
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="h-8 w-8 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold">
          O
        </div>
        <span className="font-semibold text-xl text-white">OpusPro</span>
      </div>

      <nav className="space-y-1 flex-1">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white group transition-colors"
          >
            <item.icon className="h-5 w-5 text-gray-400 group-hover:text-primary-400" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="pt-4 mt-auto border-t border-gray-700 space-y-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white group mt-1 transition-colors"
        >
          <Settings className="h-5 w-5 text-gray-400 group-hover:text-primary-400" />
          Settings
        </Link>
        {isAuthenticated ? (
          <button
            className="w-full text-left flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white group mt-1 transition-colors"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            <LogOut className="h-5 w-5 text-gray-400 group-hover:text-primary-400" />
            Log Out
          </button>
        ) : (
          <button
            className="w-full text-left flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white group mt-1 transition-colors"
            onClick={() => loginWithRedirect({ appState: { returnTo: '/dashboard' } })}
          >
            <LogOut className="h-5 w-5 text-gray-400 group-hover:text-primary-400" />
            Log In
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 mt-6 px-3 py-3 rounded-md bg-gray-800">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium">
          U
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">User Name</span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-xs text-gray-400">Pro Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
