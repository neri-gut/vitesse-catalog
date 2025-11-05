<script setup lang="ts">
import type { Producto } from '~/types/supabase'

defineProps<{
  product: Producto
}>()
</script>

<template>
  <RouterLink
    :to="`/product/${product.id}`"
    class="group flex flex-col overflow-hidden border border-gray-200 rounded-lg bg-white no-underline transition-all dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
  >
    <!-- Imagen del Producto -->
    <div class="aspect-square w-full overflow-hidden">
      <img
        :src="product.fotos_productos?.[0]?.url_imagen || '/placeholder.svg'"
        :alt="`Imagen de ${product.nombre}`"
        class="h-full w-full bg-gray-100 object-cover transition-transform duration-300 group-hover:scale-105 dark:bg-gray-700"
      >
    </div>

    <!-- Información del Producto -->
    <div class="flex flex-1 flex-col p-4">
      <h3 class="text-base text-gray-800 font-semibold dark:text-gray-200">
        {{ product.nombre }}
      </h3>
      <div class="mt-4 flex items-baseline justify-between">
        <p class="text-lg text-blue-600 font-bold dark:text-blue-400">
          ${{ Number(product.precio).toFixed(2) }}
        </p>
        <p class="text-sm text-gray-500 font-medium dark:text-gray-400">
          Existencias: {{ product.existencia }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>
