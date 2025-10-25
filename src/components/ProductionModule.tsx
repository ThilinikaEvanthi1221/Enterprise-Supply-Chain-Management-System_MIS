import { useState } from 'react';
import { Factory, Plus, Calendar, Play, Pause, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface ProductionBatch {
  id: string;
  product: string;
  quantity: number;
  startDate: string;
  endDate: string;
  currentStage: string;
  progress: number;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  assignedMaterials: string[];
}

interface BOMItem {
  id: string;
  product: string;
  rawMaterials: { material: string; quantity: string }[];
  totalCost: string;
  leadTime: string;
}

const productionBatches: ProductionBatch[] = [
  { id: 'HAL-5513', product: 'Panadol Extra Strength 500mg', quantity: 250000, startDate: '2025-10-20', endDate: '2025-10-27', currentStage: 'Quality Control', progress: 85, status: 'in-progress', assignedMaterials: ['Paracetamol API', 'Gelatin capsules', 'Excipients'] },
  { id: 'HAL-5514', product: 'Sensodyne Whitening Toothpaste', quantity: 80000, startDate: '2025-10-21', endDate: '2025-10-28', currentStage: 'Filling & Packaging', progress: 60, status: 'in-progress', assignedMaterials: ['Fluoride compound', 'Abrasive agents', 'Tubes & caps'] },
  { id: 'HAL-5515', product: 'Centrum Multivitamin Adults', quantity: 150000, startDate: '2025-10-19', endDate: '2025-10-26', currentStage: 'Tablet Coating', progress: 40, status: 'on-hold', assignedMaterials: ['Vitamin mix', 'Mineral blend', 'Coating solution'] },
  { id: 'HAL-5516', product: 'Advil Liquid Gels 200mg', quantity: 200000, startDate: '2025-10-18', endDate: '2025-10-25', currentStage: 'Final Packaging', progress: 95, status: 'in-progress', assignedMaterials: ['Ibuprofen', 'Gelatin capsules', 'Plasticizers'] },
  { id: 'HAL-5517', product: 'Voltaren Gel 1% 100g', quantity: 60000, startDate: '2025-10-25', endDate: '2025-11-05', currentStage: 'Planning', progress: 0, status: 'planning', assignedMaterials: ['Diclofenac sodium', 'Gel base', 'Tubes'] },
];

const bomData: BOMItem[] = [
  { id: 'BOM-001', product: 'Panadol Extra Strength 500mg', rawMaterials: [{ material: 'Paracetamol API', quantity: '125 kg' }, { material: 'Gelatin capsules size 0', quantity: '250,000 pcs' }, { material: 'Magnesium stearate', quantity: '2.5 kg' }], totalCost: 'LKR 3,650,000', leadTime: '7 days' },
  { id: 'BOM-002', product: 'Sensodyne Whitening Toothpaste', rawMaterials: [{ material: 'Potassium nitrate', quantity: '40 kg' }, { material: 'Sodium fluoride', quantity: '8 kg' }, { material: 'Tubes with caps (75ml)', quantity: '80,000 pcs' }], totalCost: 'LKR 4,820,000', leadTime: '10 days' },
  { id: 'BOM-003', product: 'Centrum Multivitamin Adults', rawMaterials: [{ material: 'Vitamin & mineral premix', quantity: '180 kg' }, { material: 'Microcrystalline cellulose', quantity: '50 kg' }, { material: 'Film coating solution', quantity: '25 L' }], totalCost: 'LKR 6,480,000', leadTime: '12 days' },
];

const productionStages = [
  { name: 'Raw Material Prep', duration: '1 day' },
  { name: 'Manufacturing', duration: '3 days' },
  { name: 'Quality Control', duration: '1 day' },
  { name: 'Packaging', duration: '2 days' },
  { name: 'Final Inspection', duration: '1 day' },
];

export default function ProductionModule() {
  const [isCreateBatchOpen, setIsCreateBatchOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<ProductionBatch | null>(null);

  const getStatusBadge = (status: ProductionBatch['status']) => {
    const variants = {
      'planning': { variant: 'secondary' as const, label: 'Planning' },
      'in-progress': { variant: 'default' as const, label: 'In Progress' },
      'completed': { variant: 'default' as const, label: 'Completed' },
      'on-hold': { variant: 'destructive' as const, label: 'On Hold' },
    };
    return <Badge variant={variants[status].variant}>{variants[status].label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl text-foreground mb-1">Production Planning</h2>
          <p className="text-muted-foreground">Manage Haleon product manufacturing batches and schedules</p>
        </div>
        <Button onClick={() => setIsCreateBatchOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Production Batch
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Batches</p>
              <p className="text-2xl text-foreground">12</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center">
              <Factory className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">On Schedule</p>
              <p className="text-2xl text-green-600">9</p>
            </div>
            <div className="w-10 h-10 bg-green-50 dark:bg-green-950/20 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Delayed</p>
              <p className="text-2xl text-orange-600">3</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Efficiency</p>
              <p className="text-2xl text-foreground">94.7%</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="batches" className="w-full">
        <TabsList>
          <TabsTrigger value="batches">Production Batches</TabsTrigger>
          <TabsTrigger value="bom">Bill of Materials (BOM)</TabsTrigger>
          <TabsTrigger value="schedule">Production Schedule</TabsTrigger>
        </TabsList>

        {/* Production Batches */}
        <TabsContent value="batches" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {productionBatches.map((batch) => (
              <Card key={batch.id} className="p-5 border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-foreground">{batch.product}</h3>
                          {getStatusBadge(batch.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">Batch {batch.id} • {batch.quantity.toLocaleString()} units</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Current Stage</p>
                        <p className="text-sm text-foreground">{batch.currentStage}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Timeline</p>
                        <p className="text-sm text-foreground">{batch.startDate} → {batch.endDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Assigned Materials</p>
                        <p className="text-sm text-foreground">{batch.assignedMaterials.length} materials</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">{batch.progress}%</span>
                      </div>
                      <Progress value={batch.progress} className="h-2" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {batch.status === 'in-progress' && (
                      <Button variant="outline" size="sm">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    {batch.status === 'on-hold' && (
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => setSelectedBatch(batch)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* BOM */}
        <TabsContent value="bom" className="space-y-4">
          <Card className="border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>BOM ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Raw Materials</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Lead Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bomData.map((bom) => (
                    <TableRow key={bom.id} className="hover:bg-secondary/50">
                      <TableCell className="text-foreground">{bom.id}</TableCell>
                      <TableCell className="text-foreground">{bom.product}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {bom.rawMaterials.map((mat, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="text-foreground">{mat.material}</span>
                              <span className="text-muted-foreground"> - {mat.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{bom.totalCost}</TableCell>
                      <TableCell className="text-muted-foreground">{bom.leadTime}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit BOM</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Production Schedule */}
        <TabsContent value="schedule" className="space-y-4">
          <Card className="p-6 border-border">
            <h3 className="text-foreground mb-4">Standard Production Stages</h3>
            <div className="space-y-3">
              {productionStages.map((stage, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary">{idx + 1}</span>
                    </div>
                    <div>
                      <p className="text-foreground">{stage.name}</p>
                      <p className="text-sm text-muted-foreground">Duration: {stage.duration}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Configure</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground">Timeline View</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  This Week
                </Button>
                <Button variant="outline" size="sm">This Month</Button>
              </div>
            </div>
            <div className="bg-secondary/30 rounded-lg p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Timeline visualization coming soon</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Batch Dialog */}
      <Dialog open={isCreateBatchOpen} onOpenChange={setIsCreateBatchOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Production Batch</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Product</Label>
              <Input placeholder="Select product" className="bg-input-background" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" placeholder="Enter quantity" className="bg-input-background" />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Input placeholder="pcs, boxes, etc." className="bg-input-background" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" className="bg-input-background" />
              </div>
              <div className="space-y-2">
                <Label>Expected End Date</Label>
                <Input type="date" className="bg-input-background" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateBatchOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsCreateBatchOpen(false)}>Create Batch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
