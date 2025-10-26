import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Settings, 
  Palette,
  Bell,
  Moon,
  Sun,
  Globe,
  Save,
  Mail,
  Smartphone
} from 'lucide-react';
import { User } from '../types/auth';

interface PreferencesModuleProps {
  currentUser: User;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function PreferencesModule({ currentUser, isDark, onToggleTheme }: PreferencesModuleProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('Asia/Colombo');

  const handleSavePreferences = () => {
    // In a real app, this would save to backend
    alert('Preferences saved successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Preferences</h1>
            <p className="text-muted-foreground">Customize your personal settings and preferences</p>
          </div>
        </div>
        <Button onClick={handleSavePreferences} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDark ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
                <div>
                  <Label>Theme Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    {isDark ? 'Dark mode is active' : 'Light mode is active'}
                  </p>
                </div>
              </div>
              <Switch checked={isDark} onCheckedChange={onToggleTheme} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Display Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Sinhala">Sinhala (සිංහල)</SelectItem>
                  <SelectItem value="Tamil">Tamil (தமிழ்)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Colombo">Sri Lanka (GMT+5:30)</SelectItem>
                  <SelectItem value="Asia/Kolkata">India (GMT+5:30)</SelectItem>
                  <SelectItem value="Asia/Singapore">Singapore (GMT+8)</SelectItem>
                  <SelectItem value="Asia/Dubai">Dubai (GMT+4)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>Current time: {new Date().toLocaleTimeString('en-US', { timeZone: timezone })}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                </div>
              </div>
              <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser notifications</p>
                </div>
              </div>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                📧 Notifications will be sent to: <span className="font-medium text-foreground">{currentUser.email}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                <p className="mt-1 text-foreground font-medium">{currentUser.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
                <p className="mt-1 text-foreground font-medium">{currentUser.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                <p className="mt-1 text-foreground font-medium">{currentUser.department}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                💡 To change your account information, please contact your system administrator or IT support at <span className="font-medium text-primary">it-support@haleon.lk</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Limited Access</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                You have access to basic preference settings. For advanced system configuration, user management, 
                and security settings, please contact your system administrator.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
