import { Truck, Clock, MapPin, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

export default function DistributionDashboard() {
  const kpiData = [
    {
      title: 'Active Deliveries',
      value: '48',
      change: '12 in transit',
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      title: 'On-Time Delivery',
      value: '94%',
      change: '+2% this week',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      title: 'Routes Today',
      value: '23',
      change: '8 completed',
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
    {
      title: 'Orders Delivered',
      value: '1,245',
      change: '+15% this month',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
  ];

  const activeDeliveries = [
    { order: 'ORD-9923', destination: 'Colombo Central Hospital', driver: 'Rohan Fernando', status: 'In Transit' },
    { order: 'ORD-9922', destination: 'Kandy Medical Center', driver: 'Priya Wijesinghe', status: 'Loading' },
    { order: 'ORD-9921', destination: 'Galle Pharmacy Network', driver: 'Chaminda Silva', status: 'Delivered' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Distribution Dashboard</h1>
        <p className="text-muted-foreground">Track deliveries and logistics</p>
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

      {/* Active Deliveries */}
      <Card className="p-6 border-border">
        <h2 className="text-xl font-bold text-foreground mb-4">Active Deliveries</h2>
        <div className="space-y-3">
          {activeDeliveries.map((delivery) => (
            <div key={delivery.order} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="font-semibold text-foreground">{delivery.order}</p>
                <p className="text-sm text-muted-foreground">{delivery.destination}</p>
                <p className="text-xs text-muted-foreground">Driver: {delivery.driver}</p>
              </div>
              <div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  delivery.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  delivery.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {delivery.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
