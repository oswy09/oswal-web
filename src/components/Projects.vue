<template>
  <div class="scene">
    <!-- Header Section with Filters -->
    <div class="header-section">
      <div class="filter-section">
        <div class="filter-bar">
          <label class="f-check" :class="{ on: isAllActive }" @click.prevent="selectAll">
            <span class="f-box">
              <svg v-if="isAllActive" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l3 3 5-5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            Todos
          </label>
          <span class="f-divider"></span>
          <label
            v-for="filter in activeFilters"
            :key="filter.id"
            class="f-check"
            :class="{ on: filter.active }"
            @click.prevent="filter.active = !filter.active"
          >
            <span class="f-box">
              <svg v-if="filter.active" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l3 3 5-5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            {{ filter.name }}
            <span class="f-count">{{ countByFilter(filter.id) }}</span>
          </label>
        </div>

        <div class="applied-filters" v-if="!isAllActive">
          <span class="applied-label">Viendo:</span>
          <button
            v-for="filter in activeFilters.filter(f => f.active)"
            :key="filter.id"
            class="applied-tag"
            @click="filter.active = false"
          >{{ filter.name }} ×</button>
          <button class="applied-clear" @click="selectAll">Ver todos</button>
        </div>
      </div>

      <div class="mobile-scroll-hint">
        <span>desliza hacia abajo</span>
        <svg viewBox="0 0 24 24" fill="none" class="hint-arrow-m">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="view-toggle">
        <button :class="{ active: viewMode === 'gallery' }" @click="viewMode = 'gallery'" title="Vista galería">
          <svg viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.5"/>
            <rect x="9" y="1" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.5"/>
            <rect x="1" y="9" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.5"/>
            <rect x="9" y="9" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
        <button :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'" title="Vista lista">
          <svg viewBox="0 0 16 16" fill="none">
            <rect x="1" y="2" width="14" height="3.5" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="1" y="7.5" width="14" height="3.5" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="1" y="13" width="14" height="1" rx="0.5" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- List View -->
    <div class="list-view" v-if="viewMode === 'list'">
      <div class="list-grid" ref="listGridRef">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="list-card"
          :class="`card-cat--${Array.isArray(project.category) ? project.category[0] : project.category}`"
          @click="navigateToProject(project.slug)"
          @mousemove="onCardMouseMove"
          @mouseleave="onCardMouseLeave"
        >
          <div class="list-img-wrap">
            <img :src="project.image" :alt="project.title" loading="lazy"/>
            <div class="list-img-overlay"></div>
          </div>
          <div class="list-info">
            <span class="list-deco-num">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="list-info-top">
              <span class="list-cat-dot"></span>
              <span class="list-cat-label">{{ Array.isArray(project.category) ? project.category[0] : project.category }}</span>
            </div>
            <h3 class="list-title">{{ project.title }}</h3>
            <p class="list-client">{{ project.client }}</p>
            <div class="list-tags">
              <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="list-tag">{{ tag }}</span>
            </div>
            <div class="list-footer">
              <span class="list-cta-pill">Ver caso →</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floor -->
    <div class="floor" id="floor">
      <div class="lines"></div>
      <div class="diagonal-lines"></div>
      <div class="perspective-lines">
        <div v-for="n in 15" :key="n" class="perspective-line"></div>
      </div>
      <div class="horizontal-lines">
        <div v-for="n in 10" :key="n" class="horizontal-line"></div>
      </div>
      <div class="overlay"></div>
    </div>

    <!-- Wall -->
    <div class="wall" id="wall">
      <div class="brick-pattern"></div>
      <div class="brick-overlay"></div>
      
      <!-- Gallery with horizontal scrolling -->
      <div class="gallery-section">
        <div class="gallery-container" id="galleryContainer" @wheel="handleWheel">
          <div class="gallery-track" id="galleryTrack"
               :style="{ transform: `translateX(${currentTranslate}px)` }">
            <!-- Scroll hint occupies first slot -->
            <div class="scroll-hint-slot" :class="{ 'hint-gone': scrolled }">
              <p class="hint-text">scrollea para<br>ir pasando</p>
              <svg class="hint-arrow" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 38 C12 22, 30 8, 52 16 C70 23, 85 16, 98 26"
                      stroke="#4831D4" stroke-width="2.4" stroke-linecap="round" fill="none"/>
                <path d="M90 16 L100 27 L88 32"
                      stroke="#4831D4" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </div>
            <div v-for="(project, index) in filteredProjects" :key="project.id" class="artwork-unit">
              <!-- Hanging lamp -->
              <div class="lamp" :class="{ 'lamp-hover': hoveredProject === project.id }">
                <div class="lamp-wire"></div>
                <div class="lamp-shade"></div>
                <div class="lamp-light"></div>
              </div>

              <!-- Frame -->
              <div class="artwork-wrapper">
                <div class="artwork"
                     @mouseenter="hoveredProject = project.id"
                     @mouseleave="hoveredProject = null">
                  <div class="artwork-content">
                    <img
                      :src="project.image"
                      :alt="`Proyecto ${project.title} - ${project.category}`"
                      class="project-image"
                      loading="lazy"
                      decoding="async"
                    />
                    <!-- Hover overlay: "Ver caso completo" -->
                    <div class="view-overlay"
                         :class="{ 'overlay-initial': index === 0 && !scrolled }"
                         @click="navigateToProject(project.slug)">
                      <span class="view-label">Ver caso completo →</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Gallery info card below frame -->
              <div class="gallery-card">
                <div class="card-dot"></div>
                <p class="card-title">{{ project.title }}</p>
                <p class="card-client">{{ project.client || 'Cliente' }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Progress bar -->
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Add Floor Buttons -->
    <div class="floor-buttons">
      <div class="button-panel">
        <button
          v-for="section in sections"
          :key="section.floor"
          @click="goToFloor(section)"
          :class="{ active: currentFloor === section.floor }"
          class="floor-button"
        >
          <div class="button-light" :class="{ 'is-active': currentFloor === section.floor }"></div>
          <span class="floor-number">{{ section.floor }}</span>
          <span class="floor-name">{{ section.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch as watchVue } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const router = useRouter()
const currentFloor = ref(2) // Projects is on floor 2

interface Section {
  floor: number
  name: string
  route: string
}

const sections: Section[] = [
  { floor: 1, name: 'Servicios', route: '/services' },
  { floor: 2, name: 'Proyectos', route: '/projects' },
  { floor: 3, name: 'Contacto', route: '/contact' },
  { floor: 4, name: 'Sobre mí', route: '/about' }
]

const filters = [
  { id: 'website',   name: 'Website',    active: true },
  { id: 'landing',   name: 'Landing',    active: true },
  { id: 'interfaz',  name: 'Interfaz',   active: true },
  { id: 'ecommerce', name: 'E-commerce', active: true },
]

const activeFilters = ref(filters.map(f => ({ ...f })))
const viewMode = ref<'gallery' | 'list'>('gallery')

const isAllActive = computed(() => activeFilters.value.every(f => f.active))

const countByFilter = (id: string) =>
  projects.filter(p => Array.isArray(p.category) ? p.category.includes(id) : p.category === id).length

const selectAll = () => {
  const next = !isAllActive.value
  activeFilters.value.forEach(f => { f.active = next })
}

const goToFloor = (section: Section) => {
  router.push(section.route)
}



const currentTranslate = ref(0)
const progressWidth = ref(0)
const maxScroll = ref(0)
const hoveredProject = ref<number | null>(null)
const scrolled = ref(false)

const projects = [
  { id: 1,  slug: 'hotel-amazon',         title: "Website Hotel",                 image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757359521/Hotel_Amazon_proyecto_oswal.png",           category: ["website"],            client: "Hotel Amazon",          tags: ["Hospitality","Booking","Responsive","CMS"],             order: 1  },
  { id: 2,  slug: 'micentro-comercial',   title: "Web centro comercial",          image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371575/Micentro_website_proyecto_oswal.png",        category: ["website","ecommerce"], client: "Micentro Comercial",    tags: ["Shopping","Directory","Catalog","Payment"],             order: 4  },
  { id: 3,  slug: 'axa-portal',           title: "Website portal",                image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757361622/Redise%C3%B1o_web_Proyecto_oswal.png",      category: ["website"],            client: "AXA Colpatria",         tags: ["Portal","Corporate","Multi-page","Professional"],       order: 3  },
  { id: 4,  slug: 'acueducto-ia',         title: "Plataforma de Estudio con IA",  image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757370425/Quizz_website_proyectos_Oswal.png",         category: ["interfaz"],           client: "Acueducto Bogotá",      tags: ["Vue.js","IA","PDF","UX/UI"],                            order: 6  },
  { id: 5,  slug: 'bunker-libros',        title: "Bunker de libros",              image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1759547229/bunker-libros-leer_rkyldm.jpg",             category: ["interfaz"],           client: "Bunker",                tags: ["Catalog","Products","Search","Filter"],                 order: 14 },
  { id: 6,  slug: 'clinica-dental',       title: "Website Clínica Dental",        image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757362220/Clinica_odontologica_proyecto_web_oswal.png",category: ["website"],            client: "kliniken Schröder",     tags: ["Healthcare","Medical","Appointments","Services"],       order: 8  },
  { id: 7,  slug: 'bestyle-catalogo',     title: "Catálogo digital",              image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757371705/Bestyle_website_proyectos_Oswal.png",        category: ["interfaz","ecommerce"],client: "Bestyle",              tags: ["Catalog","Products","Search","Filter"],                 order: 10 },
  { id: 8,  slug: 'axa-landing',          title: "Landing page Intermediarios",   image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757359522/Landing_Pages_seguros.png",                  category: ["landing"],            client: "AXA Colpatria",         tags: ["Insurance","Corporate","Lead Gen","Forms"],             order: 9  },
  { id: 9,  slug: 'betterme-clinica',     title: "Clínica Cirugías Betterme",     image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757375618/Clinica_Betterme_proyecto_web_oswal.png",    category: ["website"],            client: "Betterme",              tags: ["Dashboard","Analytics","Data Viz","Admin"],             order: 15 },
  { id: 10, slug: 'dedicandote',          title: "Dedicador canciones",           image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757372516/Dedicandote_proyecto_oswal_music.png",       category: ["landing"],            client: "Dedicandote",           tags: ["Startup","Business","CTA","Modern"],                    order: 11 },
  { id: 11, slug: 'cafe-cumbre',          title: "Website venta café",            image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757373361/Website_cafe_proyecto_oswal_col.png",        category: ["website","ecommerce"], client: "Café cumbre",          tags: ["Coffee","Retail","Online Store","Products"],            order: 16 },
  { id: 12, slug: 'celebrarte',           title: "Invitaciones Digitales",        image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1787963819/celebrarte_portada_oebkzg.jpg",              category: ["website","interfaz"], client: "Celebrarte",            tags: ["Vue.js","RSVP","Animaciones","UX/UI"],                  order: 7  },
  { id: 13, slug: 'cafe-de-los-loros',   title: "Café de los Loros",             image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1787965588/cafe_loros_portada_f9jw6q.png",             category: ["website"],            client: "Café de los Loros",     tags: ["WordPress","Elementor","Reservas","UX/UI"],             order: 13 },
  { id: 14, slug: 'fluent-future',        title: "Fluent Future",                 image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1787967089/fluent_portada_dbwpil.jpg",                  category: ["website","interfaz"], client: "Fluent Future",         tags: ["Nuxt 3","Storyblok","GSAP","Reservas"],                 order: 5  },
  { id: 15, slug: 'polla-breve',          title: "Polla Breve",                   image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1787967744/Polla_breve_portada_djhdqo.jpg",             category: ["interfaz"],           client: "Polla Breve",           tags: ["Mundial 2026","Tiempo real","Ranking","Auth"],          order: 2  },
  { id: 16, slug: 'swea',                 title: "Limpieza de Tejados Estocolmo", image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1787969124/swf.suecia_portada_zshtsg.jpg",              category: ["website","landing"],  client: "Swea Fastighetsservice",tags: ["Astro","Vue.js","Dashboard","Suecia"],                  order: 12 },
  { id: 17, slug: 'femme-naturelle',      title: "Femme Naturelle",               image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1788217127/femme_portada_itshtk.jpg",                   category: ["landing"],            client: "Femme Naturelle",       tags: ["HTML","CSS","JS","Agendamiento"],                       order: 17 },
  { id: 18, slug: 'reservas-spa',         title: "Reservas SPA",                  image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1788220782/book-spa-pc_wvn6pr.jpg",                    category: ["website","interfaz"], client: "spa-studio.online",     tags: ["Vue 3","Vite","Dashboard","Google Calendar"],           order: 18 },
]

const filteredProjects = computed(() => {
  const activeCategories = activeFilters.value
    .filter(filter => filter.active)
    .map(filter => filter.id)
  
  if (activeCategories.length === 0) {
    return []
  }
  
  // Filtrar y luego ordenar por la propiedad 'order'
  return projects
    .filter(project => {
      // Si category es un array, verificar si alguna categoría del proyecto está activa
      if (Array.isArray(project.category)) {
        return project.category.some(cat => activeCategories.includes(cat))
      }
      // Si category es un string (compatibilidad hacia atrás)
      return activeCategories.includes(project.category as string)
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0))
})


const handleWheel = (e: WheelEvent) => {
  // Only handle horizontal scroll on desktop (width > 768px)
  if (window.innerWidth > 768) {
    e.preventDefault()
    const scrollAmount = e.deltaY * 2
    setTransform(currentTranslate.value - scrollAmount)
  }
  // On mobile, let the default vertical scroll behavior work
}

const setTransform = (translate: number) => {
  currentTranslate.value = Math.max(Math.min(translate, 0), -maxScroll.value)
  if (Math.abs(currentTranslate.value) > 40) scrolled.value = true
  updateProgressBar()
}

const updateProgressBar = () => {
  if (maxScroll.value > 0) {
    progressWidth.value = Math.abs(currentTranslate.value) / maxScroll.value * 100
  }
}

const navigateToProject = (slug: string) => {
  router.push({ name: 'project-detail', params: { slug } })
}

const listGridRef = ref<HTMLElement | null>(null)

const animateListCards = async () => {
  await nextTick()
  const cards = listGridRef.value?.querySelectorAll('.list-card')
  if (!cards?.length) return
  gsap.fromTo(cards,
    { y: 30, opacity: 0, scale: 0.96 },
    { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.055, ease: 'power3.out', clearProps: 'transform,opacity' }
  )
}

watchVue(viewMode, (newMode) => {
  if (newMode === 'list') animateListCards()
})

watchVue(filteredProjects, () => {
  if (viewMode.value === 'list') animateListCards()
})

const onCardMouseMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
  const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10
  gsap.to(card, {
    rotateY: x, rotateX: y,
    y: -7,
    boxShadow: '0 18px 42px rgba(72,49,212,0.17)',
    duration: 0.38, ease: 'power2.out',
    transformPerspective: 900, overwrite: 'auto'
  })
}

const onCardMouseLeave = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  gsap.to(card, {
    rotateY: 0, rotateX: 0,
    y: 0,
    boxShadow: '0 2px 18px rgba(72,49,212,0.07)',
    duration: 0.55, ease: 'power3.out', overwrite: 'auto'
  })
}

onMounted(() => {
  const container = document.getElementById('galleryContainer')
  const track = document.getElementById('galleryTrack')
  
  if (container && track) {
    maxScroll.value = track.offsetWidth - container.offsetWidth
    updateProgressBar()
  }
  
  window.addEventListener('resize', () => {
    if (container && track) {
      maxScroll.value = track.offsetWidth - container.offsetWidth
      if (currentTranslate.value < -maxScroll.value) {
        setTransform(-maxScroll.value)
      }
    }
  })
  
  // Watch for filter changes
  watch(activeFilters, () => {
    // Recalculate maxScroll when filters change
    setTimeout(() => {
      if (container && track) {
        maxScroll.value = track.offsetWidth - container.offsetWidth
        currentTranslate.value = 0
        updateProgressBar()
      }
    }, 100)
  }, { deep: true })
})
</script>

<style scoped>
.scene {
  width: 100%;
  height: 100vh;
  position: relative;
  perspective: 800px;
  overflow: hidden;
  background: #F4F9FC;
}

/* Header Section */
.header-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 0.85rem 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.7rem;
}

/* ── Filter ─────────────────────────────────────── */
.filter-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  flex-wrap: wrap;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 0.45rem 0.55rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.09);
}

.f-check {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  padding: 0.28rem 0.6rem 0.28rem 0.38rem;
  border-radius: 7px;
  font-size: 0.78rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: background 0.14s, color 0.14s;
  border: 1.5px solid transparent;
  user-select: none;
  white-space: nowrap;
}
.f-check:hover { background: rgba(72,49,212,0.06); color: #4831D4; }
.f-check.on {
  color: #4831D4;
  font-weight: 600;
  border-color: rgba(72,49,212,0.18);
  background: rgba(72,49,212,0.05);
}

.f-box {
  width: 15px;
  height: 15px;
  border-radius: 3.5px;
  border: 1.5px solid #cbd5e1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: white;
  transition: background 0.14s, border-color 0.14s;
}
.f-check.on .f-box { background: #4831D4; border-color: #4831D4; }
.f-box svg { width: 10px; height: 8px; }

.f-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  padding: 0 4px;
  height: 16px;
  border-radius: 9px;
  font-size: 0.66rem;
  font-weight: 700;
  background: rgba(72,49,212,0.1);
  color: #4831D4;
  transition: background 0.14s, color 0.14s;
}
.f-check.on .f-count { background: #4831D4; color: white; }

.f-divider {
  width: 1px;
  height: 18px;
  background: #e2e8f0;
  margin: 0 0.1rem;
  flex-shrink: 0;
}

/* Applied filters */
.applied-filters {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}
.applied-label {
  font-size: 0.7rem;
  color: #94a3b8;
  font-weight: 500;
}
.applied-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.18rem 0.5rem;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #4831D4;
  background: rgba(72,49,212,0.08);
  border: 1px solid rgba(72,49,212,0.2);
  cursor: pointer;
  transition: background 0.14s;
}
.applied-tag:hover { background: rgba(72,49,212,0.14); }
.applied-clear {
  font-size: 0.7rem;
  color: #94a3b8;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.18rem 0.35rem;
  text-decoration: underline;
  transition: color 0.14s;
}
.applied-clear:hover { color: #4831D4; }

/* Mobile scroll hint (hidden on desktop) */
.mobile-scroll-hint {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(26,26,46,0.38);
  padding: 0.3rem 0.8rem;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.hint-arrow-m {
  width: 16px;
  height: 16px;
  animation: hintBob 1.8s ease-in-out infinite;
}
@keyframes hintBob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(4px); }
}

/* View toggle */
.view-toggle {
  display: flex;
  gap: 0.2rem;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(10px);
  border-radius: 9px;
  padding: 0.3rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  flex-shrink: 0;
}
.view-toggle button {
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  border-radius: 6px;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.14s, color 0.14s;
}
.view-toggle button svg { width: 15px; height: 15px; }
.view-toggle button.active { background: #4831D4; color: white; }
.view-toggle button:hover:not(.active) { background: rgba(72,49,212,0.08); color: #4831D4; }

/* ── List view — 2 columnas waoo ────────────────── */
.list-view {
  position: absolute;
  inset: 58px 0 0 0;
  background: #F6F4FF;
  overflow-y: auto;
  z-index: 5;
  padding: 1.1rem 1.5rem 5rem;
}
.list-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 1100px;
  margin: 0 auto;
}

/* Card base */
.list-card {
  background: white;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 22px rgba(72,49,212,0.07);
  transform-style: preserve-3d;
  will-change: transform;
  transition: border-color 0.35s;
}


/* Stagger CSS entrance (GSAP overrides these on mount) */
@keyframes cardFadeIn {
  from { opacity: 0; transform: translateY(28px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
.list-card:nth-child(1)    { animation: cardFadeIn 0.45s ease 0.00s both; }
.list-card:nth-child(2)    { animation: cardFadeIn 0.45s ease 0.07s both; }
.list-card:nth-child(3)    { animation: cardFadeIn 0.45s ease 0.14s both; }
.list-card:nth-child(4)    { animation: cardFadeIn 0.45s ease 0.21s both; }
.list-card:nth-child(5)    { animation: cardFadeIn 0.45s ease 0.28s both; }
.list-card:nth-child(6)    { animation: cardFadeIn 0.45s ease 0.35s both; }
.list-card:nth-child(n+7)  { animation: cardFadeIn 0.45s ease 0.40s both; }

/* Image section */
.list-img-wrap {
  aspect-ratio: 16/9;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}
.list-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.list-card:hover .list-img-wrap img { transform: scale(1.055); }

.list-img-overlay {
  position: absolute; inset: 0;
  opacity: 0;
  transition: opacity 0.45s;
}
.card-cat--website   .list-img-overlay { background: rgba(72,49,212,0.09); }
.card-cat--landing   .list-img-overlay { background: rgba(82,196,26,0.09); }
.card-cat--interfaz  .list-img-overlay { background: rgba(253,135,110,0.09); }
.card-cat--ecommerce .list-img-overlay { background: rgba(245,166,35,0.09); }
.list-card:hover .list-img-overlay { opacity: 1; }

/* Info panel */
.list-info {
  padding: 1.15rem 1.25rem 1.05rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
  position: relative;
  overflow: hidden;
}

/* Giant decorative number */
.list-deco-num {
  position: absolute;
  top: -0.35rem;
  right: 0.7rem;
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: #ece9ff;
  pointer-events: none;
  transition: color 0.35s, transform 0.35s;
  transform: translateY(0);
}
.list-card:hover .list-deco-num { transform: translateY(-4px); }
.card-cat--website:hover   .list-deco-num { color: rgba(72,49,212,0.10); }
.card-cat--landing:hover   .list-deco-num { color: rgba(82,196,26,0.12); }
.card-cat--interfaz:hover  .list-deco-num { color: rgba(253,135,110,0.12); }
.card-cat--ecommerce:hover .list-deco-num { color: rgba(245,166,35,0.12); }

/* Category row */
.list-info-top {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.list-cat-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: transform 0.38s cubic-bezier(0.34,1.56,0.64,1);
}
.list-card:hover .list-cat-dot { transform: scale(1.55); }
.card-cat--website   .list-cat-dot { background: #4831D4; }
.card-cat--landing   .list-cat-dot { background: #52c41a; }
.card-cat--interfaz  .list-cat-dot { background: #fd876e; }
.card-cat--ecommerce .list-cat-dot { background: #f5a623; }

.list-cat-label {
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
}

/* Title */
.list-title {
  font-size: 1.08rem;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0.08rem 0 0;
  line-height: 1.25;
  transition: color 0.25s;
}
.list-card:hover .list-title { color: #4831D4; }

/* Client */
.list-client {
  font-size: 0.77rem;
  color: #94a3b8;
  margin: 0;
}

/* Tags — hidden until hover */
.list-tags {
  display: flex;
  gap: 0.28rem;
  flex-wrap: wrap;
  margin-top: 0.22rem;
  opacity: 0;
  transform: translateY(5px);
  transition: opacity 0.3s ease 0.07s, transform 0.3s ease 0.07s;
}
.list-card:hover .list-tags { opacity: 1; transform: translateY(0); }
.list-tag {
  font-size: 0.59rem;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 0.15rem 0.44rem;
  border-radius: 100px;
}

/* Footer CTA */
.list-footer {
  margin-top: 0.35rem;
}
.list-cta-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  font-size: 0.74rem;
  font-weight: 700;
  color: #4831D4;
  background: rgba(72,49,212,0.07);
  border: 1.5px solid rgba(72,49,212,0.16);
  padding: 0.36rem 0.88rem;
  border-radius: 100px;
  opacity: 0;
  transform: translateY(7px);
  transition:
    opacity 0.3s ease 0.1s,
    transform 0.38s cubic-bezier(0.34,1.56,0.64,1) 0.1s,
    background 0.2s;
}
.list-card:hover .list-cta-pill { opacity: 1; transform: translateY(0); }
.list-cta-pill:hover { background: rgba(72,49,212,0.13); }




.floor {
  position: absolute;
  width: 150%;
  height: 100%;
  left: -25%;
  bottom: -30%;
  transform: rotateX(60deg);
  background: linear-gradient(90deg, 
    rgba(142, 170, 180, 0.8) 0%, 
    rgba(172, 196, 204, 0.8) 25%, 
    rgba(142, 170, 180, 0.8) 50%, 
    rgba(172, 196, 204, 0.8) 75%, 
    rgba(142, 170, 180, 0.8) 100%);
  z-index: 1;
}

.lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(100, 130, 140, 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(100, 130, 140, 0.3) 1px, transparent 1px);
  background-size: 10% 10%;
}

.diagonal-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(135deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(225deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(315deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%),
    linear-gradient(45deg, rgba(80, 110, 120, 0.4) 25%, transparent 25%);
  background-size: 20% 20%;
  opacity: 0.5;
}

.perspective-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.perspective-line {
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(100, 130, 140, 0.1) 0%, 
    rgba(100, 130, 140, 0.8) 100%);
  transform-origin: bottom;
}

.perspective-line:nth-child(odd) {
  transform: perspective(800px) rotateX(60deg) scaleY(1.2);
}

.perspective-line:nth-child(even) {
  transform: perspective(800px) rotateX(60deg) scaleY(1.1);
}

.horizontal-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.horizontal-line {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, 
    rgba(100, 130, 140, 0.1) 0%, 
    rgba(100, 130, 140, 0.8) 50%,
    rgba(100, 130, 140, 0.1) 100%);
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(142, 170, 180, 0) 0%, 
    rgba(142, 170, 180, 0.3) 100%);
}

.wall {
  position: absolute;
  width: 100%;
  height: 80%;
  top: 0;
  background-color: #ece9e2;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 2;
}

/* Baseboard at the bottom of the wall */
.wall::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 18px;
  background: linear-gradient(to bottom, #c8c0b0, #b8b0a0);
  box-shadow: 0 -2px 6px rgba(0,0,0,0.12);
  z-index: 5;
}

.brick-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 40px 20px;
  opacity: 0.8;
}

.brick-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 30px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 10px);
  background-size: 80px 40px;
  opacity: 0.7;
}

.gallery-section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0 2rem;
}



.gallery-container {
  position: relative;
  width: 95%;
  height: 70%;
  overflow: hidden;
  margin-bottom: 20px;
}

.gallery-track {
  display: flex;
  position: absolute;
  left: 0;
  height: 100%;
  padding: 0 2rem;
  gap: 3rem;
  transition: transform 0.3s ease;
}

.artwork-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
}

.lamp {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  transition: all 0.3s ease;
}

.lamp-wire {
  width: 2px;
  height: 60px;
  background-color: #333;
}

.lamp-shade {
  width: 35px;
  height: 22px;
  background-color: #2c3e50;
  border-radius: 50% 50% 0 0;
  position: relative;
}

.lamp-shade::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 35px;
  height: 4px;
  background-color: #1a2530;
  border-radius: 0 0 4px 4px;
}

.lamp-light {
  position: absolute;
  bottom: -60px;
  width: 160px;
  height: 120px;
  background: radial-gradient(ellipse at center, rgba(255, 255, 200, 0.6) 0%, rgba(255, 255, 200, 0) 70%);
  border-radius: 50%;
  transform: translateX(-50%);
  left: 50%;
  pointer-events: none;
  opacity: 0.8;
  filter: blur(5px);
}

.lamp-hover .lamp-light {
  opacity: 1;
  background: radial-gradient(ellipse at center, 
    rgba(255, 255, 200, 0.9) 0%, 
    rgba(255, 255, 200, 0.6) 30%,
    rgba(255, 255, 200, 0) 70%);
  filter: blur(3px);
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  from {
    filter: blur(3px);
    opacity: 0.8;
  }
  to {
    filter: blur(5px);
    opacity: 1;
  }
}

.artwork-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.artwork {
  width: 220px;
  height: 270px;
  background-color: white;
  border: 8px solid #2c2c2c;
  border-radius: 2px;
  box-shadow:
    0 10px 24px rgba(0,0,0,0.25),
    inset 0 0 0 3px #1a1a1a,
    inset 0 0 0 5px #b8a070;
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  cursor: pointer;
  position: relative;
}

.artwork:hover {
  transform: translateY(-10px) scale(1.015);
  box-shadow:
    0 18px 36px rgba(0,0,0,0.32),
    inset 0 0 0 3px #1a1a1a,
    inset 0 0 0 5px #b8a070;
}

.plaque {
  width: 100%;
  height: 48px;
  background: linear-gradient(90deg, #edeaff 0%, #fff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.2rem;
  border-bottom: 2.5px solid #4831D4;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 2px 8px rgba(72,49,212,0.07);
  position: relative;
  z-index: 2;
}

.plaque span {
  color: #4831D4;
  font-weight: 800;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
  text-shadow: 0 1px 0 #fff, 0 2px 6px rgba(72,49,212,0.08);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.1em 0.5em;
  border-radius: 6px;
  background: rgba(255,255,255,0.7);
  box-shadow: 0 1px 2px rgba(72,49,212,0.03);
}

.artwork-content {
  position: relative;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.artwork:hover .project-image {
  transform: scale(1.05);
}

/* Cliente overlay */
.client-overlay {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 16px);
  background: rgba(72,49,212,0.08);
  color: #4831D4;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  padding: 0.5em 0;
  border-radius: 0 0 12px 12px;
  z-index: 3;
  box-shadow: 0 2px 8px rgba(72,49,212,0.07);
  pointer-events: none;
}

.client-name {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.92);
  text-align: center;
  font-weight: 600;
  color: #4831D4;
  padding: 7px 0 5px 0;
  font-size: 1rem;
}

/* Progress Indicator */
.progress-indicator {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: #4831D4;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.artwork:hover + .progress-indicator,
.artwork-unit:hover .progress-indicator {
  opacity: 1;
}

.progress-container {
  position: relative;
  width: 70%;
  height: 4px;
  background-color: rgba(44, 62, 80, 0.2);
  border-radius: 2px;
  margin-top: 20px;
}

.progress-bar {
  position: absolute;
  height: 100%;
  background-color: #4831D4;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.floor-buttons {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(to right, #2A2356, #1F1A40);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.2),
    inset 0 2px 10px rgba(255, 255, 255, 0.05);
  z-index: 50;
}

.button-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.floor-button {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #4831D4, #6A5AE0);
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.2),
    inset 0 2px 5px rgba(255, 255, 255, 0.1);
}

.button-light {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.button-light.is-active {
  background: #CCF381;
  box-shadow: 0 0 10px #CCF381;
}

.floor-button:hover {
  transform: scale(1.1);
}

.floor-button.active {
  background: white;
  color: #4831D4;
  box-shadow: 
    0 0 0 3px #4831D4,
    0 4px 15px rgba(0, 0, 0, 0.2);
}

.floor-number {
  font-size: 1.2rem;
  font-weight: bold;
}

.floor-name {
  font-size: 0.7rem;
  opacity: 0.8;
}



@media (max-width: 768px) {
  .list-view { padding: 0.75rem 0.75rem 6rem; }
  .list-grid { grid-template-columns: 1fr; gap: 0.75rem; }
  .list-deco-num { font-size: 3.8rem; }
  .list-title { font-size: 0.96rem; }
  .list-tags, .list-cta-pill { display: none; }

  .floor-buttons {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    right: auto;
    top: auto;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 2rem;
  }

  .button-panel {
    flex-direction: row;
    gap: 0.8rem;
  }

  .floor-button {
    width: 3.5rem;
    height: 3.5rem;
  }

  .floor-number {
    font-size: 1rem;
  }

  .floor-name {
    font-size: 0.6rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .header-section {
    padding: 1rem 1rem;
  }

  .filter-section {
    display: none;
  }

  .artwork {
    width: 240px;
    height: 260px;
  }

  .gallery-container {
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 60vh;
  }

  .gallery-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: static;
    gap: 3rem;
    padding: 2rem 1rem;
    transform: none !important;
  }

  .artwork-unit {
    margin: 0;
    width: 100%;
    max-width: 320px;
    height: auto;
  }

  .gallery-section {
    padding: 2rem 0 2rem;
  }

  /* Hide progress bar on mobile since we use vertical scroll */
  .progress-container {
    display: none;
  }

  /* Ajustar tamaños de texto para móvil */
  .plaque {
    height: 44px;
    padding: 0 0.8rem;
  }

  .plaque span {
    font-size: 0.95rem;
    font-weight: 700;
  }

  .client-name {
    font-size: 0.85rem !important;
    padding: 6px 0 4px 0 !important;
  }

  /* Style the scrollbar */
  .gallery-container::-webkit-scrollbar {
    width: 4px;
  }

  .gallery-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  .gallery-container::-webkit-scrollbar-thumb {
    background: #4831D4;
    border-radius: 2px;
  }

  /* Hide lamps on mobile — they create excessive empty space */
  .lamp { display: none; }

  /* Show mobile scroll hint */
  .mobile-scroll-hint { display: flex; }

  .gallery-container::-webkit-scrollbar-thumb:hover {
    background: #6a5ae0;
  }
}

/* ── Scroll hint slot (first gallery slot) ─────── */
.scroll-hint-slot {
  flex-shrink: 0;
  width: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  pointer-events: none;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.scroll-hint-slot.hint-gone {
  opacity: 0;
  transform: translateX(-16px);
}

.hint-text {
  font-family: 'Georgia', serif;
  font-style: italic;
  font-size: 0.82rem;
  font-weight: 600;
  color: #4831D4;
  line-height: 1.45;
  margin: 0;
  opacity: 0.85;
  animation: hintPulse 2.8s ease-in-out infinite;
}

@keyframes hintPulse {
  0%, 100% { opacity: 0.85; }
  50%       { opacity: 0.55; }
}

.hint-arrow {
  width: 90px;
  height: auto;
  animation: hintSlide 1.8s ease-in-out infinite;
}

@keyframes hintSlide {
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(6px); }
}

/* ── View overlay (hover on artwork) ───────────── */
.view-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top,
    rgba(72, 49, 212, 0.92) 0%,
    rgba(72, 49, 212, 0.5) 50%,
    transparent 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.artwork:hover .view-overlay,
.view-overlay.overlay-initial {
  opacity: 1;
}

.view-label {
  background: white;
  color: #4831D4;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.45rem 1rem;
  border-radius: 20px;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
  transition: transform 0.2s ease;
  white-space: nowrap;
}

.view-overlay:hover .view-label {
  transform: scale(1.05);
}

/* ── Gallery info card below frame ─────────────── */
.gallery-card {
  margin-top: 0.75rem;
  width: 220px;
  background: white;
  border-radius: 6px;
  padding: 0.6rem 0.9rem;
  box-shadow: 0 3px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  position: relative;
}

.card-dot {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: #4831D4;
  border-radius: 50%;
  box-shadow: 0 0 0 2px white, 0 0 0 4px rgba(72,49,212,0.2);
}

.card-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-client {
  font-size: 0.72rem;
  color: #4831D4;
  font-weight: 500;
  margin: 0;
}

/* ── Artwork enhancements ───────────────────────── */
.artwork {
  position: relative;
}

.artwork-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.project-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 480px) {
  .floor-buttons {
    bottom: 1rem;
    padding: 0.8rem 1.5rem;
  }

  .floor-button {
    width: 3rem;
    height: 3rem;
  }

  .floor-number {
    font-size: 0.9rem;
  }

  .floor-name {
    font-size: 0.55rem;
  }

  .artwork {
    width: 220px;
    height: 240px;
  }

  .gallery-container {
    max-height: 55vh;
  }

  .gallery-track {
    gap: 2.5rem;
    padding: 1.5rem 0.5rem;
  }

  .artwork-unit {
    max-width: 280px;
  }

  /* Ajustar textos para pantallas muy pequeñas */
  .plaque {
    height: 40px;
    padding: 0 0.6rem;
  }

  .plaque span {
    font-size: 0.85rem;
    font-weight: 700;
  }

  .client-name {
    font-size: 0.75rem !important;
    padding: 5px 0 3px 0 !important;
  }

  .header-section {
    padding: 1rem 1rem;
  }

  .main-title {
    font-size: 1.8rem;
  }
}
</style>