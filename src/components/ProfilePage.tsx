import { User, Mail, Building2, Shield, Calendar, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { User as UserType } from '../types/auth';

interface ProfilePageProps {
  currentUser: UserType;
}

export default function ProfilePage({ currentUser }: ProfilePageProps) {
  const formatRole = (role: string) => {
    return role.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">View and manage your account information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="p-6 md:col-span-1 border-border">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
              <p className="text-sm text-muted-foreground capitalize">{formatRole(currentUser.role)}</p>
            </div>
            <Separator />
            <div className="w-full space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{currentUser.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">User ID: {currentUser.id}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Details */}
        <Card className="p-6 md:col-span-2 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={currentUser.name}
                  disabled
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="bg-secondary"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={currentUser.department}
                  disabled
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formatRole(currentUser.role)}
                  disabled
                  className="bg-secondary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Office Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  value="Haleon Sri Lanka - Colombo Office"
                  disabled
                  className="bg-secondary pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinDate">Member Since</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="joinDate"
                  value="January 2024"
                  disabled
                  className="bg-secondary pl-10"
                />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" disabled>
                Edit Profile
              </Button>
              <Button variant="outline" className="flex-1" disabled>
                Change Password
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Contact your system administrator to update profile information
            </p>
          </div>
        </Card>
      </div>

      {/* Access Permissions Card */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Access Permissions</h3>
        <p className="text-sm text-muted-foreground mb-4">
          As a {formatRole(currentUser.role)}, you have access to the following modules:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'inventory', label: 'Inventory' },
            { id: 'procurement', label: 'Procurement' },
            { id: 'production', label: 'Production' },
            { id: 'warehouse', label: 'Warehouse' },
            { id: 'orders', label: 'Orders' },
            { id: 'quality', label: 'Quality Control' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'users', label: 'Users' },
            { id: 'settings', label: 'Settings' },
          ].map((module) => {
            const hasAccess = currentUser.role === 'admin' || 
              (currentUser.role === 'procurement-manager' && ['dashboard', 'procurement', 'inventory', 'production', 'analytics', 'settings'].includes(module.id)) ||
              (currentUser.role === 'warehouse-officer' && ['dashboard', 'warehouse', 'inventory', 'orders', 'settings'].includes(module.id)) ||
              (currentUser.role === 'distribution-manager' && ['dashboard', 'orders', 'warehouse', 'inventory', 'analytics', 'settings'].includes(module.id));

            return (
              <div
                key={module.id}
                className={`px-3 py-2 rounded-lg text-sm text-center ${
                  hasAccess
                    ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                    : 'bg-secondary text-muted-foreground border border-border'
                }`}
              >
                {module.label}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Security Info */}
      <Card className="p-6 border-border bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Security Notice</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Your account is protected and monitored. Never share your password with anyone. 
              If you notice any suspicious activity, contact IT support immediately at it-support@haleon.lk
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
