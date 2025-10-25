import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import Login from './components/Login';
import MedicalTopNav from './components/MedicalTopNav';
import MedicalSidebar from './components/MedicalSidebar';
import MedicalDashboard from './components/MedicalDashboard';
import InventoryModule from './components/InventoryModule';
import ProcurementModule from './components/ProcurementModule';
import ProductionModule from './components/ProductionModule';
import WarehouseModule from './components/WarehouseModule';
import OrderManagementModule from './components/OrderManagementModule';
import QualityControlModule from './components/QualityControlModule';
import AnalyticsModule from './components/AnalyticsModule';
import UserManagementModule from './components/UserManagementModule';
import { SettingsModule } from './components/SettingsModule';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveModule('dashboard');
  };

  const handleToggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <MedicalDashboard />;
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
        />

        {/* Main content area with top nav and content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <MedicalTopNav
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            onToggleTheme={handleToggleTheme}
            isDark={isDark}
            onLogout={handleLogout}
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
