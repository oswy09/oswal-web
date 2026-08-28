<template>
  <div ref="containerRef" class="services-container">

    <!-- Background grid lines -->
    <div class="bg-lines" aria-hidden="true">
      <span v-for="i in 6" :key="i" class="bg-line"></span>
    </div>

    <!-- Scroll progress -->
    <div class="progress-bar" ref="progressRef"></div>

    <!-- ── Header ────────────────────────────────── -->
    <section class="header-section">
      <p class="eyebrow" ref="eyebrowRef">— Piso 01 · Servicios</p>
      <h1 class="page-title">
        <span class="t-line" ref="line1">¿Qué hago</span>
        <span class="t-line accent" ref="line2">por ti?</span>
      </h1>
      <p class="page-sub" ref="subRef">
        Diseño ecosistemas digitales que conectan website, marketing,<br>
        automatización e IA para ayudar a las marcas a atraer clientes,
        convertir más y mejorar su experiencia.
      </p>
      <div class="scroll-cue" ref="scrollCueRef" @click="scrollToServices" role="button" tabindex="0">
        <span>Desplázate</span>
        <svg class="cue-arrow" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

    </section>

    <!-- ── Services ──────────────────────────────── -->
    <section class="services-list">
      <article
        v-for="(svc, i) in services"
        :key="svc.id"
        :ref="el => { if (el) svcRefs[i] = el }"
        class="svc-row"
        :style="{ '--svc-tint': tints[i] }"
      >
        <div class="elevator-door door-l"></div>
        <div class="elevator-door door-r"></div>
        <div class="svc-num">
          <span class="floor-arrow">▲</span>
          <span class="floor-digits">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="floor-label">FL</span>
        </div>

        <div class="svc-content">
          <div class="svc-rule" :style="{ background: accents[i] }"></div>

          <div class="svc-main">
            <div class="svc-text">
              <h2 class="svc-title">{{ svc.title }}</h2>
              <p v-if="svc.tagline" class="svc-tagline">{{ svc.tagline }}</p>
              <p class="svc-desc">{{ svc.description }}</p>
              <ul class="svc-checklist">
                <li v-for="tag in svc.tags" :key="tag" class="svc-check-item">
                  <svg class="check-icon" viewBox="0 0 20 20" fill="none" :style="{ color: accents[i] }">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M6 10l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{{ tag }}</span>
                </li>
              </ul>
              <div v-if="svc.convertsTo" class="svc-convert">
                <p class="svc-convert-title">Puede convertirse en:</p>
                <p class="svc-convert-text">{{ svc.convertsTo }}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- ── CTA ───────────────────────────────────── -->
    <section class="cta-section" ref="ctaRef">
      <div class="cta-img-wrap">
        <img src="https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757340906/oswal_front_services.png" alt="Comenzar proyecto" class="cta-img" loading="lazy"/>
      </div>
      <h2 class="cta-title">¿Listo para comenzar tu proyecto?</h2>
      <p class="cta-sub">Conversemos sobre cómo puedo ayudarte a alcanzar tus objetivos digitales</p>
      <div class="button-wrapper">
        <button class="portfolio-button" @click="goToWhatsapp">
          <span>Contactarme</span>
          <div class="arrow-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </button>
      </div>
    </section>

    <!-- ── Floor Buttons ─────────────────────────── -->
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

    <!-- Close -->
    <router-link to="/" class="close-button" aria-label="Volver al inicio">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </router-link>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const router       = useRouter()
const containerRef = ref(null)
const progressRef  = ref(null)
const eyebrowRef   = ref(null)
const line1        = ref(null)
const line2        = ref(null)
const subRef       = ref(null)
const headerTagsRef = ref(null)
const scrollCueRef = ref(null)
const ctaRef       = ref(null)
const svcRefs      = ref([])
const currentFloor = ref(1)

const accents = ['#4831D4', '#059669', '#0284c7', '#d97706']
const tints   = ['rgba(72,49,212,0.05)', 'rgba(5,150,105,0.05)', 'rgba(2,132,199,0.05)', 'rgba(217,119,6,0.05)']
const headerTags = [
  'Sitios Web de Alto Rendimiento',
  'Landing Pages de Conversión',
  'Interfaces UX/UI',
  'E-commerce & Reservas',
  'Plataformas a Medida',
  'Automatizaciones & Asistentes IA'
]
const headerTagsMarquee = [...headerTags, ...headerTags]

const sections = [
  { floor: 1, name: 'Servicios', route: '/services' },
  { floor: 2, name: 'Proyectos', route: '/projects' },
  { floor: 3, name: 'Contacto',  route: '/contact'  },
  { floor: 4, name: 'Sobre mí',  route: '/about'    }
]

