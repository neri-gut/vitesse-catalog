<script setup lang="ts">
// Datos de ejemplo. Más adelante, esto vendrá de la API.
const filterGroups = ref([
  {
    name: 'Categoría',
    options: ['Frenos', 'Motor', 'Suspensión', 'Filtros'],
  },
  {
    name: 'Marca',
    options: ['Brembo', 'ACDelco', 'Motorcraft', 'Bosch'],
  },
])
</script>

<template>
  <aside class="h-fit rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
    <h3 class="mb-4 text-xl text-gray-800 font-semibold dark:text-gray-200">
      Filtros
    </h3>
    <div v-for="group in filterGroups" :key="group.name" class="mb-6">
      <h4 class="mb-3 text-gray-700 font-semibold dark:text-gray-300">
        {{ group.name }}
      </h4>
      <ul class="space-y-2">
        <li v-for="option in group.options" :key="option">
          <label class="flex cursor-pointer items-center gap-2">
            <input type="checkbox" class="rounded text-blue-600 focus:ring-blue-500">
            <span class="text-gray-600 dark:text-gray-400">{{ option }}</span>
          </label>
        </li>
      </ul>
    </div>
  </aside>
</template>
