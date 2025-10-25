import { useState } from 'react';
import { Shield, CheckCircle2, XCircle, AlertTriangle, FileCheck, Clipboard } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';

const inspections = [
  { id: 'QC-2401', batch: 'HAL-5513', product: 'Panadol Extra Strength 500mg', inspector: 'Dr. Nimal Perera', date: '2025-10-23', status: 'passed', score: 98, location: 'Colombo QC Lab' },
  { id: 'QC-2402', batch: 'HAL-5514', product: 'Sensodyne Whitening Toothpaste', inspector: 'Dr. Sanduni Silva', date: '2025-10-23', status: 'passed', score: 96, location: 'Ratmalana Facility' },
  { id: 'QC-2403', batch: 'HAL-5515', product: 'Centrum Multivitamin Adults', inspector: 'Dr. Rohan Fernando', date: '2025-10-22', status: 'failed', score: 72, location: 'Colombo QC Lab' },
  { id: 'QC-2404', batch: 'HAL-5516', product: 'Advil Liquid Gels 200mg', inspector: 'Dr. Nimal Perera', date: '2025-10-21', status: 'passed', score: 99, location: 'Katunayake Plant' },
  { id: 'QC-2405', batch: 'HAL-5517', product: 'Voltaren Gel 1%', inspector: 'Dr. Sanduni Silva', date: '2025-10-24', status: 'passed', score: 97, location: 'Ratmalana Facility' },
];

const defectsData = [
  { id: 'DEF-001', batch: 'HAL-5515', defect: 'Tablet coating irregularity', quantity: 245, severity: 'high', date: '2025-10-22', cost: 'LKR 125,000' },
  { id: 'DEF-002', batch: 'HAL-5513', defect: 'Minor packaging label offset', quantity: 52, severity: 'low', date: '2025-10-23', cost: 'LKR 18,000' },
  { id: 'DEF-003', batch: 'HAL-5512', defect: 'Cap seal alignment issue', quantity: 38, severity: 'medium', date: '2025-10-20', cost: 'LKR 45,000' },
];

const checklistItems = [
  { id: 1, item: 'Visual inspection of tablet/capsule integrity', checked: true },
  { id: 2, item: 'Verify batch number and expiry date labeling', checked: true },
  { id: 3, item: 'Check packaging seal and cap integrity', checked: true },
  { id: 4, item: 'Measure product weight and dimensions (sampling)', checked: false },
  { id: 5, item: 'Active ingredient assay test', checked: false },
  { id: 6, item: 'Dissolution test (for tablets/capsules)', checked: false },
  { id: 7, item: 'Documentation review and approval', checked: false },
];

export default function QualityControlModule() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-foreground mb-1">Quality Control</h2>
        <p className="text-muted-foreground">Haleon Sri Lanka - Inspection checklists and compliance tracking</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Inspections</p>
              <p className="text-2xl text-foreground">156</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center">
              <Clipboard className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pass Rate</p>
              <p className="text-2xl text-green-600">96.4%</p>
            </div>
            <div className="w-10 h-10 bg-green-50 dark:bg-green-950/20 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Defects</p>
              <p className="text-2xl text-orange-600">23</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Compliance</p>
              <p className="text-2xl text-foreground">100%</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="inspections" className="w-full">
        <TabsList>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="checklist">Inspection Checklist</TabsTrigger>
          <TabsTrigger value="defects">Defects & Rejects</TabsTrigger>
        </TabsList>

        {/* Inspections Tab */}
        <TabsContent value="inspections" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <FileCheck className="w-4 h-4 mr-2" />
              New Inspection
            </Button>
          </div>

          <Card className="border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inspection ID</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Inspector</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inspections.map((inspection) => (
                  <TableRow key={inspection.id} className="hover:bg-secondary/50">
                    <TableCell className="text-foreground">{inspection.id}</TableCell>
                    <TableCell className="text-muted-foreground">{inspection.batch}</TableCell>
                    <TableCell className="text-foreground">{inspection.product}</TableCell>
                    <TableCell className="text-muted-foreground">{inspection.inspector}</TableCell>
                    <TableCell className="text-muted-foreground">{inspection.location}</TableCell>
                    <TableCell className="text-muted-foreground">{inspection.date}</TableCell>
                    <TableCell>
                      <span className={inspection.score >= 90 ? 'text-green-600' : 'text-orange-600'}>
                        {inspection.score}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={inspection.status === 'passed' ? 'default' : 'destructive'}>
                        {inspection.status === 'passed' ? (
                          <><CheckCircle2 className="w-3 h-3 mr-1" /> Passed</>
                        ) : (
                          <><XCircle className="w-3 h-3 mr-1" /> Failed</>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View Report</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Checklist Tab */}
        <TabsContent value="checklist" className="space-y-4">
          <Card className="p-6 border-border">
            <div className="mb-6">
              <h3 className="text-foreground mb-2">Standard Quality Control Checklist</h3>
              <p className="text-sm text-muted-foreground">Use this checklist for batch inspections</p>
            </div>

            <div className="space-y-4">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-secondary/30 transition-colors">
                  <Checkbox id={`item-${item.id}`} defaultChecked={item.checked} className="mt-1" />
                  <label
                    htmlFor={`item-${item.id}`}
                    className="flex-1 text-sm cursor-pointer"
                  >
                    {item.item}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {checklistItems.filter(i => i.checked).length} of {checklistItems.length} items completed
              </p>
              <Button>Save Progress</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Defects Tab */}
        <TabsContent value="defects" className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Defect
            </Button>
          </div>

          <Card className="border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Defect ID</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Defect Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Estimated Cost</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Date Reported</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defectsData.map((defect) => (
                  <TableRow key={defect.id} className="hover:bg-secondary/50">
                    <TableCell className="text-foreground">{defect.id}</TableCell>
                    <TableCell className="text-muted-foreground">{defect.batch}</TableCell>
                    <TableCell className="text-foreground">{defect.defect}</TableCell>
                    <TableCell className="text-muted-foreground">{defect.quantity} units</TableCell>
                    <TableCell className="text-orange-600">{defect.cost}</TableCell>
                    <TableCell>
                      <Badge variant={
                        defect.severity === 'high' ? 'destructive' :
                        defect.severity === 'medium' ? 'secondary' : 'outline'
                      }>
                        {defect.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{defect.date}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Compliance Status */}
          <Card className="p-6 border-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-950/20 rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground mb-1">Compliance Status - Sri Lanka</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  All batches meet NMRA (National Medicines Regulatory Authority) and GMP compliance standards
                </p>
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="bg-green-600">NMRA Compliant</Badge>
                  <Badge variant="default" className="bg-green-600">GMP Certified</Badge>
                  <Badge variant="default" className="bg-green-600">ISO 9001:2015</Badge>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
