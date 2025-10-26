import { Package, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';

export default function WarehouseDashboard() {
  const kpiData = [
    {
      title: 'Stock Items',
      value: '847',
      change: '95% capacity',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      title: 'Low Stock Alerts',
      value: '12',
      change: 'Requires action',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
    {
      title: 'Orders Processed',
      value: '342',
      change: '+18 today',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      title: 'Inventory Value',
      value: 'LKR 1,740M',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
  ];

  const lowStockItems = [
    { product: 'Sensodyne Toothpaste', current: 120, minimum: 200, location: 'Colombo' },
    { product: 'Panadol Tablets', current: 85, minimum: 150, location: 'Ratmalana' },
    { product: 'Centrum Vitamins', current: 45, minimum: 100, location: 'Katunayake' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Warehouse Dashboard</h1>
        <p className="text-muted-foreground">Monitor inventory and stock levels</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="p-6 border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-foreground mb-1">{kpi.value}</h3>
                <p className="text-xs text-muted-foreground">{kpi.change}</p>
              </div>
              <div className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Low Stock Alerts */}
      <Card className="p-6 border-border">
        <h2 className="text-xl font-bold text-foreground mb-4">Low Stock Alerts</h2>
        <div className="space-y-3">
          {lowStockItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="font-semibold text-foreground">{item.product}</p>
                <p className="text-sm text-muted-foreground">{item.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground">
                  Current: <span className="font-semibold text-orange-600">{item.current}</span>
                </p>
                <p className="text-xs text-muted-foreground">Min: {item.minimum}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
