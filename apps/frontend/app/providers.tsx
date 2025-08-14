'use client';

import { Auth0Provider } from '@auth0/auth0-react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string;
  const redirectUri = typeof window !== 'undefined' ? window.location.origin + '/dashboard' : undefined;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
    >
      {children}
    </Auth0Provider>
  );
}


