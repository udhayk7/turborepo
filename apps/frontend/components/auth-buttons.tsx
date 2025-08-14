'use client';

import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';

export default function AuthButtons() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  if (isLoading) return null;

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="default" size="sm">Go to dashboard</Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Log out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button className="text-sm text-gray-700 hover:text-primary-600 font-medium" onClick={() => loginWithRedirect({ appState: { returnTo: '/dashboard' } })}>Log in</button>
      <Link href="/dashboard">
        <Button variant="default" size="sm">Start for free</Button>
      </Link>
    </div>
  );
}


