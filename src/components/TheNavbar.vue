<script setup lang="ts">
import { useToggle } from '@vueuse/core'

const [isMenuOpen, toggleMenu] = useToggle(false)

const navLinks = [
  { name: 'Catálogo', to: '/catalog' },
  { name: 'FAQ', to: '/faq' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-900/80">
    <div class="mx-auto max-w-1200px px-4 lg:px-8 sm:px-6">
      <div class="h-16 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold no-underline" @click="isMenuOpen = false">
            <div i-carbon-vehicle-services class="text-blue-600 dark:text-blue-400" />
            <span class="hidden text-gray-900 sm:inline dark:text-gray-100">Refaccionaria Max</span>
          </RouterLink>
        </div>

        <!-- Right side: Dark mode toggle & Mobile menu button -->
        <div class="flex items-center gap-x-4 md:gap-x-6">
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex md:gap-x-6">
            <RouterLink
              v-for="link in navLinks"
              :key="link.name"
              :to="link.to"
              class="text-base text-gray-600 font-semibold no-underline transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {{ link.name }}
            </RouterLink>
          </nav>

          <!-- Separador Visual -->
          <div class="hidden h-6 w-px bg-gray-200 md:block dark:bg-gray-700" />

          <button
            icon-btn
            title="Toggle dark mode"
            @click="toggleDark()"
          >
            <div i-carbon-sun dark:i-carbon-moon />
          </button>

          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
              @click="toggleMenu()"
            >
              <span class="sr-only">Abrir menú principal</span>
              <div v-if="!isMenuOpen" i-carbon-menu class="h-6 w-6" />
              <div v-else i-carbon-close class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Panel -->
    <div v-if="isMenuOpen" class="border-t border-gray-200/50 md:hidden dark:border-gray-800/50">
      <div class="px-2 py-3 space-y-1 sm:px-3">
        <RouterLink v-for="link in navLinks" :key="link.name" :to="link.to" class="block rounded-md px-3 py-2 text-base text-gray-700 font-medium no-underline hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" @click="toggleMenu(false)">
          {{ link.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>