const services = [
  {
    id: 1,
    title: 'Manos a la Web',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757340906/oswal_front_services.png',
    tagline: 'Del prototipo a la realidad.',
    description: 'Aquí la estrategia se vuelve visual y el diseño cobra vida. Estructuro el recorrido digital exacto que conecta tu propuesta de valor con las decisiones de tus clientes, creando interfaces funcionales.',
    tags: [
      'Websites estratégicos',
      'Landing pages orientadas a conversión',
      'UX/UI y diseño de interfaces',
      'Tiendas virtuales y páginas de productos',
      'Sistemas de reservas y agendamiento',
      'Optimización de recorridos y puntos de conversión'
    ]
  },
  {
    id: 2,
    title: 'Negocio en Automático',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757342033/oswal_marketing_services.png',
    tagline: 'Haz que el sistema trabaje por ti.',
    description: 'Menos tareas repetitivas en tu día a día, respuestas instantáneas para tus clientes. Integramos flujos inteligentes y asistentes digitales para que tu negocio siga atendiendo, cotizando y organizando información las 24 horas.',
    tags: [
      'Automatización de procesos',
      'Formularios y flujos inteligentes',
      'Respuestas automáticas por WhatsApp / email',
      'Confirmaciones y recordatorios',
      'Seguimiento de leads',
      'Integraciones entre herramientas',
      'Automatizaciones con IA',
      'Asistentes y soluciones basadas en IA'
    ]
  },
  {
    id: 3,
    title: 'Conexión y Experiencias',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757340906/Oswal_UX_services.png',
    tagline: 'Haz que la experiencia continúe: interactividad que fideliza.',
    description: 'La relación con tu cliente no termina en la primera compra o visita. Construimos micro-sitios interactivos, portales privados, guías dinámicas y herramientas a medida para que interactuar con tu marca sea una experiencia fluida, útil y memorable de principio a fin.',
    tags: [
      'Portales y áreas privadas',
      'Intranets corporativas',
      'Interfaces y herramientas digitales',
      'Guías y experiencias interactivas',
      'Menús digitales',
      'Directorios, dashboards y sistemas internos',
      'Experiencias digitales para clientes',
      'Portafolios Interactivos'
    ]
  },
  {
    id: 4,
    title: 'Crecimiento',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757342033/Oswal_webdesign_services.png',
    tagline: 'Tu ecosistema ya está activo: ahora toca atraer, convertir y escalar.',
    description: 'La web y las experiencias digitales ya están vivas; ahora toca atraer, convertir y escalar.',
    tags: [
      'Embudos y campañas digitales',
      'Estrategias de captación y anuncios',
      'Landing pages para campañas, productos y servicios',
      'SEO y posicionamiento',
      'Estrategia de marca',
      'Captación de leads y conversión',
      'Email Marketing',
      'Analítica web, mapas de calor y monitoreo'
    ]
  }
]

const goToFloor    = s  => router.push(s.route)
const goToWhatsapp = () => window.open('https://wa.me/573057502790', '_blank')
const scrollToServices = () => {
  if (containerRef.value) {
    containerRef.value.scrollTo({ top: containerRef.value.clientHeight, behavior: 'smooth' })
  }
}

let gsapCtx

