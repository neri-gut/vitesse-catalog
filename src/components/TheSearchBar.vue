<script setup lang="ts">
const searchQuery = ref('')
const router = useRouter()

function performSearch() {
  if (searchQuery.value.trim())
    router.push({ name: 'catalog', query: { q: searchQuery.value } })
}
</script>

<template>
  <div class="flex justify-center px-4">
    <form
      class="max-w-600px w-full flex overflow-hidden border border-gray-300 rounded-md bg-white dark:border-gray-600 dark:bg-gray-900"
      @submit.prevent="performSearch"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por # de parte, nombre o modelo..."
        class="flex-grow border-none bg-transparent px-4 py-3 text-base text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <button type="submit" class="cursor-pointer border-none bg-blue-600 px-6 py-3 text-base text-white font-medium hover:bg-blue-700">
        Buscar
      </button>
    </form>
  </div>
</template>
