<script setup lang="ts">
import type { Producto } from '~/types/supabase'
import { supabase } from '~/composables/supabase'

const props = defineProps<{ id: string }>()

const product = ref<Producto | null>(null)
const loading = ref(true)

async function fetchProduct() {
  loading.value = true
  const { data, error } = await supabase
    .from('productos')
    .select('*, fotos_productos(url_imagen)')
    .eq('id', props.id)
    .single()

  if (error)
    console.error(`Error fetching product with id ${props.id}:`, error)
  else
    product.value = data
  loading.value = false
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div v-if="loading" class="text-center text-gray-500">
    Cargando producto...
  </div>
  <div v-else-if="!product" class="text-center text-red-500">
    Producto no encontrado.
  </div>
  <div v-else class="mx-auto max-w-1200px p-4 lg:p-8 sm:p-6">
    <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
      <!-- Columna de la Imagen -->
      <div>
        <div class="aspect-square w-full overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
          <img :src="product.fotos_productos?.[0]?.url_imagen || '/placeholder.svg'" :alt="product.nombre" class="h-full w-full bg-gray-200 object-cover dark:bg-gray-700">
        </div>
        <!-- Aquí podrían ir thumbnails de imágenes adicionales -->
      </div>

      <!-- Columna de Información -->
      <div class="flex flex-col">
        <h1 class="text-3xl text-gray-900 font-bold dark:text-gray-100">
          {{ product.nombre }}
        </h1>
        <p class="mt-1 text-xs text-gray-400">
          (ID del producto: {{ props.id }})
        </p>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          SKU: {{ product.sku }}
        </p>
        <p class="mt-4 text-3xl text-blue-600 font-bold dark:text-blue-400">
          ${{ Number(product.precio).toFixed(2) }}
        </p>
        <p class="mt-6 text-base text-gray-700 leading-relaxed dark:text-gray-300">
          {{ product.descripcion }}
        </p>

        <div class="mt-8">
          <button class="w-full rounded-md bg-blue-600 px-8 py-3 text-lg text-white font-semibold hover:bg-blue-700">
            Añadir al Carrito
          </button>
        </div>

        <!-- Especificaciones Técnicas -->
        <div class="mt-10">
          <h2 class="text-xl text-gray-800 font-semibold dark:text-gray-200">
            Especificaciones
          </h2>
          <div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            <dl v-if="product.especificaciones_tecnicas" class="space-y-4">
              <div v-for="(value, name) in product.especificaciones_tecnicas" :key="name" class="grid grid-cols-3 gap-4">
                <dt class="text-gray-600 font-medium dark:text-gray-400">
                  {{ name }}
                </dt>
                <dd class="col-span-2 text-gray-800 dark:text-gray-200">
                  {{ value }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: product-detail
</route>
