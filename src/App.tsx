import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import Login from './components/Login';
import MedicalTopNav from './components/MedicalTopNav';
import MedicalSidebar from './components/MedicalSidebar';
import MedicalDashboard from './components/MedicalDashboard';
import ProcurementDashboard from './components/ProcurementDashboard';
import WarehouseDashboard from './components/WarehouseDashboard';
import DistributionDashboard from './components/DistributionDashboard';
import ProfilePage from './components/ProfilePage';
import InventoryModule from './components/InventoryModule';
import ProcurementModule from './components/ProcurementModule';
import ProductionModule from './components/ProductionModule';
import WarehouseModule from './components/WarehouseModule';
import OrderManagementModule from './components/OrderManagementModule';
import QualityControlModule from './components/QualityControlModule';
import AnalyticsModule from './components/AnalyticsModule';
import UserManagementModule from './components/UserManagementModule';
import { SettingsModule } from './components/SettingsModule';
import { PreferencesModule } from './components/PreferencesModule';
import { User, ROLE_PERMISSIONS } from './types/auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveModule('dashboard');
  };

  const handleToggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  // Get allowed modules for current user
  const allowedModules = currentUser ? ROLE_PERMISSIONS[currentUser.role] : [];
  
  // Check if user can access the module
  const canAccessModule = (module: string) => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    return allowedModules.includes(module);
  };

  const renderContent = () => {
    // Show profile page
    if (activeModule === 'profile') {
      if (!currentUser) return <MedicalDashboard />;
      return <ProfilePage currentUser={currentUser} />;
    }

    // Show role-specific dashboard for dashboard module
    if (activeModule === 'dashboard') {
      if (!currentUser) return <MedicalDashboard />;
      
      switch (currentUser.role) {
        case 'procurement-manager':
          return <ProcurementDashboard />;
        case 'warehouse-officer':
          return <WarehouseDashboard />;
        case 'distribution-manager':
          return <DistributionDashboard />;
        case 'admin':
        default:
          return <MedicalDashboard />;
      }
    }

    // Check access before showing module
    if (!canAccessModule(activeModule)) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You don't have permission to access this module.</p>
          </div>
        </div>
      );
    }

    switch (activeModule) {
      case 'inventory':
        return <InventoryModule />;
      case 'procurement':
        return <ProcurementModule />;
      case 'production':
        return <ProductionModule />;
      case 'warehouse':
        return <WarehouseModule />;
      case 'orders':
        return <OrderManagementModule />;
      case 'quality':
        return <QualityControlModule />;
      case 'analytics':
        return <AnalyticsModule />;
      case 'users':
        return <UserManagementModule />;
      case 'settings':
        return <SettingsModule />;
      case 'preferences':
        if (!currentUser) return <MedicalDashboard />;
        return <PreferencesModule currentUser={currentUser} isDark={isDark} onToggleTheme={handleToggleTheme} />;
      default:
        return <MedicalDashboard />;
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <Login onLogin={handleLogin} />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="h-screen flex bg-background transition-colors overflow-hidden">
        {/* Sidebar */}
        <MedicalSidebar
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          collapsed={sidebarCollapsed}
          currentUser={currentUser}
        />

        {/* Main content area with top nav and content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <MedicalTopNav
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            onToggleTheme={handleToggleTheme}
            isDark={isDark}
            onLogout={handleLogout}
            currentUser={currentUser}
            onNavigateToProfile={() => setActiveModule('profile')}
          />

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
