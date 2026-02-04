import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Bell, Shield, Palette } from 'lucide-react';
export function Settings() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings ⚙️</h1>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-fuchsia-500" />
            Profile
          </h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold">
              AC
            </div>
            <Button variant="secondary" size="sm">
              Change Avatar
            </Button>
          </div>
          <div className="grid gap-4">
            <Input label="Display Name" defaultValue="Alex Chen" />
            <Input label="Email" defaultValue="alex@university.edu" />
            <Input label="Bio" defaultValue="Student @ State University 🎓" />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-fuchsia-500" />
            Appearance
          </h2>
          <div className="flex gap-4">
            <div className="flex-1 p-4 rounded-xl border-2 border-fuchsia-500 bg-fuchsia-50 cursor-pointer">
              <div className="font-medium text-fuchsia-900">Light Mode</div>
              <div className="text-sm text-fuchsia-700">Vibrant & Clean</div>
            </div>
            <div className="flex-1 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer opacity-50">
              <div className="font-medium text-gray-900">Dark Mode</div>
              <div className="text-sm text-gray-500">Coming Soon</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-fuchsia-500" />
            Notifications
          </h2>
          <div className="space-y-4">
            {[
            'Study Reminders',
            'Deadline Alerts',
            'Weekly Reports',
            'New Features'].
            map((item) =>
            <div key={item} className="flex items-center justify-between">
                <span className="text-gray-700">{item}</span>
                <div className="w-11 h-6 bg-fuchsia-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>);

}