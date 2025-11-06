<script setup lang="ts">
import type { Promocion } from '~/types/supabase'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { supabase } from '~/composables/supabase'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [Autoplay, Navigation, Pagination]
const promotions = ref<Promocion[]>([])
const loading = ref(true)

/**
 * Construye la URL pública de una imagen en Supabase Storage.
 * @param path - El path de la imagen en el bucket.
 */
function getPublicImageUrl(path: string) {
  const { data } = supabase.storage.from('promociones').getPublicUrl(path)
  return data.publicUrl
}

async function fetchPromotions() {
  loading.value = true
  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from('promociones')
    .select('*')
    .eq('ubicacion', 'home-carousel')
    .eq('activo', true)
    .lte('fecha_inicio', now)
    .or(`fecha_fin.is.null,fecha_fin.gte.${now}`) // La promo no ha expirado o nunca expira
    .order('orden', { ascending: true })

  if (error) {
    console.error('Error fetching promotions:', error)
    promotions.value = []
  }
  else {
    promotions.value = data
  }
  loading.value = false
}

onMounted(() => {
  fetchPromotions()
})
</script>

<template>
  <div v-if="loading" class="h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
    <p>Cargando promociones...</p>
  </div>

  <ClientOnly v-else-if="promotions.length > 0">
    <Swiper
      class="w-full"
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :loop="true"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :navigation="true"
    >
      <SwiperSlide v-for="promo in promotions" :key="promo.id">
        <RouterLink :to="promo.link_destino || '#'" class="block aspect-video lg:aspect-[3/1] md:aspect-[2.5/1]">
          <img :src="getPublicImageUrl(promo.imagen_path)" :alt="promo.titulo || 'Promoción'" class="h-full w-full object-contain">
        </RouterLink>
      </SwiperSlide>
    </Swiper>
  </ClientOnly>
</template>
