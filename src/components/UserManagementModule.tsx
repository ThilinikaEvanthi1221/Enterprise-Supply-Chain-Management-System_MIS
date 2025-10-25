import { useState } from 'react';
import { Users, UserPlus, Shield, Key, Mail, Phone } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'staff' | 'viewer';
  department: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const users: User[] = [
  { id: 'U-001', name: 'Dr. Nimal Perera', email: 'nimal.perera@haleon.lk', phone: '+94-11-555-0101', role: 'admin', department: 'Quality Control', status: 'active', lastLogin: '2 hours ago' },
  { id: 'U-002', name: 'Dr. Sanduni Silva', email: 'sanduni.silva@haleon.lk', phone: '+94-11-555-0102', role: 'manager', department: 'Production', status: 'active', lastLogin: '5 hours ago' },
  { id: 'U-003', name: 'Dr. Rohan Fernando', email: 'rohan.fernando@haleon.lk', phone: '+94-11-555-0103', role: 'manager', department: 'Quality Control', status: 'active', lastLogin: '1 day ago' },
  { id: 'U-004', name: 'Kasun Jayawardena', email: 'kasun.jayawardena@haleon.lk', phone: '+94-11-555-0104', role: 'staff', department: 'Warehouse', status: 'active', lastLogin: '3 hours ago' },
  { id: 'U-005', name: 'Dilini Rathnayake', email: 'dilini.rathnayake@haleon.lk', phone: '+94-11-555-0105', role: 'staff', department: 'Procurement', status: 'active', lastLogin: '4 hours ago' },
  { id: 'U-006', name: 'Chaminda Wickramasinghe', email: 'chaminda.wickramasinghe@haleon.lk', phone: '+94-11-555-0106', role: 'viewer', department: 'Finance', status: 'inactive', lastLogin: '1 week ago' },
];

const roles = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access and user management',
    permissions: ['All Modules', 'User Management', 'System Settings', 'Reports Export'],
    color: 'red',
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Department management and reporting',
    permissions: ['Dashboard', 'Inventory', 'Orders', 'Production', 'Reports'],
    color: 'blue',
  },
  {
    id: 'staff',
    name: 'Staff',
    description: 'Limited operational access',
    permissions: ['Dashboard', 'Inventory (View)', 'Orders (View)'],
    color: 'green',
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to reports',
    permissions: ['Dashboard (View)', 'Reports (View)'],
    color: 'gray',
  },
];

export default function UserManagementModule() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const getRoleBadge = (role: User['role']) => {
    const roleData = roles.find(r => r.id === role);
    return (
      <Badge variant={role === 'admin' ? 'destructive' : 'default'}>
        {roleData?.name}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl text-foreground mb-1">User & Role Management</h2>
          <p className="text-muted-foreground">Manage users and assign permissions</p>
        </div>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Users</p>
              <p className="text-2xl text-foreground">42</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Users</p>
              <p className="text-2xl text-green-600">38</p>
            </div>
            <div className="w-10 h-10 bg-green-50 dark:bg-green-950/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Admins</p>
              <p className="text-2xl text-foreground">5</p>
            </div>
            <div className="w-10 h-10 bg-red-50 dark:bg-red-950/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Roles</p>
              <p className="text-2xl text-foreground">4</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950/20 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card className="border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-secondary/50">
                    <TableCell className="text-foreground">{user.id}</TableCell>
                    <TableCell className="text-foreground">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell className="text-muted-foreground">{user.phone}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="text-muted-foreground">{user.department}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.lastLogin}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card key={role.id} className="p-6 border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-${role.color}-50 dark:bg-${role.color}-950/20 rounded-lg flex items-center justify-center`}>
                      <Shield className={`w-6 h-6 text-${role.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-foreground mb-1">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">Permissions:</p>
                  <div className="space-y-2">
                    {role.permissions.map((permission, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Checkbox checked disabled />
                        <span className="text-sm text-foreground">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  Manage Permissions
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Enter full name" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="user@haleon.lk" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+1-555-0000" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input placeholder="Enter department" className="bg-input-background" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select>
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue="active">
                <SelectTrigger className="bg-input-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddUserOpen(false)}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
