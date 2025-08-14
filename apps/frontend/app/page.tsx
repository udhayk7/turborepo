import Link from 'next/link';
import dynamic from 'next/dynamic';
const AuthButtons = dynamic(() => import('@/components/auth-buttons'), { ssr: false });
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Brain, Zap, Edit } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary-500" />
            <span className="font-semibold text-xl">OpusPro</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-700 hover:text-primary-600">Features</Link>
            <Link href="#pricing" className="text-sm text-gray-700 hover:text-primary-600">Pricing</Link>
            <Link href="#testimonials" className="text-sm text-gray-700 hover:text-primary-600">Testimonials</Link>
          </nav>
          <AuthButtons />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
              Create Professional Videos with AI
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              OpusPro helps you edit, enhance, and publish professional-quality videos in minutes using the power of AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard">
                <Button variant="default" size="lg" className="gap-2">
                  Get started for free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch demo
              </Button>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-[400px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Dashboard preview image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">AI-Powered Video Creation</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-gray-50">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Editing</h3>
                <p className="text-gray-600">
                  Our AI automatically finds the best moments in your footage and creates professional clips.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gray-50">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Captions</h3>
                <p className="text-gray-600">
                  Generate accurate captions in multiple languages with perfect timing.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gray-50">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Edit className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">B-Roll Generation</h3>
                <p className="text-gray-600">
                  Enhance your videos with AI-suggested B-roll that matches your content perfectly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to create amazing videos?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Join thousands of content creators who are saving time and producing better videos with OpusPro.
            </p>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">
                Get started for free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Video className="h-6 w-6 text-primary-400" />
              <span className="font-semibold text-lg text-white">OpusPro</span>
            </div>
            <div className="flex gap-4 text-sm">
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} OpusPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
