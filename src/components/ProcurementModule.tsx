import { useState } from 'react';
import { Building2, Plus, FileText, Search, CheckCircle, Clock, XCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  rating: number;
  totalOrders: number;
  status: 'active' | 'inactive';
}

interface PurchaseOrder {
  id: string;
  supplier: string;
  items: string;
  totalAmount: string;
  orderDate: string;
  expectedDelivery: string;
  status: 'pending' | 'approved' | 'received' | 'cancelled';
  approver?: string;
  notes?: string;
}

const suppliersData: Supplier[] = [
  { id: 'SUP-001', name: 'PharmaChem Ingredients Ltd', contact: 'John Smith', email: 'john@pharmachem.com', phone: '+44-20-5550-0101', address: '123 Industrial Park, London, UK', category: 'Active Ingredients', rating: 4.8, totalOrders: 245, status: 'active' },
  { id: 'SUP-002', name: 'Global Packaging Solutions', contact: 'Sarah Johnson', email: 'sarah@gps-pack.com', phone: '+1-555-0102', address: '456 Manufacturing Ave, NJ, USA', category: 'Packaging Materials', rating: 4.5, totalOrders: 178, status: 'active' },
  { id: 'SUP-003', name: 'European Gelatin Suppliers', contact: 'Mike Chen', email: 'mike@eurogelatin.com', phone: '+49-30-5550-103', address: '789 Chemical Blvd, Berlin, Germany', category: 'Excipients', rating: 4.9, totalOrders: 334, status: 'active' },
  { id: 'SUP-004', name: 'Asia-Pacific Raw Materials Co.', contact: 'Emily Davis', email: 'emily@apraw.com', phone: '+86-21-5550-104', address: '321 Supply Chain St, Shanghai, China', category: 'Raw Materials', rating: 4.3, totalOrders: 167, status: 'active' },
  { id: 'SUP-005', name: 'BioActive Compounds Inc.', contact: 'Robert Lee', email: 'robert@bioactive.com', phone: '+1-555-0105', address: '654 Pharma Dr, Boston, MA, USA', category: 'Active Ingredients', rating: 4.6, totalOrders: 212, status: 'active' },
  { id: 'SUP-006', name: 'Premium Label & Print', contact: 'Linda Martinez', email: 'linda@premiumlabel.com', phone: '+1-555-0106', address: '987 Print Plaza, Chicago, IL, USA', category: 'Labels & Printing', rating: 4.4, totalOrders: 145, status: 'inactive' },
];

const purchaseOrdersData: PurchaseOrder[] = [
  { id: 'PO-8845', supplier: 'PharmaChem Ingredients Ltd', items: 'Paracetamol API - 5 tons', totalAmount: 'LKR 29,040,000', orderDate: '2025-10-20', expectedDelivery: '2025-11-05', status: 'approved', approver: 'Jane Wilson' },
  { id: 'PO-8844', supplier: 'European Gelatin Suppliers', items: 'Gelatin Capsules - 2M units', totalAmount: 'LKR 13,560,000', orderDate: '2025-10-22', expectedDelivery: '2025-11-08', status: 'pending' },
  { id: 'PO-8843', supplier: 'Global Packaging Solutions', items: 'Blister Packs & Bottles', totalAmount: 'LKR 22,500,000', orderDate: '2025-10-18', expectedDelivery: '2025-10-25', status: 'received', approver: 'Mark Thompson', notes: 'Delivered on time, quality verified' },
  { id: 'PO-8842', supplier: 'Premium Label & Print', items: 'Product Labels - Multiple SKUs', totalAmount: 'LKR 4,680,000', orderDate: '2025-10-15', expectedDelivery: '2025-10-22', status: 'received', approver: 'Jane Wilson' },
  { id: 'PO-8841', supplier: 'BioActive Compounds Inc.', items: 'Vitamin Mix - 3 tons', totalAmount: 'LKR 37,800,000', orderDate: '2025-10-23', expectedDelivery: '2025-11-10', status: 'pending' },
  { id: 'PO-8840', supplier: 'Asia-Pacific Raw Materials Co.', items: 'Mint Flavoring - 500kg', totalAmount: 'LKR 6,920,000', orderDate: '2025-10-19', expectedDelivery: '2025-10-26', status: 'cancelled', notes: 'Supplier shipping delays' },
];

