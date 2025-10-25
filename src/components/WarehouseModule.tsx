import { useState } from 'react';
import { Warehouse, MapPin, Package, ArrowRightLeft, QrCode, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const warehouses = [
  { id: 'WH-COL', name: 'Colombo Main Warehouse', location: 'Colombo 03, Sri Lanka', capacity: '85%', items: 2847, zones: 12 },
  { id: 'WH-RAT', name: 'Ratmalana Distribution Center', location: 'Ratmalana, Sri Lanka', capacity: '72%', items: 1983, zones: 10 },
  { id: 'WH-KAT', name: 'Katunayake Logistics Hub', location: 'Katunayake, Sri Lanka', capacity: '91%', items: 3156, zones: 15 },
];

const stockTransfers = [
  { id: 'ST-2201', from: 'Colombo Main Warehouse', to: 'Ratmalana DC', items: '12,500 units (Panadol)', status: 'in-transit', date: '2025-10-23' },
  { id: 'ST-2202', from: 'Ratmalana DC', to: 'Katunayake Hub', items: '8,800 units (Sensodyne)', status: 'pending', date: '2025-10-24' },
  { id: 'ST-2203', from: 'Katunayake Hub', to: 'Colombo Main', items: '15,200 units (Centrum)', status: 'completed', date: '2025-10-22' },
];

const binLocations = [
  { bin: 'COL-A-12-05', product: 'Panadol Extra Strength', quantity: 45000, zone: 'Zone A - Colombo' },
  { bin: 'COL-A-08-12', product: 'Sensodyne Repair & Protect', quantity: 28500, zone: 'Zone A - Colombo' },
  { bin: 'RAT-B-03-08', product: 'Centrum Multivitamin', quantity: 52000, zone: 'Zone B - Ratmalana' },
  { bin: 'KAT-C-15-22', product: 'Advil Liquid Gels', quantity: 38000, zone: 'Zone C - Katunayake' },
  { bin: 'COL-A-20-15', product: 'Voltaren Gel', quantity: 18200, zone: 'Zone A - Colombo' },
];

export default function WarehouseModule() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-foreground mb-1">Warehouse & Logistics</h2>
        <p className="text-muted-foreground">Manage Haleon Sri Lanka warehouse locations and stock transfers</p>
      </div>

      {/* Warehouse Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {warehouses.map((wh) => (
          <Card key={wh.id} className="p-5 border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Warehouse className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground">{wh.name}</h3>
                  <p className="text-sm text-muted-foreground">{wh.id}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{wh.location}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                  <p className="text-foreground">{wh.capacity}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Items</p>
                  <p className="text-foreground">{wh.items}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                View Map
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="transfers" className="w-full">
        <TabsList>
          <TabsTrigger value="transfers">Stock Transfers</TabsTrigger>
          <TabsTrigger value="locations">Bin Locations</TabsTrigger>
          <TabsTrigger value="scanning">QR Scanning</TabsTrigger>
        </TabsList>

        {/* Stock Transfers */}
        <TabsContent value="transfers" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search transfers..." className="pl-10 bg-input-background" />
            </div>
            <Button>
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              New Transfer
            </Button>
          </div>

          <Card className="border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transfer ID</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockTransfers.map((transfer) => (
                  <TableRow key={transfer.id} className="hover:bg-secondary/50">
                    <TableCell className="text-foreground">{transfer.id}</TableCell>
                    <TableCell className="text-muted-foreground">{transfer.from}</TableCell>
                    <TableCell className="text-muted-foreground">{transfer.to}</TableCell>
                    <TableCell className="text-foreground">{transfer.items}</TableCell>
                    <TableCell className="text-muted-foreground">{transfer.date}</TableCell>
                    <TableCell>
                      <Badge variant={transfer.status === 'completed' ? 'default' : 'secondary'}>
                        {transfer.status}
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
        </TabsContent>

        {/* Bin Locations */}
        <TabsContent value="locations" className="space-y-4">
          <Card className="p-4 border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search bin locations..." className="pl-10 bg-input-background" />
            </div>
          </Card>

          <Card className="border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bin Location</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {binLocations.map((bin, idx) => (
                  <TableRow key={idx} className="hover:bg-secondary/50">
                    <TableCell className="text-foreground">{bin.bin}</TableCell>
                    <TableCell className="text-foreground">{bin.product}</TableCell>
                    <TableCell className="text-muted-foreground">{bin.quantity.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{bin.zone}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <QrCode className="w-4 h-4 mr-2" />
                        Print Label
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* QR Scanning */}
        <TabsContent value="scanning" className="space-y-4">
          <Card className="p-8 border-border">
            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="w-32 h-32 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <QrCode className="w-16 h-16 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground mb-2">QR Code Scanner</h3>
                <p className="text-muted-foreground">Scan QR labels for quick bin location and stock verification</p>
              </div>
              <Button size="lg" className="w-full">
                <QrCode className="w-5 h-5 mr-2" />
                Activate Scanner
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
