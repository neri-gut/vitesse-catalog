<script setup lang="ts">
const route = useRoute()
const searchQuery = computed(() => route.query.q || '')
</script>

<template>
  <div class="mx-auto max-w-1200px p-4 lg:p-8 sm:p-6">
    <h1 class="mb-6 text-3xl text-gray-900 font-bold dark:text-gray-100">
      <span v-if="searchQuery">Resultados para: "{{ searchQuery }}"</span>
      <span v-else>Catálogo de Productos</span>
    </h1>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <!-- Columna de Filtros -->
      <div class="lg:col-span-1">
        <FiltersSidebar />
      </div>
      <!-- Columna de Productos -->
      <div class="lg:col-span-3">
        <ProductGrid :search-query="searchQuery" />
        <!-- Aquí irá el componente de paginación -->
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: catalog
</route>