onMounted(() => {
  const scroller = containerRef.value
  if (!scroller) return

  gsapCtx = gsap.context(() => {

    /* ── Header entrance ── */
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from(eyebrowRef.value,   { y: 20, opacity: 0, duration: 0.5 })
      .from(line1.value,        { y: 90, opacity: 0, duration: 0.9 }, '-=0.2')
      .from(line2.value,        { y: 90, opacity: 0, duration: 0.9 }, '-=0.65')
      .from(subRef.value,       { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
      .from(scrollCueRef.value, { y: 15, opacity: 0, duration: 0.5 }, '-=0.3')

    /* ── Progress bar ── */
    gsap.set(progressRef.value, { scaleX: 0, transformOrigin: 'left center' })
    gsap.to(progressRef.value, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: scroller,
        scroller,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    })

    /* ── Service rows – elevator door reveal ── */
    svcRefs.value.forEach((el, i) => {
      if (!el) return
      const doorL  = el.querySelector('.door-l')
      const doorR  = el.querySelector('.door-r')
      const reveal = { trigger: el, scroller, start: 'top 78%', toggleActions: 'play none none none' }
      const after  = 0.55

      gsap.set([doorL, doorR], { x: '0%' })
      gsap.to(doorL, { x: '-101%', duration: 0.9, ease: 'power3.inOut', scrollTrigger: reveal })
      gsap.to(doorR, { x:  '101%', duration: 0.9, ease: 'power3.inOut', scrollTrigger: reveal })

      gsap.from(el.querySelector('.svc-num'),      { scale: 0.75, opacity: 0, duration: 0.5,  delay: after,        ease: 'back.out(1.5)', scrollTrigger: reveal })
      gsap.from(el.querySelector('.svc-rule'),     { scaleX: 0, transformOrigin: 'left center', duration: 0.55, delay: after + 0.06, ease: 'power2.out', scrollTrigger: reveal })
      gsap.from(el.querySelector('.svc-title'),    { y: 22, opacity: 0, duration: 0.45, delay: after + 0.10, ease: 'power2.out', scrollTrigger: reveal })
      gsap.from(el.querySelector('.svc-tagline'),  { y: 16, opacity: 0, duration: 0.4,  delay: after + 0.15, ease: 'power2.out', scrollTrigger: reveal })
      gsap.from(el.querySelector('.svc-desc'),     { y: 12, opacity: 0, duration: 0.4,  delay: after + 0.18, ease: 'power2.out', scrollTrigger: reveal })
      gsap.from(el.querySelectorAll('.svc-check-item'), { x: -10, opacity: 0, stagger: 0.05, duration: 0.35, delay: after + 0.22, ease: 'power2.out', scrollTrigger: reveal })
    })

    /* ── CTA ── */
    gsap.from(ctaRef.value, {
      y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: ctaRef.value, scroller, start: 'top 88%', toggleActions: 'play none none none' }
    })

  }, containerRef.value)
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>

<style scoped>
/* ── Base ───────────────────────────────────────── */
.services-container {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #F5F5F5;
  color: #1a1a2e;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  scroll-behavior: smooth;
  transition: background-color 0.5s ease;
}

/* ── Progress bar ──────────────────────────────── */
.progress-bar {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 3px;
  background: #4831D4;
  z-index: 200;
}

/* ── Bg lines ──────────────────────────────────── */
.bg-lines {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
  z-index: 0;
}
.bg-line {
  display: block;
  width: 1px;
  height: 100%;
  background: rgba(72, 49, 212, 0.07);
}

/* ── Header ─────────────────────────────────────── */
.header-section {
  min-height: 78vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 5rem 3rem;
  position: relative;
  z-index: 2;
}

.eyebrow {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #4831D4;
  margin: 0 0 2rem;
  text-align: center;
}

.page-title {
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 0.92;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
  color: #1a1a2e;
  text-align: center;
  align-self: center;
}

.t-line        { display: block; }
.t-line.accent { color: #4831D4; }

.page-sub {
  font-size: 1.5rem;
  line-height: 1.6;
  color: #718096;
  max-width: 680px;
  margin: 0 auto 1.35rem;
  text-align: center;
}

.header-tags {
  display: flex;
  overflow: hidden;
  max-width: min(100%, 760px);
  width: 100%;
  min-height: 2.25rem;
  margin: 0 0 2.2rem;
  mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
}

.header-tags-run {
  display: flex;
  gap: 0.6rem;
  padding-right: 0.6rem;
  width: max-content;
  animation: headerMarquee 46s linear infinite;
}

.header-tags:hover .header-tags-run {
  animation-play-state: paused;
}

.header-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.38rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(72, 49, 212, 0.45);
  background: rgba(255, 255, 255, 0.72);
  color: #334155;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.2;
  white-space: nowrap;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.header-tag:hover {
  transform: translateY(-1px);
  background: rgba(72, 49, 212, 0.08);
}

@keyframes headerMarquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .header-tags-run {
    animation: none;
  }
}

.scroll-cue {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(26, 26, 46, 0.35);
  cursor: pointer;
  transition: color 0.2s;
}
.scroll-cue:hover { color: #4831D4; }

.cue-arrow {
  width: 18px; height: 18px;
  animation: cueDown 1.6s ease-in-out infinite;
}

@keyframes cueDown {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(5px); }
}


/* ── Services ───────────────────────────────────── */
.services-list {
  padding: 0 0 4rem;
  position: relative;
  z-index: 2;
}

.svc-row {
  padding: 5.25rem 5rem;
  border-top: 1px solid rgba(26, 26, 46, 0.08);
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 2.8rem;
  align-items: start;
  background: linear-gradient(120deg, var(--svc-tint, transparent) 0%, transparent 55%);
  position: relative;
  clip-path: inset(0);
}

.svc-row:nth-child(even) {
  background: rgba(255, 255, 255, 0.55);
}

.svc-num {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  background: #0b0919;
  border-radius: 8px;
  padding: 0.9rem 0.5rem 0.75rem;
  text-align: center;
  user-select: none;
  position: sticky;
  top: 3rem;
  align-self: start;
  border: 2px solid #2a2650;
  box-shadow:
    0 0 0 1px #111,
    0 0 28px rgba(204,243,129,0.08),
    inset 0 0 24px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.04);
}

.floor-arrow {
  font-size: 0.7rem;
  color: #CCF381;
  letter-spacing: 0.08em;
  animation: floorPulse 2.2s ease-in-out infinite;
  line-height: 1;
}

.floor-digits {
  font-size: 2.8rem;
  font-weight: 900;
  line-height: 1;
  color: #CCF381;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
  text-shadow: 0 0 10px rgba(204,243,129,0.6), 0 0 24px rgba(204,243,129,0.25);
}

.floor-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(204,243,129,0.45);
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  line-height: 1;
}

