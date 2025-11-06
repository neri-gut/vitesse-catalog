// Este archivo es un placeholder para tus tipos de Supabase.
// Puedes generar este archivo automáticamente con el CLI de Supabase:
// supabase gen types typescript --project-id <your-project-id> > src/types/supabase.ts

export interface Producto {
  id: number
  nombre: string
  descripcion: string | null
  precio: number
  existencia: number
  sku: string | null
  especificaciones_tecnicas: Record<string, any> | null
  fotos_productos: { url_imagen: string, orden: number }[]
}

export interface Promocion {
  id: number
  ubicacion: string
  titulo: string | null
  imagen_path: string
  link_destino: string | null
  orden: number
  activo: boolean
  fecha_inicio: string
  fecha_fin: string | null
}

// Puedes añadir aquí más interfaces para otras tablas
