export type UserRole = 'admin' | 'procurement-manager' | 'warehouse-officer' | 'distribution-manager';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Hardcoded user credentials
export const USERS: User[] = [
  {
    id: '1',
    name: 'Dilini Rathnayake',
    email: 'admin@haleon.lk',
    password: 'admin123',
    role: 'admin',
    department: 'IT Operations'
  },
  {
    id: '2',
    name: 'Nimal Perera',
    email: 'procurement@haleon.lk',
    password: 'proc123',
    role: 'procurement-manager',
    department: 'Procurement'
  },
  {
    id: '3',
    name: 'Kasun Jayawardena',
    email: 'warehouse@haleon.lk',
    password: 'ware123',
    role: 'warehouse-officer',
    department: 'Warehouse'
  },
  {
    id: '4',
    name: 'Sanduni Silva',
    email: 'distribution@haleon.lk',
    password: 'dist123',
    role: 'distribution-manager',
    department: 'Distribution'
  }
];

// Role-based access control - which modules each role can access
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  'admin': [
    'dashboard',
    'inventory',
    'procurement',
    'production',
    'warehouse',
    'orders',
    'quality',
    'analytics',
    'users',
    'settings'
  ],
  'procurement-manager': [
    'dashboard',
    'procurement',
    'inventory',
    'production',
    'analytics',
    'settings'
  ],
  'warehouse-officer': [
    'dashboard',
    'warehouse',
    'inventory',
    'orders',
    'settings'
  ],
  'distribution-manager': [
    'dashboard',
    'orders',
    'warehouse',
    'inventory',
    'analytics',
    'settings'
  ]
};
