import { Package, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';

export default function ProcurementDashboard() {
  const kpiData = [
    {
      title: 'Active Purchase Orders',
      value: '24',
      change: '+6 this week',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      title: 'Pending Approvals',
      value: '8',
      change: '3 urgent',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
    {
      title: 'Total Suppliers',
      value: '156',
      change: '+12 new',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      title: 'Monthly Spend',
      value: 'LKR 45.2M',
      change: '+8.3%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
  ];

  const recentPOs = [
    { id: 'PO-8845', supplier: 'PharmaChem Ingredients', amount: 'LKR 29.04M', status: 'Approved' },
    { id: 'PO-8844', supplier: 'European Gelatin Suppliers', amount: 'LKR 13.56M', status: 'Pending' },
    { id: 'PO-8843', supplier: 'Global Packaging Solutions', amount: 'LKR 22.5M', status: 'Received' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Procurement Dashboard</h1>
        <p className="text-muted-foreground">Manage suppliers and purchase orders</p>
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

      {/* Recent Purchase Orders */}
      <Card className="p-6 border-border">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Purchase Orders</h2>
        <div className="space-y-3">
          {recentPOs.map((po) => (
            <div key={po.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="font-semibold text-foreground">{po.id}</p>
                <p className="text-sm text-muted-foreground">{po.supplier}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{po.amount}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  po.status === 'Approved' ? 'bg-green-100 text-green-700' :
                  po.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {po.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
