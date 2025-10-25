import { Download, FileText, TrendingUp, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const stockAgingData = [
  { range: '0-30 days', value: 45 },
  { range: '31-60 days', value: 30 },
  { range: '61-90 days', value: 15 },
  { range: '90+ days', value: 10 },
];

const supplierPerformanceData = [
  { supplier: 'MedTech Co.', onTime: 95, quality: 98 },
  { supplier: 'Global Med', onTime: 88, quality: 92 },
  { supplier: 'SterileSource', onTime: 97, quality: 99 },
  { supplier: 'PackagePro', onTime: 82, quality: 90 },
];

const demandForecastData = [
  { month: 'Nov', actual: 450, forecast: 470 },
  { month: 'Dec', actual: 520, forecast: 510 },
  { month: 'Jan', forecast: 550 },
  { month: 'Feb', forecast: 580 },
  { month: 'Mar', forecast: 610 },
  { month: 'Apr', forecast: 640 },
];

const productCategoryData = [
  { name: 'Sterile Goods', value: 35, color: '#007AFF' },
  { name: 'Equipment', value: 25, color: '#00A9A5' },
  { name: 'Consumables', value: 20, color: '#34C759' },
  { name: 'Raw Materials', value: 15, color: '#FF9500' },
  { name: 'Packaging', value: 5, color: '#5856D6' },
];

export default function AnalyticsModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl text-foreground mb-1">Analytics & Reports</h2>
          <p className="text-muted-foreground">Data insights and downloadable reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-[180px] bg-input-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="thisQuarter">This Quarter</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Inventory Report', icon: FileText, color: 'blue' },
          { label: 'Financial Report', icon: TrendingUp, color: 'green' },
          { label: 'Quality Report', icon: FileText, color: 'purple' },
          { label: 'Custom Report', icon: Calendar, color: 'orange' },
        ].map((report, idx) => (
          <Card key={idx} className="p-4 border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-${report.color}-50 dark:bg-${report.color}-950/20 rounded-lg flex items-center justify-center`}>
                <report.icon className={`w-5 h-5 text-${report.color}-600`} />
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-foreground">{report.label}</p>
            <p className="text-xs text-muted-foreground mt-1">Download PDF</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Aging Analysis */}
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-foreground mb-1">Stock Aging Analysis</h3>
              <p className="text-sm text-muted-foreground">Inventory age distribution</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockAgingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" />
              <XAxis dataKey="range" stroke="#6e6e73" />
              <YAxis stroke="#6e6e73" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e5ea',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="value" fill="#007AFF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Supplier Performance */}
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-foreground mb-1">Supplier Performance</h3>
              <p className="text-sm text-muted-foreground">On-time delivery vs quality score</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={supplierPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" />
              <XAxis dataKey="supplier" stroke="#6e6e73" />
              <YAxis stroke="#6e6e73" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e5ea',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar dataKey="onTime" name="On-Time %" fill="#007AFF" radius={[8, 8, 0, 0]} />
              <Bar dataKey="quality" name="Quality %" fill="#00A9A5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Demand Forecast */}
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-foreground mb-1">Demand Forecast</h3>
              <p className="text-sm text-muted-foreground">Projected inventory needs</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demandForecastData}>
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
              <Line type="monotone" dataKey="actual" name="Actual" stroke="#007AFF" strokeWidth={2} />
              <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#00A9A5" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Product Category Distribution */}
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-foreground mb-1">Product Category Distribution</h3>
              <p className="text-sm text-muted-foreground">Inventory by category</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {productCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="p-6 border-border">
        <h3 className="text-foreground mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start">
            <Download className="w-4 h-4 mr-2" />
            Export All Charts (PDF)
          </Button>
          <Button variant="outline" className="justify-start">
            <Download className="w-4 h-4 mr-2" />
            Export Data (CSV)
          </Button>
          <Button variant="outline" className="justify-start">
            <Download className="w-4 h-4 mr-2" />
            Export Summary (Excel)
          </Button>
        </div>
      </Card>
    </div>
  );
}
