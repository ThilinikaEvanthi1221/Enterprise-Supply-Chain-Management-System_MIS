import { useState } from 'react';
import { Package, Search, Filter, Download, Plus, Edit, Trash2, AlertCircle, Calendar, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  batchNumber: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  expiryDate: string;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expiring-soon';
  lastUpdated: string;
}

const inventoryData: InventoryItem[] = [
  { id: '1', name: 'Sensodyne Repair & Protect', category: 'Oral Care', sku: 'SEN-2401', batchNumber: 'B-SEN-240115', quantity: 45000, unit: 'units', reorderLevel: 30000, expiryDate: '2026-08-15', location: 'Colombo Warehouse - Shelf A-12', status: 'in-stock', lastUpdated: '2 hours ago' },
  { id: '2', name: 'Panadol Extra Strength 500mg', category: 'Pain Relief', sku: 'PAN-1523', batchNumber: 'B-PAN-240108', quantity: 28500, unit: 'bottles', reorderLevel: 35000, expiryDate: '2027-03-20', location: 'Colombo Warehouse - Shelf A-08', status: 'low-stock', lastUpdated: '4 hours ago' },
  { id: '3', name: 'Centrum Multivitamin Adults', category: 'Vitamins', sku: 'CEN-8842', batchNumber: 'B-CEN-240120', quantity: 52000, unit: 'bottles', reorderLevel: 25000, expiryDate: '2028-06-30', location: 'Ratmalana DC - Shelf B-03', status: 'in-stock', lastUpdated: '1 day ago' },
  { id: '4', name: 'Voltaren Gel 1% 100g', category: 'Pain Relief', sku: 'VOL-6721', batchNumber: 'B-VOL-240105', quantity: 18200, unit: 'tubes', reorderLevel: 15000, expiryDate: '2025-11-28', location: 'Katunayake Hub - Shelf C-15', status: 'expiring-soon', lastUpdated: '3 hours ago' },
  { id: '5', name: 'Advil Liquid Gels 200mg', category: 'Pain Relief', sku: 'ADV-9945', batchNumber: 'B-ADV-240122', quantity: 38000, unit: 'bottles', reorderLevel: 20000, expiryDate: '2026-12-15', location: 'Ratmalana DC - Shelf B-06', status: 'in-stock', lastUpdated: '5 hours ago' },
  { id: '6', name: 'Polident Denture Cleanser', category: 'Oral Care', sku: 'POL-3301', batchNumber: 'B-POL-240110', quantity: 22000, unit: 'boxes', reorderLevel: 15000, expiryDate: '2027-08-15', location: 'Colombo Warehouse - Shelf A-20', status: 'in-stock', lastUpdated: '6 hours ago' },
  { id: '7', name: 'Robitussin Cough Syrup', category: 'Respiratory', sku: 'ROB-7712', batchNumber: 'B-ROB-240118', quantity: 8500, unit: 'bottles', reorderLevel: 12000, expiryDate: '2026-05-10', location: 'Katunayake Hub - Shelf C-09', status: 'low-stock', lastUpdated: '2 days ago' },
  { id: '8', name: 'Otrivine Nasal Spray', category: 'Respiratory', sku: 'OTR-5589', batchNumber: 'B-OTR-240112', quantity: 15000, unit: 'bottles', reorderLevel: 10000, expiryDate: '2026-09-25', location: 'Ratmalana DC - Shelf B-11', status: 'in-stock', lastUpdated: '1 day ago' },
  { id: '9', name: 'ENO Fruit Salt', category: 'Digestive Health', sku: 'ENO-4421', batchNumber: 'B-ENO-240125', quantity: 31000, unit: 'sachets', reorderLevel: 20000, expiryDate: '2027-04-10', location: 'Colombo Warehouse - Shelf A-05', status: 'in-stock', lastUpdated: '8 hours ago' },
  { id: '10', name: 'TUMS Antacid Tablets', category: 'Digestive Health', sku: 'TUM-8834', batchNumber: 'B-TUM-240119', quantity: 42000, unit: 'bottles', reorderLevel: 25000, expiryDate: '2028-01-20', location: 'Katunayake Hub - Shelf C-12', status: 'in-stock', lastUpdated: '12 hours ago' },
];

export default function InventoryModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const categories = ['all', 'Oral Care', 'Pain Relief', 'Vitamins', 'Respiratory', 'Digestive Health', 'Raw Materials'];

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: InventoryItem['status']) => {
    const variants = {
      'in-stock': { variant: 'default' as const, label: 'In Stock' },
      'low-stock': { variant: 'secondary' as const, label: 'Low Stock' },
      'out-of-stock': { variant: 'destructive' as const, label: 'Out of Stock' },
      'expiring-soon': { variant: 'destructive' as const, label: 'Expiring Soon' },
    };
    return <Badge variant={variants[status].variant}>{variants[status].label}</Badge>;
  };

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl text-foreground mb-1">Inventory Management</h2>
          <p className="text-muted-foreground">Track Haleon healthcare products and raw materials</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Items</p>
              <p className="text-2xl text-foreground">2,847</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Low Stock</p>
              <p className="text-2xl text-foreground">23</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Expiring Soon</p>
              <p className="text-2xl text-foreground">12</p>
            </div>
            <div className="w-10 h-10 bg-red-50 dark:bg-red-950/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Categories</p>
              <p className="text-2xl text-foreground">8</p>
            </div>
            <div className="w-10 h-10 bg-green-50 dark:bg-green-950/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, SKU, or batch number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px] bg-input-background">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card className="border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-secondary/50">
                  <TableCell>
                    <div>
                      <p className="text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Updated {item.lastUpdated}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.batchNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-foreground">{item.quantity.toLocaleString()} {item.unit}</p>
                      {item.quantity <= item.reorderLevel && (
                        <p className="text-xs text-orange-600">Below reorder level</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.expiryDate}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{item.location}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="hover:bg-primary/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input placeholder="Enter product name" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input placeholder="Enter SKU" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sterile">Oral Care</SelectItem>
                  <SelectItem value="equipment">Pain Relief</SelectItem>
                  <SelectItem value="consumables">Vitamins</SelectItem>
                  <SelectItem value="respiratory">Respiratory</SelectItem>
                  <SelectItem value="digestive">Digestive Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Batch Number</Label>
              <Input placeholder="Enter batch number" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input type="number" placeholder="Enter quantity" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Input placeholder="e.g., pcs, boxes" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Input type="date" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="Warehouse and shelf location" className="bg-input-background" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input defaultValue={selectedItem?.name} className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input type="number" defaultValue={selectedItem?.quantity} className="bg-input-background" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete "{selectedItem?.name}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