@keyframes floorPulse {
  0%, 100% { opacity: 0.35; transform: translateY(0); }
  50%       { opacity: 1;    transform: translateY(-2px); }
}

/* ── Elevator door panels ───────────────────────── */
.elevator-door {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  z-index: 8;
  pointer-events: none;
  /* Brushed metal texture: vertical panel ridges */
  background:
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 28px,
      rgba(255,255,255,0.025) 28px,
      rgba(255,255,255,0.025) 30px,
      transparent 30px,
      transparent 32px
    ),
    linear-gradient(160deg, #252244 0%, #1a1a2e 50%, #1f1b3a 100%);
}

.elevator-door::after {
  content: '';
  position: absolute;
  top: 15%;
  bottom: 15%;
  width: 3px;
  background: linear-gradient(to bottom,
    transparent,
    rgba(255,255,255,0.04) 20%,
    rgba(255,255,255,0.07) 50%,
    rgba(255,255,255,0.04) 80%,
    transparent
  );
  border-radius: 2px;
}

.door-l {
  left: 0;
  border-right: 2px solid rgba(204,243,129,0.22);
  box-shadow: inset -6px 0 16px rgba(0,0,0,0.4);
}
.door-l::after { right: 18px; }

.door-r {
  right: 0;
  border-left: 2px solid rgba(204,243,129,0.22);
  box-shadow: inset 6px 0 16px rgba(0,0,0,0.4);
}
.door-r::after { left: 18px; }

.svc-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.svc-rule {
  height: 2px;
  width: 100%;
  border-radius: 2px;
  opacity: 0.7;
}

.svc-main {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

/* ── Circular images ────────────────────────────── */
.svc-img-wrap {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background: white;
  border: 3px solid rgba(72, 49, 212, 0.12);
  box-shadow: 0 8px 24px rgba(72, 49, 212, 0.1);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.svc-img-wrap:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(72, 49, 212, 0.18);
}

.svc-img {
  width: 88%;
  height: 88%;
  object-fit: contain;
}

.svc-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.svc-title {
  font-size: clamp(1.7rem, 3.5vw, 2.5rem);
  font-weight: 800;
  margin: 0;
  color: #1a1a2e;
  line-height: 1.1;
}

.svc-desc {
  font-size: 1rem;
  line-height: 1.85;
  color: #4a5568;
  margin: 0;
  max-width: 760px;
}

.svc-tagline {
  margin: 0;
  font-size: 1.3rem;
  line-height: 1.35;
  color: #1a1a2e;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.svc-checklist {
  list-style: none;
  padding: 0;
  margin: 0.9rem 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem 1.5rem;
}

.svc-check-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: #374151;
  line-height: 1.45;
}

.check-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.svc-row:nth-child(even) .svc-main {
  flex-direction: row-reverse;
}

.svc-convert {
  border-left: 3px solid rgba(72, 49, 212, 0.24);
  margin-top: 0.35rem;
  padding: 1rem 1rem 1rem 1.1rem;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 0.55rem;
}

.svc-convert-title {
  margin: 0 0 0.3rem;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 800;
  color: #374151;
}

.svc-convert-text {
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.7;
  color: #4b5563;
  max-width: 760px;
}

/* ── CTA ────────────────────────────────────────── */
.cta-section {
  text-align: center;
  padding: 6rem 2rem;
  border-top: 1px solid rgba(26, 26, 46, 0.08);
  background: white;
  position: relative;
  z-index: 2;
}

