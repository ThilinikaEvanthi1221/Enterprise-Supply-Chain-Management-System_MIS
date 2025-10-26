import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Factory, 
  Warehouse, 
  Truck, 
  Shield, 
  BarChart3, 
  Users, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { User, ROLE_PERMISSIONS } from '../types/auth';

interface MedicalSidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  collapsed: boolean;
  currentUser: User | null;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'procurement', label: 'Procurement', icon: ShoppingCart },
  { id: 'production', label: 'Production', icon: Factory },
  { id: 'warehouse', label: 'Warehouse', icon: Warehouse },
  { id: 'orders', label: 'Orders', icon: Truck },
  { id: 'quality', label: 'Quality Control', icon: Shield },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function MedicalSidebar({ activeModule, onModuleChange, collapsed, currentUser }: MedicalSidebarProps) {
  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => {
    if (!currentUser) return true; // Show all if no user (shouldn't happen)
    if (currentUser.role === 'admin') return true; // Admin sees all
    
    // Get allowed modules for this user
    const allowedModules = ROLE_PERMISSIONS[currentUser.role];
    return allowedModules.includes(item.id);
  });

  return (
    <aside 
      className={`h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex-shrink-0 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sidebar-foreground font-bold">HALEON</h1>
                <p className="text-xs text-muted-foreground">Supply Chain</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Package className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onModuleChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    } ${collapsed ? 'justify-center' : ''}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {isActive && <ChevronRight className="w-4 h-4" />}
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-muted-foreground text-center">
              © 2025 Haleon
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
