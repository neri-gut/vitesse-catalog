<script setup lang="ts">
import type { Producto } from '~/types/supabase'
import VueEasyLightbox from 'vue-easy-lightbox'
import { useRoute } from 'vue-router'
import { supabase } from '~/composables/supabase'

const route = useRoute()
const product = ref<Producto | null>(null)
const activeImage = ref('')

// --- Lightbox (Galería de imágenes) ---
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)
const lightboxImages = computed(() => product.value?.fotos_productos?.map(foto => foto.url_imagen) || [])

// --- Datos de Contacto (puedes moverlos a un archivo de configuración más adelante) ---
const phoneNumber = '521234567890' // Reemplaza con tu número de teléfono
const whatsappLink = computed(() => {
  if (!product.value)
    return ''
  const message = `Hola, me interesa el producto "${product.value.nombre}" (SKU: ${product.value.sku}). ¿Podrían darme más información?`
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
})
// ------------------------------------------------------------------------------------

// --- Lógica de Existencias ---
const stockStatus = computed(() => {
  if (!product.value)
    return { text: '', class: '' }

  const stock = product.value.existencia

  if (stock > 20)
    return { text: `En existencia: ${stock} unidades`, class: 'text-green-600 dark:text-green-400' }
  if (stock > 5)
    return { text: `En existencia: ${stock} unidades`, class: 'text-yellow-600 dark:text-yellow-400' }
  if (stock > 0)
    return { text: `¡Últimas ${stock} unidades!`, class: 'text-red-600 dark:text-red-400' }

  return { text: 'Agotado', class: 'text-red-600 dark:text-red-400' }
})

const loading = ref(true)

function showLightbox(index: number) {
  lightboxIndex.value = index
  lightboxVisible.value = true
}

async function fetchProduct() {
  loading.value = true
  const productId = route.params.id as string

  // Asegurarnos de que el id no sea undefined antes de hacer la petición
  if (!productId) {
    loading.value = false
    return
  }

  const { data, error } = await supabase
    .from('productos')
    .select('*, fotos_productos(url_imagen, orden)')
    .eq('id', Number.parseInt(productId, 10)) // Convertimos el id de string a número
    .order('orden', { foreignTable: 'fotos_productos' }) // Ordenamos las fotos
    .single()

  if (error) {
    console.error(`Error fetching product with id ${productId}:`, error)
  }
  else {
    product.value = data
    activeImage.value = data?.fotos_productos?.[0]?.url_imagen || '/placeholder.svg'
  }

  loading.value = false
}

// Usamos watchEffect para que la carga de datos sea reactiva al cambio del prop 'id'
watchEffect(() => {
  fetchProduct()
})
</script>

<template>
  <div v-if="loading" class="text-center text-gray-500">
    Cargando producto...
  </div>
  <div v-else-if="!product" class="text-center text-red-500">
    Producto no encontrado.
  </div>
  <div v-else class="mx-auto max-w-1200px p-4 lg:p-8 sm:p-6">
    <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
      <!-- Columna de la Imagen -->
      <div>
        <!-- Imagen Principal -->
        <div class="group relative aspect-square w-full cursor-pointer overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700" @click="showLightbox(0)">
          <img :src="activeImage" :alt="product.nombre" class="h-full w-full bg-gray-200 object-cover dark:bg-gray-700">
        </div>
        <!-- Miniaturas (Thumbnails) -->
        <div v-if="product.fotos_productos && product.fotos_productos.length > 1" class="grid grid-cols-5 mt-4 gap-4">
          <button
            v-for="foto in product.fotos_productos" :key="foto.id"
            class="aspect-square w-full overflow-hidden border-2 rounded-md transition"
            :class="[activeImage === foto.url_imagen ? 'border-blue-500' : 'border-transparent']"
            @click="activeImage = foto.url_imagen"
          >
            <img :src="foto.url_imagen" :alt="`Vista de ${product.nombre}`" class="h-full w-full object-cover">
          </button>
        </div>
      </div>

      <!-- Columna de Información -->
      <div class="flex flex-col">
        <h1 class="text-3xl text-gray-900 font-bold dark:text-gray-100">
          {{ product.nombre }}
        </h1>
        <p class="mt-1 text-xs text-gray-400">
          (ID del producto: {{ product.id }})
        </p>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          SKU: {{ product.sku }}
        </p>
        <p class="mt-4 text-3xl text-blue-600 font-bold dark:text-blue-400">
          ${{ Number(product.precio).toFixed(2) }}
        </p>
        <!-- Sección de Existencias -->
        <p class="mt-2 text-base font-semibold" :class="stockStatus.class">
          {{ stockStatus.text }}
        </p>
        <p class="mt-6 text-base text-gray-700 leading-relaxed dark:text-gray-300">
          {{ product.descripcion }}
        </p>

        <!-- Botones de Contacto -->
        <div class="mt-10 space-y-4">
          <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-x-3 rounded-md bg-green-600 px-8 py-3 text-lg text-white font-semibold no-underline transition-colors hover:bg-green-700">
            <div i-carbon-logo-whatsapp class="text-2xl" />
            <span>Enviar WhatsApp</span>
          </a>

          <a :href="`tel:${phoneNumber}`" class="w-full flex items-center justify-center gap-x-3 rounded-md bg-blue-600 px-8 py-3 text-lg text-white font-semibold no-underline transition-colors hover:bg-blue-700">
            <div i-carbon-phone class="text-2xl" />
            <span>Llamar para Cotizar</span>
          </a>

          <button class="w-full flex items-center justify-center gap-x-3 border border-gray-300 rounded-md bg-white px-8 py-3 text-lg text-gray-700 font-semibold transition-colors dark:border-gray-600 dark:bg-gray-800 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
            <div i-carbon-chat class="text-2xl" />
            <span>Hacer una Pregunta</span>
          </button>
        </div>

        <!-- Especificaciones Técnicas -->
        <div class="mt-10">
          <h2 class="text-xl text-gray-800 font-semibold dark:text-gray-200">
            Especificaciones
          </h2>
          <div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            <dl v-if="product.especificaciones_tecnicas" class="space-y-4">
              <div v-for="(value, name) in product.especificaciones_tecnicas" :key="name" class="grid grid-cols-3 gap-4">
                <dt class="text-gray-600 font-medium dark:text-gray-400">
                  {{ name }}
                </dt>
                <dd class="col-span-2 text-gray-800 dark:text-gray-200">
                  {{ value }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>

  <VueEasyLightbox
    :visible="lightboxVisible"
    :imgs="lightboxImages"
    :index="lightboxIndex"
    @hide="lightboxVisible = false"
  />
</template>

<route lang="yaml">
name: product-detail
</route>
