<script setup lang="ts">
import type { Producto } from '~/types/supabase'
import { supabase } from '~/composables/supabase'

const props = defineProps<{
  searchQuery: string
}>()

const products = ref<Producto[]>([])
const loading = ref(true)

async function fetchProducts() {
  loading.value = true
  // Apuntamos a la tabla "productos" y hacemos un JOIN con "fotos_productos"
  const { data, error } = await supabase
    .from('productos')
    .select('*, fotos_productos(url_imagen)')

  if (error)
    console.error('Error fetching products:', error)
  else
    products.value = data
  loading.value = false
}

const filteredProducts = computed(() => {
  if (!props.searchQuery)
    return products.value

  const query = props.searchQuery.toLowerCase()
  return products.value.filter(product =>
    product.nombre.toLowerCase().includes(query),
  )
})

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div v-if="loading" class="text-center text-gray-500">
    Cargando productos...
  </div>
  <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
    <div
      v-for="product in filteredProducts"
      :key="product.id"
      class="overflow-hidden border border-gray-200 rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800"
    >
      <!-- Usamos la primera imagen de la tabla relacionada o un placeholder -->
      <img :src="product.fotos_productos?.[0]?.url_imagen || '/placeholder.svg'" :alt="`Imagen de ${product.nombre}`" class="h-48 w-full bg-gray-200 object-cover dark:bg-gray-700">
      <div class="p-4">
        <h3 class="h-14 text-lg text-gray-800 font-semibold dark:text-gray-200">
          {{ product.nombre }}
        </h3>
        <p class="mt-2 text-xl text-blue-600 font-bold dark:text-blue-400">
          <!-- Formateamos el precio para asegurar dos decimales -->
          ${{ Number(product.precio).toFixed(2) }}
        </p>
        <RouterLink
          :to="{ name: 'product-detail', params: { id: product.id } }"
          class="mt-4 block w-full rounded-md bg-blue-600 py-2 text-center text-white no-underline transition-colors hover:bg-blue-700"
        >
          Ver Detalles
        </RouterLink>
      </div>
    </div>
  </div>
</template>
