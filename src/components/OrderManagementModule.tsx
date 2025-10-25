import { useState } from 'react';
import { ShoppingCart, Building, Truck, Package, CheckCircle, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

const customers = [
  { id: 'CU-001', name: 'Walgreens Distribution Hub', type: 'Pharmacy Chain', location: 'Deerfield, IL', orders: 145, value: 'LKR 468M' },
  { id: 'CU-002', name: 'CVS Pharmacy Network', type: 'Pharmacy Chain', location: 'Woonsocket, RI', orders: 132, value: 'LKR 372M' },
  { id: 'CU-003', name: 'Walmart Distribution Center', type: 'Retail Chain', location: 'Bentonville, AR', orders: 167, value: 'LKR 624M' },
  { id: 'CU-004', name: 'Target Pharmacy Division', type: 'Retail Chain', location: 'Minneapolis, MN', orders: 98, value: 'LKR 290M' },
];

const orders = [
  { id: 'SO-8821', customer: 'Walgreens Distribution Hub', items: '12,500 units (Panadol, Advil)', total: 'LKR 46,800,000', date: '2025-10-23', delivery: '2025-10-25', status: 'in-transit', progress: 75 },
  { id: 'SO-8822', customer: 'CVS Pharmacy Network', items: '8,750 units (Sensodyne, Centrum)', total: 'LKR 31,200,000', date: '2025-10-23', delivery: '2025-10-26', status: 'packed', progress: 50 },
  { id: 'SO-8823', customer: 'Walmart Distribution Center', items: '15,300 units (Mixed Products)', total: 'LKR 57,160,000', date: '2025-10-22', delivery: '2025-10-24', status: 'delivered', progress: 100 },
  { id: 'SO-8824', customer: 'Target Pharmacy Division', items: '6,700 units (Voltaren, TUMS)', total: 'LKR 24,680,000', date: '2025-10-24', delivery: '2025-10-27', status: 'preparing', progress: 25 },
];

const orderStatuses = [
  { label: 'Order Received', completed: true },
  { label: 'Processing', completed: true },
  { label: 'Packed', completed: true },
  { label: 'Dispatched', completed: true },
  { label: 'In Transit', completed: false },
  { label: 'Delivered', completed: false },
];

export default function OrderManagementModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-foreground mb-1">Order Management</h2>
        <p className="text-muted-foreground">Manage distribution orders to pharmacy chains and retail customers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="text-2xl text-foreground">542</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">In Transit</p>
              <p className="text-2xl text-orange-600">45</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Delivered</p>
              <p className="text-2xl text-green-600">467</p>
            </div>
            <div className="w-10 h-10 bg-green-50 dark:bg-green-950/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Revenue</p>
              <p className="text-2xl text-foreground">LKR 2.56B</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList>
          <TabsTrigger value="orders">Sales Orders</TabsTrigger>
          <TabsTrigger value="customers">Customer Database</TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card className="border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-secondary/50">
                    <TableCell className="text-foreground">{order.id}</TableCell>
                    <TableCell className="text-foreground">{order.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{order.items}</TableCell>
                    <TableCell className="text-foreground">{order.total}</TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell className="text-muted-foreground">{order.delivery}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Track</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Order Timeline Example */}
          <Card className="p-6 border-border">
            <h3 className="text-foreground mb-4">Order Timeline - SO-8821</h3>
            <div className="space-y-4">
              {orderStatuses.map((status, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    status.completed ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {status.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className={status.completed ? 'text-foreground' : 'text-muted-foreground'}>
                      {status.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="flex justify-end">
            <Button>Add Customer</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers.map((customer) => (
              <Card key={customer.id} className="p-5 border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground mb-1">{customer.name}</h3>
                    <Badge variant="outline">{customer.type}</Badge>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{customer.location}</p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Orders</p>
                      <p className="text-foreground">{customer.orders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Value</p>
                      <p className="text-foreground">{customer.value}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
