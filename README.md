# 🎵 Garage94 – Music Store (Vue.js)

## 🚀 Overview

Garage94 is a frontend e-commerce simulation built with Vue.js, inspired by 90s and earlier music culture.
The application showcases a modular component-based architecture and dynamic UI interactions for browsing music products.

## 🧠 Description

This project simulates an online music store where users can explore CDs by genre and view detailed product information through interactive modals.

It focuses on:

- Component reusability
- UI/UX design
- Dynamic filtering
- Clean visual identity inspired by retro music aesthetics

## ⚙️ Tech Stack

- Vue.js
- JavaScript
- HTML5
- CSS3 (Custom Properties)

## ✨ Features

- 🎶 Filter CDs by music genre
- 📀 Dynamic product rendering using reusable Vue components
- 🔍 Product detail modal with price and information
- 👕 Clothing section with selectable sizes
- 🎨 Custom color palette inspired by 90s music culture
- 📱 Responsive layout

## 🎨 Design System

The UI is built around a dark theme with vibrant accent colors:

```css
--color-background-dark: #1f1f1f;
--color-background-light: #f5f5f5;
--color-surface: #2a2a2a;

--color-accent: #ff0055;
--color-accent-hover: #e6004c;
--color-accent-alt: #ffba08;

--color-text-light: #f5f5f5;
--color-text-muted: #cccccc;
--color-text-dark: #1f1f1f;

--color-border: #333333;
--color-card-bg: #2e2e2e;
```

## 📸 Screenshots

(Add screenshots here)

## 🚀 Recent Architecture Refactor: Dynamic Catalog System

Recently, the entire storefront catalog system was re-architected to move away from hardcoded JSON arrays and static view duplication.

### The Evolution:

- **Before:** **14 separate Vue files** (e.g., `RopaGrunge.vue`, `RopaMujer.vue`, `CatalogoPunk.vue`, etc.), each maintaining duplicate pagination, window resize handlers, and modal logic.
- **After:** **3 master components** powered dynamically by **Vue Router parameters** and **Supabase relational queries**.

### The 3 Master Components:

1. `CatalogoCds.vue` - Handles all 8+ music genres dynamically (`/cds/:genero`).
2. `CatalogoRopa.vue` - Handles all clothing styles and departments (`/ropa/:categoria`).
3. `CatalogoMercancia.vue` - Handles all collectibles and accessories (`/mercancia/:tipo`).

### 💎 Key Benefits:

- **High Scalability:** Adding a new music genre, clothing line, or merchandise category now requires **zero code changes**. We just insert the items into the Supabase `products` table, and the UI dynamically renders them.
- **Code Maintainability:** Reduced code duplication by **over 75%**. Bug fixes or layout updates to pagination or modals only need to be written once instead of across 14 separate files.
- **Database Single-Source of Truth:** All inventory is now centralized inside a single PostgreSQL table (`products`), seamlessly filtered on the fly via Supabase `.eq()` queries utilizing the unified `type` and `category` schema layout.

## 🛠️ Installation

```bash
npm install
npm run dev
```

## 🚧 Current Status

This project is a frontend prototype and is still under development.

## 🌐 Live Demo

https://garage94.vercel.app/

## 🔮 Future Improvements

- 🛒 Shopping cart functionality
- 📦 Inventory management system
- 🔐 User authentication (login/register)
- 💳 Checkout and payment flow
- 📜 Order history tracking
- 🔗 Backend integration (Node.js / Firebase)

## 📚 What I Learned

- Building scalable UI with Vue components
- Managing state across components
- Creating reusable and maintainable structures
- Designing cohesive UI systems

## 👤 Author

Walter Fallas

## 📫 Contact

https://walterfallascr.com/
