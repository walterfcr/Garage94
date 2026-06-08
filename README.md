# 🎵 Garage94 – Music Store & Inventory Management System

A full-stack e-commerce simulation built with Vue.js and Supabase, inspired by 90s music culture.

Garage94 evolved from a static catalog prototype into a database-driven storefront featuring product management, inventory tracking, order processing, and an administrative dashboard.

---

## 🚀 Live Demo

👉 https://garage94.vercel.app/

**Try it yourself:**

- Browse products by category and genre
- Add items to the shopping cart
- Complete a purchase and receive an order number
- Track the order status using the tracking page
- Explore the dynamic catalog powered by Supabase

---

## 🧩 Core Features

### 🛒 Shopping Experience

- Dynamic product catalog powered by Supabase
- Shopping cart with quantity management
- Item removal before checkout
- Responsive product browsing experience
- Product detail modals

---

### 📦 Order Management System

- Order creation during checkout
- Automatically generated order numbers
- Order tracking page for customers
- Real-time order status updates

Order lifecycle:

```text
Pending
   ↓
Shipped
   ↓
Delivered
```

Customers can track the current status at any time using their order number.

---

### 🔐 Administrative Dashboard

A dedicated administration panel allows full management of the storefront without modifying code.

Admin capabilities:

- Create products
- Edit products
- Delete products
- Upload product images
- Manage inventory
- Manage customer orders
- Update order statuses

The storefront automatically reflects all database changes both locally and in production.

---

### 🏪 Product Management

Products are managed through a searchable dashboard table.

Features include:

- Search products by name
- Filter products by type
- Edit product details
- Replace product images
- Update prices
- Update inventory
- Delete products

All changes are synchronized directly with Supabase.

---

### 🖼 Media Management

The application uses Supabase Storage for product images.

- Direct image uploads
- Automatic image retrieval
- No dependency on manually hosted image URLs
- Centralized asset management

This allows administrators to manage visual content without developer involvement.

---

### 📊 Dynamic Inventory System

Inventory is managed dynamically using PostgreSQL JSONB fields.

Example:

```json
{
  "S": 5,
  "M": 8,
  "L": 2
}
```

This allows:

- Per-size stock management
- Flexible inventory structures
- Automatic stock reduction after purchases
- Simplified catalog maintenance

---

## 🏗 Architecture Overview

The project follows a modular architecture designed for maintainability and scalability.

### Frontend

- Views → Route-level pages
- Components → Reusable UI elements
- Services → Supabase interactions
- Utilities → Shared helper functions
- Router → Dynamic route handling

### Backend

- PostgreSQL Database (Supabase)
- Supabase Storage
- Role-based administration
- Relational product and order management

---

## 🚀 Major Architecture Refactor

The storefront was originally built using static JSON files and duplicated catalog views.

### Before

- 14 separate Vue catalog pages
- Product data stored in local JSON files
- Manual image management
- Repeated pagination and modal logic

### After

- 3 dynamic master catalog components
- Database-driven inventory
- Dynamic routing
- Shared reusable logic
- Centralized product management

Master components:

1. `CatalogoCds.vue`
2. `CatalogoRopa.vue`
3. `CatalogoMercancia.vue`

Routes dynamically load content such as:

```text
/cds/:genre
/ropa/:category
/mercancia/:type
```

### Benefits

- Reduced code duplication by over 75%
- Easier maintenance
- Greater scalability
- Single source of truth for inventory
- New products can be added without code changes

---

## 🛠 Technical Challenges Solved

### 🔄 Migration from Static Data to Database-Driven Architecture

The application originally relied on local JSON files.

The catalog was migrated to Supabase PostgreSQL, allowing:

- Centralized inventory management
- Persistent data storage
- Dynamic product retrieval
- Administrative control without code deployment

---

### 📦 Dynamic Inventory Modeling with JSONB

Instead of using a single stock value, inventory is stored using JSONB structures.

This allows products such as clothing items to maintain independent stock quantities per size while keeping the database schema flexible.

---

### 🖼 Product Asset Management

Migrated from manually hosted image URLs to Supabase Storage uploads.

Benefits:

- Easier content management
- Centralized asset storage
- Simplified product creation workflow

---

### 🛒 Automatic Stock Synchronization

When a purchase is completed:

- Order is created
- Inventory is updated
- Stock is reduced automatically
- Updated values are reflected throughout the storefront

---

### 📦 Order Tracking Workflow

Implemented a customer-facing tracking system.

Customers can:

- Enter an order number
- View order details
- Track fulfillment status

Administrative changes are reflected immediately.

---

## 🎨 Interface & User Experience

- Dark retro-inspired theme
- Responsive design
- Dynamic catalog filtering
- Product modals
- Status badges for orders
- Consistent visual identity inspired by music culture

---

## 🛠 Tech Stack

### Frontend

- Vue.js
- Vue Router
- JavaScript
- HTML5
- CSS3

### Backend

- Supabase
- PostgreSQL
- Supabase Storage

### Deployment

- Vercel

---

## 🔒 Security Considerations

For portfolio purposes, the order tracking system is publicly accessible through order numbers.

In a production environment this would typically be protected through stricter Row Level Security policies, authenticated users, or server-side authorization mechanisms.

---

## 🚧 Future Improvements

- 📈 Sales analytics dashboard
- 📊 Order history charts
- 🏆 Best-selling products metrics
- 🔍 Advanced inventory reporting
- ⚡ Performance optimizations
- 🧪 Automated testing
- 🔒 Enhanced security policies
- 📦 Low-stock notifications

---

## 💡 What This Project Demonstrates

- Vue.js application architecture
- Dynamic routing patterns
- Supabase integration
- PostgreSQL database design
- JSONB inventory modeling
- File uploads with Supabase Storage
- CRUD operations
- Administrative dashboard development
- Inventory management workflows
- Order processing systems
- Customer order tracking
- Scalable frontend architecture
- Migration from static data to database-driven systems

---

## ⚙️ Installation

```bash
git clone https://github.com/walterfcr/garage94.git

cd garage94

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

---

## 👨‍💻 Author

**Walter Fallas**

🌐 https://walterfallascr.com/

💻 https://github.com/walterfcr

---

## 📄 License

This project was built for educational and portfolio purposes.
