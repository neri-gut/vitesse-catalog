<script setup lang="ts">
const searchTerm = ref('')
const router = useRouter()

function search() {
  if (searchTerm.value.trim())
    router.push({ path: '/catalog', query: { q: searchTerm.value.trim() } })
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form class="group relative" @submit.prevent="search">
      <div i-carbon-search class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
      <input
        v-model="searchTerm"
        type="search"
        name="q"
        placeholder="Ej: Bomba de agua Silverado 2010 ó 54610-3S000"
        class="w-full border border-gray-300 rounded-full bg-white py-4 pl-11 pr-32 text-gray-900 shadow-lg transition dark:border-gray-600 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-500"
      >
      <button type="submit" class="absolute right-2 top-1/2 rounded-full bg-blue-600 px-6 py-2.5 text-sm text-white font-semibold transition-colors -translate-y-1/2 hover:bg-blue-700">
        Buscar
      </button>
    </form>
  </div>
</template>
