# Catálogo de Refaccionaria

Este es el repositorio para el catálogo en línea de la refaccionaria. Es una aplicación web moderna construida con Vue.js y Vite, diseñada para ser rápida, eficiente y fácil de mantener. Se conecta a una base de datos de Supabase para gestionar los productos.

## ✨ Características

- **Catálogo de Productos**: Visualización de productos con búsqueda y filtrado.
- **Páginas de Detalle**: Vistas detalladas para cada producto con galería de imágenes y especificaciones.
- **Integración con Supabase**: Los datos de los productos se obtienen en tiempo real desde una base de datos de Supabase.
- **Diseño Responsivo**: Interfaz adaptable a dispositivos móviles y de escritorio.
- **Modo Claro / Oscuro**: Soporte para temas claro y oscuro.
- **Generación de Sitio Estático (SSG)**: Optimizado para SEO y rendimiento gracias a `vite-ssg`.
- **Desarrollo Rápido**: Basado en la plantilla Vitesse con las mejores prácticas de desarrollo.

## 🛠️ Stack Tecnológico

- **Framework**: Vue 3
- **Build Tool**: Vite
- **Estilos CSS**: UnoCSS (motor de CSS atómico)
- **Enrutamiento**: unplugin-vue-router (basado en archivos)
- **Gestión de Estado**: Pinia
- **Base de Datos**: Supabase
- **TypeScript**: Por supuesto.

## 🚀 Puesta en Marcha

Sigue estos pasos para levantar el entorno de desarrollo local.

### 1. Prerrequisitos

- Node.js (versión 18+ recomendada)
- pnpm como gestor de paquetes

### 2. Clonar el Repositorio

```bash
git clone <URL-DEL-REPOSITORIO>
cd vitesse-catalog
```

### 3. Instalar Dependencias

```bash
pnpm install
```

### 4. Configurar Variables de Entorno

Para que la aplicación pueda conectarse a Supabase, necesitas crear un archivo .env en la raíz del proyecto. Puedes copiar el archivo de ejemplo:

```bash
cp .env.example .env
```

Luego, edita el archivo .env y añade tus credenciales de Supabase. Las encontrarás en el panel de tu proyecto en Supabase (Settings > API).

```env
VITE_SUPABASE_URL="https://tu-proyecto.supabase.co"
VITE_SUPABASE_ANON_KEY="tu-llave-anonima-publica"
```

### 5. Ejecutar el Servidor de Desarrollo

```bash
pnpm dev
```

¡Listo! La aplicación debería estar corriendo en http://localhost:3333.

## 📦 Scripts Disponibles

pnpm dev: Inicia el servidor de desarrollo.
pnpm build: Compila la aplicación para producción (genera un sitio estático en la carpeta dist/).
pnpm preview: Sirve la carpeta dist/ para previsualizar el build de producción.
pnpm lint: Revisa el código en busca de errores de estilo y formato.
