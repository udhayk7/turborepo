import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import dynamic from 'next/dynamic';

const AuthGuard = dynamic(() => import('@/components/auth-guard'), { ssr: false });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 bg-[#F8F9FB]">
          <div className="container max-w-7xl mx-auto">
            <AuthGuard>
              {children}
            </AuthGuard>
          </div>
        </main>
      </div>
    </div>
  );
}
