'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) throw new Error('not ok');
        const data = await res.json();
        if (!data || !data.user) {
          router.replace('/api/auth/login?returnTo=/dashboard');
          return;
        }
      } catch (_) {
        router.replace('/api/auth/login?returnTo=/dashboard');
        return;
      } finally {
        if (!cancelled) setChecked(true);
      }
    };
    check();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!checked) return null;
  return <>{children}</>;
}


