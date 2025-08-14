import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Video, Check } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white py-6 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary-500" />
            <span className="font-semibold text-xl">OpusPro</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/login" className="text-sm text-gray-700 hover:text-primary-600">
              Already have an account?
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
              <p className="text-gray-600 mt-2">Get started with OpusPro today</p>
            </div>
            
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="work-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Work email
                </label>
                <input
                  type="email"
                  id="work-email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="you@company.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Create a strong password"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters with one number and one special character
                </p>
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                </label>
              </div>
              
              <Link href="/dashboard">
                <Button variant="default" className="w-full">
                  Create Account
                </Button>
              </Link>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.93 5.74c-.2-.08-1.15-.57-1.33-.64-.18-.06-.32-.09-.45.09-.13.17-.5.63-.62.76-.11.13-.23.15-.43.05-.2-.1-.85-.31-1.62-1-.6-.53-1-1.19-1.12-1.39-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.33-.45-.33-.12 0-.25-.01-.38-.01-.13 0-.35.05-.53.25-.18.2-.7.69-.7 1.67s.7 1.93.8 2.06c.1.13 1.4 2.13 3.38 2.99.47.2.84.32 1.13.41.47.15.91.13 1.25.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.08-.19-.13-.4-.21z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create amazing videos with AI</h2>
            
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-5 w-5 text-green-500">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">AI-Powered Editing</h3>
                  <p className="text-sm text-gray-600">Let our AI analyze your content and suggest the perfect edits</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-5 w-5 text-green-500">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">Smart Captions</h3>
                  <p className="text-sm text-gray-600">Generate accurate captions in multiple languages automatically</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-5 w-5 text-green-500">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">B-Roll Generation</h3>
                  <p className="text-sm text-gray-600">Our AI suggests and inserts relevant B-roll footage</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-5 w-5 text-green-500">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">Multi-Platform Export</h3>
                  <p className="text-sm text-gray-600">Optimize and export for any social media platform</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-gradient-to-r from-primary-50 to-purple-50 rounded-lg border border-primary-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-semibold">14</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">Free 14-day trial</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Get full access to all features for 14 days. No credit card required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-white py-4 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} OpusPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