export default function ProcurementModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [isCreatePOOpen, setIsCreatePOOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

  const getStatusBadge = (status: PurchaseOrder['status']) => {
    const variants = {
      'pending': { variant: 'secondary' as const, label: 'Pending', icon: Clock },
      'approved': { variant: 'default' as const, label: 'Approved', icon: CheckCircle },
      'received': { variant: 'default' as const, label: 'Received', icon: CheckCircle },
      'cancelled': { variant: 'destructive' as const, label: 'Cancelled', icon: XCircle },
    };
    const { variant, label, icon: Icon } = variants[status];
    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {label}
      </Badge>
    );
  };

  const handleApprove = (po: PurchaseOrder) => {
    alert(`Purchase Order ${po.id} has been approved!`);
  };

  const handleReject = (po: PurchaseOrder) => {
    alert(`Purchase Order ${po.id} has been rejected!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl text-foreground mb-1">Procurement & Supplier Management</h2>
          <p className="text-muted-foreground">Manage raw material suppliers and purchase orders for Haleon products</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="purchase-orders" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        {/* Purchase Orders Tab */}
        <TabsContent value="purchase-orders" className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="text-2xl text-foreground">156</p>
            </Card>
            <Card className="p-4 border-border">
              <p className="text-sm text-muted-foreground mb-1">Pending Approval</p>
              <p className="text-2xl text-orange-600">12</p>
            </Card>
            <Card className="p-4 border-border">
              <p className="text-sm text-muted-foreground mb-1">In Transit</p>
              <p className="text-2xl text-blue-600">28</p>
            </Card>
            <Card className="p-4 border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Value</p>
              <p className="text-2xl text-foreground">LKR 240M</p>
            </Card>
          </div>

          {/* Search and Create */}
          <Card className="p-4 border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search purchase orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input-background"
                />
              </div>
              <Button onClick={() => setIsCreatePOOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Purchase Order
              </Button>
            </div>
          </Card>

          {/* Purchase Orders Table */}
          <Card className="border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Expected Delivery</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrdersData.map((po) => (
                    <TableRow key={po.id} className="hover:bg-secondary/50">
                      <TableCell className="text-foreground">{po.id}</TableCell>
                      <TableCell className="text-foreground">{po.supplier}</TableCell>
                      <TableCell className="text-muted-foreground">{po.items}</TableCell>
                      <TableCell className="text-foreground">{po.totalAmount}</TableCell>
                      <TableCell className="text-muted-foreground">{po.orderDate}</TableCell>
                      <TableCell className="text-muted-foreground">{po.expectedDelivery}</TableCell>
                      <TableCell>{getStatusBadge(po.status)}</TableCell>
                      <TableCell>
                        {po.status === 'pending' ? (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(po)}
                              className="hover:bg-primary/10"
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(po)}
                              className="hover:bg-destructive/10"
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedPO(po)}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="space-y-4">
          {/* Search and Add */}
          <Card className="p-4 border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
                  className="pl-10 bg-input-background"
                />
              </div>
              <Button onClick={() => setIsAddSupplierOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Supplier
              </Button>
            </div>
          </Card>

          {/* Suppliers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliersData.map((supplier) => (
              <Card key={supplier.id} className="p-5 border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-foreground mb-1">{supplier.name}</h3>
                      <p className="text-xs text-muted-foreground">{supplier.id}</p>
                    </div>
                  </div>
                  <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                    {supplier.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{supplier.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">{supplier.address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Orders</p>
                    <p className="text-foreground">{supplier.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="text-foreground">⭐ {supplier.rating}</p>
                  </div>
                  <Badge variant="outline">{supplier.category}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create PO Dialog */}
      <Dialog open={isCreatePOOpen} onOpenChange={setIsCreatePOOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Supplier</Label>
              <Input placeholder="Select supplier" className="bg-input-background" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Order Date</Label>
                <Input type="date" className="bg-input-background" />
              </div>
              <div className="space-y-2">
                <Label>Expected Delivery</Label>
                <Input type="date" className="bg-input-background" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Items & Quantities</Label>
              <Textarea 
                placeholder="Enter items and quantities..." 
                className="bg-input-background min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Total Amount</Label>
              <Input type="number" placeholder="LKR 0.00" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional notes..." className="bg-input-background" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatePOOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsCreatePOOpen(false)}>Create Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Supplier Dialog */}
      <Dialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input placeholder="Enter company name" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Contact Person</Label>
              <Input placeholder="Enter contact name" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="email@haleon.lk" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+1-555-0000" className="bg-input-background" />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Address</Label>
              <Textarea placeholder="Enter full address" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input placeholder="e.g., Raw Materials" className="bg-input-background" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSupplierOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddSupplierOpen(false)}>Add Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
