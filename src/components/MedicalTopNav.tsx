import { useState } from 'react';
import { Search, Bell, User, Menu, Sun, Moon, LogOut } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';

interface MedicalTopNavProps {
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
  onLogout: () => void;
}

export default function MedicalTopNav({ onToggleSidebar, onToggleTheme, isDark, onLogout }: MedicalTopNavProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-4 gap-4 flex-shrink-0">
      {/* Menu Toggle */}
      <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
        <Menu className="w-5 h-5" />
      </Button>

      {/* Spacer to push search to center */}
      <div className="flex-1"></div>

      {/* Global Search - Centered */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products (Sensodyne, Centrum, Panadol...), suppliers, batches..."
            className="pl-10 bg-input-background"
            onFocus={() => setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 200)}
          />
        </div>
      </div>

      {/* Spacer to balance and push icons to right */}
      <div className="flex-1"></div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button variant="ghost" size="sm" onClick={onToggleTheme}>
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2">
              <p className="text-sm font-medium mb-2">Notifications</p>
              <div className="space-y-2">
                {[
                  { title: 'Low Stock Alert', desc: 'Sensodyne Repair & Protect below reorder level', time: '5m ago' },
                  { title: 'PO Approved', desc: 'Purchase Order #PO-8845 for raw materials approved', time: '23m ago' },
                  { title: 'QC Complete', desc: 'Panadol Batch #HAL-5513 passed inspection', time: '1h ago' },
                ].map((notif, idx) => (
                  <div key={idx} className="p-2 hover:bg-secondary rounded-lg cursor-pointer">
                    <p className="text-sm text-foreground">{notif.title}</p>
                    <p className="text-xs text-muted-foreground">{notif.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Menu className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
