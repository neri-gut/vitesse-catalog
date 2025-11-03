<script setup lang="ts">
// Datos de ejemplo. Más adelante, esto vendrá de Supabase.
const categories = ref([
  { id: 'frenos', name: 'Frenos' },
  { id: 'motor', name: 'Motor' },
  { id: 'suspension', name: 'Suspensión' },
  { id: 'filtros', name: 'Filtros' },
  { id: 'electrico', name: 'Eléctrico' },
  { id: 'transmision', name: 'Transmisión' },
])
</script>

<template>
  <section class="mx-auto my-16 max-w-900px px-4 text-center">
    <h2 class="mb-8 text-2xl text-gray-800 font-semibold dark:text-gray-200">
      Categorías Principales
    </h2>
    <div class="grid grid-cols-2 gap-6 md:grid-cols-3">
      <div
        v-for="category in categories"
        :key="category.id"
        class="border border-gray-200 rounded-lg bg-gray-100 transition-all hover:(transform-translate-y--1 border-gray-300 shadow-lg dark:border-gray-600) dark:border-gray-700 dark:bg-gray-800"
      >
        <RouterLink
          :to="{ name: 'catalog', query: { category: category.id } }"
          class="block px-4 py-8 text-lg text-gray-800 font-medium no-underline dark:text-gray-200"
        >
          {{ category.name }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
