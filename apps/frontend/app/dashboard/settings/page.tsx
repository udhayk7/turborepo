import { Button } from '@/components/ui/button';
import { 
  User,
  CreditCard,
  Bell,
  Shield,
  Zap,
  Share2,
  Palette,
  Cloud
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Settings menu */}
          <div className="border-r border-gray-200 p-4 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <CreditCard className="h-5 w-5" />
              <span>Billing</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Shield className="h-5 w-5" />
              <span>Security</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Zap className="h-5 w-5" />
              <span>API Access</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Share2 className="h-5 w-5" />
              <span>Integrations</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Palette className="h-5 w-5" />
              <span>Appearance</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Cloud className="h-5 w-5" />
              <span>Storage</span>
            </button>
          </div>
          
          {/* Profile settings content */}
          <div className="col-span-4 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-5">Profile Settings</h2>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
                  <User className="h-10 w-10" />
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Avatar
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue="John"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue="Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="Acme Inc."
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive emails about your account activity</div>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      className="opacity-0 w-0 h-0" 
                      id="toggleNotifications" 
                      defaultChecked 
                    />
                    <label 
                      htmlFor="toggleNotifications"
                      className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-primary-500 rounded-full transition-all duration-300 before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300"
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Marketing Communications</div>
                    <div className="text-sm text-gray-500">Receive emails about new features and offers</div>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      className="opacity-0 w-0 h-0" 
                      id="toggleMarketing" 
                    />
                    <label 
                      htmlFor="toggleMarketing"
                      className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300"
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input 
                      type="checkbox" 
                      className="opacity-0 w-0 h-0" 
                      id="toggle2FA" 
                    />
                    <label 
                      htmlFor="toggle2FA"
                      className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300"
                    ></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button variant="default">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Connected accounts section */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Connected Accounts</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="font-bold text-red-600">Y</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">YouTube</div>
                <div className="text-sm text-gray-500">Connected</div>
              </div>
            </div>
            
            <Button variant="outline" size="sm">Disconnect</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="font-bold text-white">I</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Instagram</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            
            <Button variant="default" size="sm">Connect</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <span className="font-bold text-white">T</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">TikTok</div>
                <div className="text-sm text-gray-500">Not connected</div>
              </div>
            </div>
            
            <Button variant="default" size="sm">Connect</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
