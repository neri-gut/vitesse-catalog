<script setup lang="ts">
import type { Producto } from '~/types/supabase'
import { supabase } from '~/composables/supabase'

const products = ref<Producto[]>([])
const loading = ref(true)

async function fetchProducts() {
  loading.value = true
  const { data, error } = await supabase
    .from('productos')
    .select('*, fotos_productos(url_imagen, orden)')
    .order('orden', { foreignTable: 'fotos_productos', ascending: true })
    .limit(20) // Limitar a 20 productos por ahora

  if (error) {
    console.error('Error fetching products:', error)
    products.value = []
  }
  else {
    // Nos aseguramos de que cada producto tenga su foto principal
    products.value = data.map(p => ({
      ...p,
      fotos_productos: p.fotos_productos.filter(f => f.orden === 0),
    }))
  }
  loading.value = false
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="mx-auto max-w-1200px p-4 lg:p-8 sm:p-6">
    <h1 class="text-3xl text-gray-900 font-bold dark:text-gray-100">
      Catálogo de Productos
    </h1>

    <div v-if="loading" class="mt-8 text-center">
      Cargando productos...
    </div>
    <div v-else-if="products.length === 0" class="mt-8 text-center">
      No se encontraron productos.
    </div>
    <div v-else class="grid grid-cols-2 mt-8 gap-4 lg:grid-cols-4 lg:gap-8 sm:gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>
