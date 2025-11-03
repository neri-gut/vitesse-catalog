<template>
  <header
    class="border-b border-gray-200 bg-gray-100 px-8 py-3 dark:border-gray-700 dark:bg-gray-800"
  >
    <div
      class="mx-auto max-w-1200px flex items-center justify-between"
    >
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 text-xl text-gray-800 font-semibold no-underline dark:text-gray-200">
        <div i-carbon-delivery-parcel text-2xl />
        <span>Refacciones</span>
      </RouterLink>

      <!-- Menú de Navegación -->
      <nav class="flex gap-6 text-lg">
        <RouterLink to="/" class="hover:text-blue-500" active-class="font-bold text-blue-600">
          Inicio
        </RouterLink>
        <RouterLink to="/catalog" class="hover:text-blue-500" active-class="font-bold text-blue-600">
          Catálogo
        </RouterLink>
        <RouterLink to="/faq" class="hover:text-blue-500" active-class="font-bold text-blue-600">
          Preguntas
        </RouterLink>
      </nav>

      <!-- Botón de Tema (Dark/Light) -->
      <button icon-btn title="Toggle Dark Mode" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
    </div>
  </header>
</template>