.cta-img-wrap {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 2.5rem;
  background: #f5f5f5;
  border: 3px solid rgba(72,49,212,0.12);
  box-shadow: 0 8px 32px rgba(72,49,212,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-img {
  width: 88%;
  height: 88%;
  object-fit: contain;
}

.cta-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  margin: 0 0 1rem;
  color: #4831D4;
}

.cta-sub {
  font-size: 1.05rem;
  color: #718096;
  margin: 0 auto 2.5rem;
  max-width: 460px;
  line-height: 1.6;
}

.button-wrapper {
  display: inline-block;
}

.portfolio-button {
  background: #4831D4;
  color: #fff;
  border: 1px solid #4831D4;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  border-radius: 5px;
}

.portfolio-button span {
  padding: 1rem 1.5rem;
  display: block;
}

.portfolio-button .arrow-icon {
  background: #CCF381;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.portfolio-button .arrow-icon svg {
  width: 20px;
  height: 20px;
  color: #4831D4;
  transition: transform 0.3s ease;
}

.portfolio-button:hover { transform: translateY(-3px); }
.portfolio-button:hover .arrow-icon { background: #c0e872; }
.portfolio-button:hover .arrow-icon svg { transform: rotate(45deg); }

/* ── Floor Buttons ──────────────────────────────── */
.floor-buttons {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(to right, #2A2356, #1F1A40);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2), inset 0 2px 10px rgba(255,255,255,0.05);
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
  box-shadow: 0 4px 15px rgba(0,0,0,0.2), inset 0 2px 5px rgba(255,255,255,0.1);
}

.button-light {
  position: absolute;
  top: 5px; right: 5px;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: all 0.3s ease;
}

.button-light.is-active {
  background: #CCF381;
  box-shadow: 0 0 10px #CCF381;
}

.floor-button:hover { transform: scale(1.1); }

.floor-button.active {
  background: white;
  color: #4831D4;
  box-shadow: 0 0 0 3px #4831D4, 0 4px 15px rgba(0,0,0,0.2);
}

.floor-number { font-size: 1.2rem; font-weight: bold; }
.floor-name   { font-size: 0.7rem; opacity: 0.8; }

/* ── Close button ───────────────────────────────── */
.close-button {
  position: fixed;
  top: 2rem; right: 2rem;
  background: rgba(72, 49, 212, 0.1);
  border: none;
  width: 3rem; height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4831D4;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.close-button:hover {
  background: rgba(72, 49, 212, 0.2);
  transform: rotate(90deg);
}

/* ── Responsive ─────────────────────────────────── */
@media (max-width: 900px) {
  .header-section,
  .svc-row { padding-left: 2.5rem; padding-right: 2.5rem; }
}

@media (max-width: 768px) {
  .header-section { padding: 5rem 1.5rem 3rem; }

  .header-tags {
    margin: 0 0 1.9rem;
  }

  .header-tags-run { gap: 0.5rem; }

  .header-tags-run { animation-duration: 52s; }

  .header-tag {
    font-size: 0.74rem;
    padding: 0.34rem 0.75rem;
  }

  .svc-row {
    grid-template-columns: 70px 1fr;
    gap: 1.25rem;
    padding: 3.25rem 1.5rem;
  }

  .svc-num { padding: 0.6rem 0.4rem; }
  .floor-digits { font-size: 2rem; }

  .svc-main { flex-direction: column !important; gap: 1.7rem; }

  .svc-checklist { grid-template-columns: 1fr; }

  .svc-img-wrap { width: 120px; height: 120px; }

  .svc-outcome { font-size: 0.97rem; }

  .svc-convert {
    margin-top: 0.2rem;
    padding: 0.85rem 0.85rem 0.85rem 0.9rem;
  }

  .floor-buttons {
    position: fixed;
    bottom: 2rem; left: 50%;
    right: auto; top: auto;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 2rem;
  }

  .button-panel  { flex-direction: row; gap: 0.8rem; }
  .floor-button  { width: 3.5rem; height: 3.5rem; }
  .floor-number  { font-size: 1rem; }
  .floor-name    { font-size: 0.6rem; }
}

@media (max-width: 480px) {
  .svc-row        { padding: 2.75rem 1rem; }
  .header-section { padding: 4rem 1rem 3rem; }
  .page-sub       { margin-bottom: 1.1rem; }
  .header-tags    { margin-bottom: 1.6rem; }
  .floor-buttons  { bottom: 1rem; padding: 0.8rem 1.2rem; }
  .floor-button   { width: 3rem; height: 3rem; }
  .floor-number   { font-size: 0.9rem; }
  .floor-name     { font-size: 0.55rem; }
}
</style>
