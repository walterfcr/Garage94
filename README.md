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

## 🛠️ Refactorización de Componentes: Optimización de Vistas por Género

### 🔴 Antes del Refactor (Deuda Técnica)

Originalmente, la aplicación contaba con **8 componentes individuales** para renderizar las distintas páginas de géneros musicales (ej. `PunkRock.vue`/`.js`, `Hardcore.vue`, `PopPunk.vue`, etc.).

- **Problema:** Esto generaba una gran duplicidad de código (_Don't Repeat Yourself - DRY_ roto), dificultaba el mantenimiento y escalabilidad, ya que cualquier cambio en la interfaz requería modificar los 8 archivos por separado.

### 🟢 Después del Refactor (Componente Reutilizable Único)

Se eliminaron los 8 componentes redundantes y se unificó toda la lógica en **un solo componente dinámico y reutilizable**.

- **¿Cómo funciona?** El nuevo componente centralizado detecta el género musical de forma dinámica (generalmente a través de parámetros de la URL de la ruta o mediante _props_).
- **Filtrado Eficiente:** Con el género identificado, el componente realiza un único filtro sobre el estado global de productos (`products.filter(p => p.genre === generoActivo)`) y renderiza la grilla musical correspondiente de manera automática.

### 🚀 Beneficios Obtenidos:

- **Mantenibilidad:** El código visual y la lógica de filtrado ahora viven en un solo lugar. Si se añade un nuevo género a la tienda de música, no hay que crear código nuevo, la interfaz lo maneja en automático.
- **Reducción de Peso:** Menos archivos en el proyecto, lo que optimiza el rendimiento y la limpieza del repositorio en GitHub.

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
