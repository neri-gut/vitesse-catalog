<script setup lang="ts">
const props = defineProps<{ id: string }>()

// Datos de ejemplo. Más adelante, esto vendrá de una llamada a la API usando el props.id
const product = ref({
  name: 'Balatas Delanteras Cerámicas',
  sku: 'BRK-12345',
  price: '850.00',
  image: '/placeholder.svg',
  description: 'Juego de balatas de cerámica de alto rendimiento, diseñadas para una frenada silenciosa y eficiente. Reducen el polvo y el desgaste del disco.',
  specifications: [
    { name: 'Material', value: 'Cerámica' },
    { name: 'Posición', value: 'Delantera' },
    { name: 'Compatibilidad', value: 'Vento (2016-2020), Polo (2015-2019)' },
    { name: 'Incluye', value: '4 balatas, herrajes de montaje' },
  ],
})
</script>

<template>
  <div class="mx-auto max-w-1200px p-4 lg:p-8 sm:p-6">
    <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
      <!-- Columna de la Imagen -->
      <div>
        <div class="aspect-square w-full overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
          <img :src="product.image" :alt="product.name" class="h-full w-full bg-gray-200 object-cover dark:bg-gray-700">
        </div>
        <!-- Aquí podrían ir thumbnails de imágenes adicionales -->
      </div>

      <!-- Columna de Información -->
      <div class="flex flex-col">
        <h1 class="text-3xl text-gray-900 font-bold dark:text-gray-100">
          {{ product.name }}
        </h1>
        <p class="mt-1 text-xs text-gray-400">
          (ID del producto: {{ props.id }})
        </p>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          SKU: {{ product.sku }}
        </p>
        <p class="mt-4 text-3xl text-blue-600 font-bold dark:text-blue-400">
          ${{ product.price }}
        </p>
        <p class="mt-6 text-base text-gray-700 leading-relaxed dark:text-gray-300">
          {{ product.description }}
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
            <dl class="space-y-4">
              <div v-for="spec in product.specifications" :key="spec.name" class="grid grid-cols-3 gap-4">
                <dt class="text-gray-600 font-medium dark:text-gray-400">
                  {{ spec.name }}
                </dt>
                <dd class="col-span-2 text-gray-800 dark:text-gray-200">
                  {{ spec.value }}
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
