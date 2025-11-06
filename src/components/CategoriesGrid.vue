<script setup lang="ts">
const categories = [
  { name: 'Frenos', icon: 'i-carbon-disc-array', slug: 'frenos' },
  { name: 'Motor', icon: 'i-carbon-engine', slug: 'motor' },
  { name: 'Suspensión', icon: 'i-carbon-vehicle-services', slug: 'suspension' },
  { name: 'Transmisión', icon: 'i-carbon-gear', slug: 'transmision' },
  { name: 'Eléctrico', icon: 'i-carbon-flash', slug: 'electrico' },
  { name: 'Filtros', icon: 'i-carbon-filter', slug: 'filtros' },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24 sm:px-6">
    <div class="text-center">
      <h2 class="text-2xl text-gray-800 font-bold tracking-tight sm:text-3xl dark:text-gray-200">
        O explora por categoría
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600 leading-8 dark:text-gray-400">
        Encuentra lo que necesitas navegando a través de las principales partes de tu vehículo.
      </p>
    </div>

    <div class="grid grid-cols-3 mt-12 gap-4 lg:grid-cols-6 md:grid-cols-4">
      <RouterLink
        v-for="category in categories"
        :key="category.name"
        :to="{ path: '/catalog', query: { categoria: category.slug } }"
        class="group flex flex-col items-center justify-center gap-y-2 rounded-lg bg-gray-100 p-6 text-center transition-colors dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/50"
      >
        <div
          class="text-4xl text-gray-700 transition-colors dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
          :class="category.icon"
        />
        <span class="text-sm text-gray-800 font-semibold dark:text-gray-200">{{ category.name }}</span>
      </RouterLink>
    </div>
  </div>
</template>
