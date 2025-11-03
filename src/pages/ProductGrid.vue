<script setup lang="ts">
// Datos de ejemplo. Más adelante, esto vendrá de la API.
const products = ref([
  { id: 1, name: 'Balatas Delanteras Cerámicas', price: '850.00', image: '/placeholder.svg' },
  { id: 2, name: 'Bomba de Agua para Vento', price: '1,200.00', image: '/placeholder.svg' },
  { id: 3, name: 'Filtro de Aceite Sintético', price: '150.00', image: '/placeholder.svg' },
  { id: 4, name: 'Amortiguador Delantero Izquierdo', price: '1,500.00', image: '/placeholder.svg' },
  { id: 5, name: 'Kit de Afinación Completo', price: '950.00', image: '/placeholder.svg' },
  { id: 6, name: 'Sensor de Oxígeno', price: '780.00', image: '/placeholder.svg' },
])
</script>

<template>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
    <div
      v-for="product in products"
      :key="product.id"
      class="overflow-hidden border border-gray-200 rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800"
    >
      <img :src="product.image" alt="Imagen del producto" class="h-48 w-full bg-gray-200 object-cover dark:bg-gray-700">
      <div class="p-4">
        <h3 class="h-14 text-lg text-gray-800 font-semibold dark:text-gray-200">
          {{ product.name }}
        </h3>
        <p class="mt-2 text-xl text-blue-600 font-bold dark:text-blue-400">
          ${{ product.price }}
        </p>
        <button class="mt-4 w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700">
          Ver Detalles
        </button>
      </div>
    </div>
  </div>
</template>
