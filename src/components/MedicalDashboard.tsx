import { Package, TrendingUp, AlertTriangle, Activity, Clock, CheckCircle2, PackageCheck, Truck } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const kpiData = [
  {
    title: 'Total Inventory Value',
    value: 'LKR 1,740M',
    change: '+12.3%',
    trend: 'up',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    title: 'Active Distribution Orders',
    value: '542',
    change: '+8.2%',
    trend: 'up',
    icon: Activity,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    title: 'Low Stock Products',
    value: '12',
    change: '-15%',
    trend: 'down',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
  },
  {
    title: 'Manufacturing Efficiency',
    value: '96.4%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
  },
];

const inventoryTrendData = [
  { month: 'Jan', raw: 450, finished: 320, inProduction: 180 },
  { month: 'Feb', raw: 520, finished: 380, inProduction: 210 },
  { month: 'Mar', raw: 480, finished: 420, inProduction: 190 },
  { month: 'Apr', raw: 590, finished: 460, inProduction: 230 },
  { month: 'May', raw: 610, finished: 520, inProduction: 250 },
  { month: 'Jun', raw: 670, finished: 580, inProduction: 280 },
];

const suppliesDistribution = [
  { name: 'Oral Care', value: 28, color: '#007AFF' },
  { name: 'Pain Relief', value: 24, color: '#00A9A5' },
  { name: 'Vitamins & Supplements', value: 22, color: '#34C759' },
  { name: 'Respiratory Care', value: 16, color: '#FF9500' },
  { name: 'Digestive Health', value: 10, color: '#5856D6' },
];

const recentAlerts = [
  { id: 1, type: 'warning', message: 'Sensodyne Repair & Protect (Batch #SEN-2401) below reorder level', time: '5 min ago', priority: 'high' },
  { id: 2, type: 'info', message: 'Raw materials PO #PO-8845 approved - Panadol ingredients incoming', time: '23 min ago', priority: 'medium' },
  { id: 3, type: 'warning', message: 'Voltaren Gel: 8 batches expiring within 45 days', time: '1 hour ago', priority: 'high' },
  { id: 4, type: 'success', message: 'Quality check passed for Centrum Production Batch #CEN-5512', time: '2 hours ago', priority: 'low' },
  { id: 5, type: 'info', message: 'Shipment #SH-9921 delivered to CVS Distribution Center', time: '3 hours ago', priority: 'medium' },
];

const activeProductions = [
  { id: 'HAL-5513', product: 'Panadol Extra Strength 500mg', stage: 'Quality Control', progress: 85, status: 'on-track' },
  { id: 'HAL-5514', product: 'Sensodyne Whitening Toothpaste', stage: 'Filling & Packaging', progress: 60, status: 'on-track' },
  { id: 'HAL-5515', product: 'Centrum Multivitamin Adults', stage: 'Tablet Coating', progress: 40, status: 'delayed' },
  { id: 'HAL-5516', product: 'Advil Liquid Gels 200mg', stage: 'Final Packaging', progress: 95, status: 'on-track' },
];

const upcomingDeliveries = [
  { id: 'DL-8821', customer: 'Walgreens Distribution Hub', items: '12,500 units', eta: '2 hours', status: 'in-transit', value: 'LKR 46.8M' },
  { id: 'DL-8822', customer: 'CVS Pharmacy Network', items: '8,750 units', eta: '4 hours', status: 'preparing', value: 'LKR 31.2M' },
  { id: 'DL-8823', customer: 'Walmart Distribution Center', items: '15,300 units', eta: '6 hours', status: 'preparing', value: 'LKR 57.2M' },
];

export default function MedicalDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => (
          <Card key={idx} className="p-5 border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-muted-foreground text-sm mb-1">{kpi.title}</p>
                <p className="text-2xl text-foreground mb-2">{kpi.value}</p>
                <div className="flex items-center gap-1">
                  <Badge variant={kpi.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                    {kpi.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Trend Chart */}
        <Card className="p-6 border-border">
          <div className="mb-6">
            <h3 className="text-foreground mb-1">Inventory Trend Analysis</h3>
            <p className="text-sm text-muted-foreground">Monthly inventory levels by category</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" />
              <XAxis dataKey="month" stroke="#6e6e73" />
              <YAxis stroke="#6e6e73" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e5ea',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="raw" name="Raw Materials" stroke="#007AFF" strokeWidth={2} />
              <Line type="monotone" dataKey="finished" name="Finished Goods" stroke="#00A9A5" strokeWidth={2} />
              <Line type="monotone" dataKey="inProduction" name="In Production" stroke="#FF9500" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Supplies Distribution */}
        <Card className="p-6 border-border">
          <div className="mb-6">
            <h3 className="text-foreground mb-1">Supplies Distribution</h3>
            <p className="text-sm text-muted-foreground">Current inventory breakdown by type</p>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={suppliesDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {suppliesDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Alerts and Production */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts & Notifications */}
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-foreground mb-1">Alerts & Notifications</h3>
              <p className="text-sm text-muted-foreground">Recent system alerts</p>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className={`mt-0.5 ${
                  alert.type === 'warning' ? 'text-orange-500' :
                  alert.type === 'success' ? 'text-green-500' :
                  'text-blue-500'
                }`}>
                  {alert.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                   alert.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                   <Activity className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                    {alert.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">High Priority</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Production Batches */}
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-foreground mb-1">Active Production Batches</h3>
              <p className="text-sm text-muted-foreground">Current manufacturing status</p>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {activeProductions.map((batch) => (
              <div key={batch.id} className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-foreground">{batch.product}</p>
                    <p className="text-xs text-muted-foreground">Batch {batch.id}</p>
                  </div>
                  <Badge variant={batch.status === 'on-track' ? 'default' : 'destructive'}>
                    {batch.status === 'on-track' ? 'On Track' : 'Delayed'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{batch.stage}</span>
                    <span className="text-foreground">{batch.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        batch.status === 'on-track' ? 'bg-primary' : 'bg-destructive'
                      }`}
                      style={{ width: `${batch.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Upcoming Deliveries */}
      <Card className="p-6 border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-foreground mb-1">Upcoming Deliveries</h3>
            <p className="text-sm text-muted-foreground">Scheduled shipments and deliveries</p>
          </div>
          <Button variant="outline" size="sm">
            <Truck className="w-4 h-4 mr-2" />
            Manage Deliveries
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingDeliveries.map((delivery) => (
            <div key={delivery.id} className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">Order {delivery.id}</p>
                  <p className="text-foreground">{delivery.customer}</p>
                </div>
                <Badge variant={delivery.status === 'in-transit' ? 'default' : 'secondary'}>
                  {delivery.status === 'in-transit' ? 'In Transit' : 'Preparing'}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{delivery.items}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">ETA: {delivery.eta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
