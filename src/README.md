# MedChain - Medical Supply Chain Management System

## Overview

A comprehensive enterprise-level web platform for medical manufacturing supply chain management. Built with React, TypeScript, and Tailwind CSS, featuring a professional medical theme with blue (#007AFF) and green (#00A9A5) color palette.

## Features

### 🔐 Authentication
- Professional login page with medical branding
- Forgot password functionality
- Secure authentication flow

### 📊 Dashboard
- Real-time KPIs for inventory, orders, and production
- Interactive charts (inventory trends, supplies distribution)
- Alerts and notifications panel
- Active production batches tracking
- Upcoming deliveries overview

### 📦 Inventory Management
- Complete product catalog with batch tracking
- Expiry date monitoring
- Low stock alerts
- Search and filter capabilities
- CRUD operations for inventory items
- Category management

### 🛒 Procurement & Supplier Management
- Supplier database with ratings
- Purchase order creation and approval workflow
- Order status tracking (Pending, Approved, Received, Cancelled)
- Supplier performance metrics

### 🏭 Production Planning
- Production batch management
- Bill of Materials (BOM) tracking
- Production stage monitoring
- Progress tracking with visual indicators
- Timeline and schedule views

### 🏪 Warehouse & Logistics
- Multiple warehouse management
- Bin location tracking
- Stock transfer between warehouses
- QR code scanning for inventory
- Warehouse capacity monitoring

### 🚚 Order Management
- Customer database (hospitals, clinics)
- Sales order creation and tracking
- Delivery schedule management
- Order timeline with status updates
- Revenue tracking

### 🛡️ Quality Control
- Inspection checklists
- Batch quality scoring
- Defects and rejects reporting
- Compliance status (FDA, GMP, ISO 13485)
- Pass rate analytics

### 📈 Analytics & Reports
- Stock aging analysis
- Supplier performance charts
- Demand forecasting
- Product category distribution
- Downloadable reports (PDF, CSV, Excel)

### 👥 User & Role Management
- User management with role-based access control
- 4 user roles: Administrator, Manager, Staff, Viewer
- Permission management
- User activity tracking
- Department organization

## Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: Dark/Light mode support

## Color Palette

- **Primary Blue**: #007AFF
- **Medical Green**: #00A9A5  
- **White Background**: #ffffff
- **Text**: #1a1a1a (light) / #f5f5f7 (dark)
- **Border**: #e5e5ea

## Project Structure

```
/
├── App.tsx                          # Main application entry
├── components/
│   ├── Login.tsx                    # Authentication page
│   ├── MedicalDashboard.tsx         # Main dashboard
│   ├── MedicalSidebar.tsx           # Navigation sidebar
│   ├── MedicalTopNav.tsx            # Top navigation bar
│   ├── InventoryModule.tsx          # Inventory management
│   ├── ProcurementModule.tsx        # Procurement & suppliers
│   ├── ProductionModule.tsx         # Production planning
│   ├── WarehouseModule.tsx          # Warehouse logistics
│   ├── OrderManagementModule.tsx    # Order management
│   ├── QualityControlModule.tsx     # Quality control
│   ├── AnalyticsModule.tsx          # Analytics & reports
│   ├── UserManagementModule.tsx     # User management
│   ├── SettingsModule.tsx           # System settings
│   └── ui/                          # Shadcn UI components
├── styles/
│   └── globals.css                  # Global styles and theme
```

## Getting Started

### Default Login
- Any email and password will work for demo purposes
- The system simulates a 1-second authentication delay

### Navigation
- Use the sidebar to switch between modules
- Click the menu icon to collapse/expand sidebar
- Access theme toggle, notifications, and user menu from top navigation
- Search bar for global inventory/order search

### Key Interactions

1. **Dashboard**: View real-time metrics and recent alerts
2. **Inventory**: Add, edit, or delete inventory items
3. **Procurement**: Create purchase orders and manage suppliers
4. **Production**: Track production batches and view BOM
5. **Warehouse**: Manage stock transfers and bin locations
6. **Orders**: Track customer orders and delivery schedules
7. **Quality Control**: Complete inspection checklists
8. **Analytics**: View charts and export reports
9. **Users**: Manage user roles and permissions

## Module Capabilities

### Inventory Module
- Real-time stock levels
- Batch number tracking
- Expiry date alerts
- Location tracking
- Category filtering
- Export inventory data

### Procurement Module
- Supplier ratings and performance
- PO approval workflow
- Multi-item purchase orders
- Delivery tracking
- Supplier contact management

### Production Module
- Multi-stage production tracking
- Material allocation
- Progress monitoring
- BOM cost calculation
- Timeline visualization

### Quality Control Module
- Standardized inspection checklists
- Quality scoring (0-100%)
- Defect reporting and categorization
- Compliance certification tracking
- Pass/fail analytics

### Analytics Module
- Stock aging reports
- Supplier performance metrics
- Demand forecasting
- Category distribution
- Export capabilities

## Theme Support

The system supports both light and dark themes:
- Toggle via sun/moon icon in top navigation
- Theme preference saved to localStorage
- Smooth transitions between modes
- All components fully themed

## Responsive Design

- Mobile-friendly responsive layout
- Adaptive sidebar (collapsible on mobile)
- Responsive tables and charts
- Touch-friendly buttons and controls

## Security Features

- Role-based access control (RBAC)
- Secure authentication flow
- Session management
- Password reset functionality
- Audit logging capability

## Future Enhancements

- Real-time WebSocket notifications
- Advanced search with filters
- Batch QR code generation
- Integration with ERP systems
- Mobile app companion
- Advanced analytics and AI forecasting

## Support

For system administration and user management, contact your IT department or system administrator.

---

**MedChain Systems © 2025** - Medical Supply Chain Management Platform
