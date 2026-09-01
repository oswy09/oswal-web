<template>
  <div class="project-detail">
    <!-- Close Button -->
    <!-- Top Navigation Button -->
    <!-- Updated: September 22, 2025 -->
    <div class="top-navigation-static">
      <button @click="goBack" class="back-to-gallery-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Volver a Galería</span>
      </button>
    </div>

    <!-- Close Button (mantener el original también) -->
    <router-link to="/projects" class="close-button-x">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </router-link>

    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Hero Section -->
      <div class="hero-section" v-if="currentProject">
        <div class="hero-background">
          <img :src="currentProject.image" :alt="currentProject.title" class="hero-image" />
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
          <h1 class="hero-title">{{ currentProject.title }}</h1>
          <p class="hero-description">{{ currentProject.keyAchievement }}</p>
          <div class="hero-meta">
            <div class="meta-item">
              <div class="meta-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span class="meta-label">Cliente</span>
              <span class="meta-value">{{ currentProject.client }}</span>
            </div>
            <div class="meta-item">
              <div class="meta-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
              </div>
              <span class="meta-label">Mi Rol</span>
              <span class="meta-value">{{ currentProject.myRole }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Challenge Section -->
      <div class="section challenge-section" v-if="currentProject && currentProject.challenge">
        <h2 class="section-title">El Reto</h2>
        <p class="section-content">{{ currentProject.challenge }}</p>
      </div>

      <!-- Process Section -->
      <div class="section process-section" v-if="currentProject && currentProject.process">
        <h2 class="section-title">El Proceso</h2>
        
        <!-- Research -->
        <div class="process-step" v-if="currentProject.process.research && currentProject.process.research.length > 0">
          <div class="step-header">
            <div class="step-icon">🔍</div>
            <h3 class="step-title">Investigación / UX</h3>
          </div>
          <ul class="step-list">
            <li v-for="item in currentProject.process.research" :key="item">{{ item }}</li>
          </ul>
        </div>

        <!-- Design -->
        <div class="process-step" v-if="currentProject.process.design && currentProject.process.design.activities && currentProject.process.design.activities.length > 0">
          <div class="step-header">
            <div class="step-icon">🎨</div>
            <h3 class="step-title">Diseño / UI</h3>
          </div>
          <ul class="step-list">
            <li v-for="activity in currentProject.process.design.activities" :key="activity">{{ activity }}</li>
          </ul>
          
          <!-- Colors -->
          <div class="design-details" v-if="currentProject.process.design.colors && currentProject.process.design.colors.length > 0">
            <div class="detail-group">
              <h4 class="detail-title">🎨 Paleta de Colores</h4>
              <div class="color-palette">
                <div 
                  v-for="color in currentProject.process.design.colors" 
                  :key="color"
                  class="color-swatch"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Typography -->
          <div class="design-details" v-if="currentProject.process.design.typography && currentProject.process.design.typography.length > 0">
            <div class="detail-group">
              <h4 class="detail-title">📝 Tipografía</h4>
              <div class="typography-list">
                <div v-for="font in currentProject.process.design.typography" :key="font.name" class="typography-item">
                  <span class="font-name">{{ font.name }}</span>
                  <span class="font-usage">{{ font.usage }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Development -->
        <div class="process-step" v-if="currentProject.process.development && currentProject.process.development.activities && currentProject.process.development.activities.length > 0">
          <div class="step-header">
            <div class="step-icon">💻</div>
            <h3 class="step-title">Desarrollo/Implementación</h3>
          </div>
          <ul class="step-list">
            <li v-for="activity in currentProject.process.development.activities" :key="activity">{{ activity }}</li>
          </ul>
          
          <!-- Tech Stack -->
          <div class="design-details" v-if="currentProject.process.development.stack && currentProject.process.development.stack.length > 0">
            <div class="detail-group">
              <h4 class="detail-title">Tecnologías Utilizadas</h4>
              <div class="tech-stack">
                <div v-for="tech in currentProject.process.development.stack" :key="tech.name" class="tech-item">
                  <i :class="tech.icon"></i>
                  <span>{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Marketing -->
        <div class="process-step" v-if="currentProject.marketing && currentProject.marketing.length > 0">
          <div class="step-header">
            <div class="step-icon">📈</div>
            <h3 class="step-title">Marketing</h3>
          </div>
          <ul class="step-list">
            <li v-for="activity in currentProject.marketing" :key="activity">{{ activity }}</li>
          </ul>
        </div>
      </div>

      <!-- Solution Section -->
      <div class="section solution-section" v-if="currentProject && currentProject.solution">
        <h2 class="section-title">La Solución</h2>
        <div class="solution-content">
          <!-- GIF Demo (si existe) -->
          <div class="solution-demo" v-if="currentProject.solution.gif">
            <img :src="currentProject.solution.gif" :alt="currentProject.title + ' demo'" class="solution-gif" />
          </div>
          
          <!-- Galería de Imágenes (si no hay GIF pero hay imageGallery) -->
          <div class="solution-gallery" v-else-if="currentProject.imageGallery && currentProject.imageGallery.length > 0">
            <div class="gallery-grid">
              <div 
                v-for="image in currentProject.imageGallery" 
                :key="image.url"
                class="gallery-item"
              >
                <div class="gallery-image-container">
                  <img :src="image.url" :alt="image.alt" class="gallery-image" />
                  <div class="gallery-tag">{{ image.tag }}</div>
                </div>
                <div class="gallery-caption">{{ image.caption }}</div>
              </div>
            </div>
          </div>
          
          <p class="solution-description">{{ currentProject.solution.description }}</p>
        </div>
      </div>

      <!-- Results Section -->
      <div class="section results-section" v-if="currentProject && currentProject.results && currentProject.results.length > 0">
        <h2 class="section-title">Resultados del Proyecto</h2>
        <div class="results-grid">
          <div v-for="result in currentProject.results" :key="result.metric" class="result-card">
            <div class="result-value">{{ result.value }}</div>
            <div class="result-metric">{{ result.metric }}</div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <!-- Bottom Fixed Navigation -->
      <div class="bottom-navigation">
        <button @click="previousProject" class="nav-btn secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Anterior</span>
        </button>
        
        <button @click="viewProject" class="nav-btn primary">
          <span>Ver Proyecto</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </button>
        
        <button @click="nextProject" class="nav-btn secondary">
          <span>Siguiente</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface Project {
  id: number
  slug: string
  title: string
  image: string
  category?: string
  client: string
  tags?: string[]
  year?: string
  description?: string
  duration?: string
  role?: string
  myRole?: string
  tools?: string
  keyAchievement?: string
  challenge?: string
  process?: any
  solution?: any
  results?: any[]
  imageGallery?: any[]
  liveUrl?: string
  type?: string
  percentage?: string
  improvement?: string
  impact?: string
  content?: string
  roles?: string[]
  industry?: string
  location?: string
  responsibilities?: string[]
  methodology?: any
  technologies?: string[]
  finalResult?: any
  achievements?: any[]
  marketing?: string[]
}

const currentProject = ref<Project | null>(null)

const results = [

{
    id: 1, slug: 'hotel-amazon',
    title: 'Hotel Amazon B&B - Un Refugio en el Corazón del Amazonas',
    image: 'http://www.amazonbb.com/wp-content/uploads/2023/05/boat-forest-river-blue-sky-reflection.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Revitalizando la presencia online para una experiencia amazónica auténtica y atractiva para el viajero internacional.',
    client: 'Hotel Amazon B&B',
    industry: 'Hotel',
    location: 'Amazonas, Colombia',
    myRole: 'Web designer',
    responsibilities: ['UX design', 'UI Design', 'Frontend Developer'],
    challenge: 'Amazon B&B, un encantador hotel inmerso en la exuberante selva amazónica, luchaba por conectar con su público objetivo: turistas extranjeros en busca de una experiencia única. Su sitio web existente era pesado, carente de diseño atractivo y con una usabilidad deficiente, lo que dificultaba la reserva y no reflejaba la belleza y autenticidad del lugar.',
    process: {
      research: [
        'Análisis de requisitos técnicos',
        'benchmark de sitios web de hoteles de ecoturismo',
        'Análisis de Usabilidad del Sitio Web',
        'User Flow',
        'Card Sorting',
        'Arquitectura de la Información y Sitemap',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Prototipado de visualizaciones',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#455D58', '#3B6317', '#9DBC79', '#EC9B30', '#2E3B48'],
        typography: [
          { name: 'EB Garamond', usage: 'Títulos y encabezados' },
          { name: 'Montserrat', usage: 'Texto y contenido' },
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
           'Integración con reservas online',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
     
    },
    solution: {
      description: 'Se rediseñó un sitio web moderno y responsivo para el Hotel Amazon B&B, construyendo la experiencia desde cero tras eliminar la plantilla original. La solución optimiza la interfaz de usuario para turistas extranjeros, integra funcionalidades clave de reservas y se accede de manera fácil al contenido y tours.',
    },
    imageGallery: [
      {
        url: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428647/Amazon_Hotel_Proyecto_oswal.jpg",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Hotel amazon B&B Home",
        tag: "resultado" 
      },
      {
        url: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428648/Amazon_Hotel_Rooms_Proyecto_oswal.png",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Hotel amazon B&B acomodaciones",
        tag: "resultado" 
      }
    ],
    results: [
      { value: '+25%', metric: 'Tasa de Conversión de Reservas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    marketing: [
      'Análisis de mercado turístico amazónico',
      'Estrategia de posicionamiento para turistas extranjeros',
      'Integración con redes sociales y plataformas de reservas',
      'Configuración de Google Analytics'
    ],
    liveUrl: 'https://www.amazonbb.com/',
  },
  
   {
    id: 2, slug: 'micentro-comercial',
    title: 'MiCentro: Navegando la Experiencia Comercial',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288825/micentro_el_porvenir_xef2ft.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño de sitio web para el centro comercial, fortaleciendo la presencia online',
    client: 'MiCentro El Porvenir',
    industry: 'Centro comercial',
    location: 'Bogotá, Colombia',
    myRole: 'Web designer',
    responsibilities: ['UX design', 'UI Design', 'Frontend Developer'],
    challenge: 'MiCentro El Porvenir, un centro comercial en Bogotá, luchaba por conectar con su público objetivo: compradores en busca de una experiencia única. Su sitio web existente era pesado, carente de diseño atractivo y con una usabilidad deficiente, lo que dificultaba la reserva y no reflejaba la belleza y autenticidad del lugar.',
    process: {
      research: [
       
        'benchmark de sitios web de hoteles de ecoturismo',
        'Análisis de Usabilidad del Sitio Web',
        'User Journey Map',
        'Card Sorting',
        'Arquitectura de la Información y Sitemap',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Prototipado de visualizaciones',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#ff4364', '#EFA146'],
        typography: [
          { name: 'Philosopher', usage: 'Títulos y encabezados' },
          { name: 'Lato', usage: 'Texto y contenido' },
        ],
      },
      development: { 
        activities: [

          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
    },
     solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756241744/Proyecto_oswal_web_design_micentro_jpfodi.gif',
      description: 'Se entregó un sitio web dinámico y visualmente atractivo para MiCentro, construido desde cero en WordPress con un constructor visual avanzado, diseñado para ser el punto de referencia digital del centro comercial. La plataforma cuenta con un directorio de marcas intuitivo, un calendario de eventos interactivo y un blog, todo gestionable autónomamente gracias a la implementación de campos personalizados. La solución  elevó la presencia digital de MiCentro.',
    },
    results: [
      { value: '+30%', metric: 'Aumento en la Visibilidad Orgánica' },
      { value: '+25%', metric: 'Incremento en Consultas Directas a Tiendas' },
      { value: '2', metric: 'promedio de páginas que los usuarios visita antes de terminar la sesión' },
    ],

     marketing: [
      'Configuración de Google Analytics y Search Console',
      'Configuración Correos y email-marketing',
      'Configuración Pixel de Facebook',
      'SEO Básico'

    ],
    liveUrl: 'https://ccmicentro.com/',
  },

{
    id: 3, slug: 'axa-portal',
    title: 'AXA Colpatria - Rediseño Estratégico de portal público',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757429889/Redise%C3%B1o_AXA_oswal-proyectos.png',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Rediseño completo de la plataforma web de AXA Colpatria, elevando la experiencia de usuario e interfaz (UX/UI) a estándares de última generación, incorporando nuevas tecnologías y aplicando rigurosos principios de usabilidad y accesibilidad para optimizar la interacción de los clientes con los servicios de seguros.',
    client: 'AXA COLPATRIA',
    industry: 'Aseguradora',
    location: 'Colombia',
    myRole: 'Ux/ui Designer',
    responsibilities: ['UX /UI design'],
    challenge: 'AXA Colpatria, líder en el sector asegurador, enfrentaba el desafío de transformar su plataforma web existente en un canal digital que no solo fuera funcional, sino que realmente inspirara confianza, simplificara la compleja información de seguros y ofreciera una experiencia de usuario intuitiva y moderna. El reto era ambicioso: ir más allá de una actualización visual, enfocándose en una arquitectura de información optimizada, flujos de navegación simplificados y un diseño inclusivo',
    process: {
      research: [
        'Benchmark',
        'Análisis de Usabilidad del Sitio Web',
        'User persona',
        'User Journey Map',
        'Card Sorting',
        'Sitemap',
        'Pruebas de Usabilidad',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Integración sistema de diseño',
          'Prototipado',
          'Diseño de Iconografía y Elementos Gráficos',
          'Diseño de Microinteracciones y Estados de Componentes',
          'Diseño Responsivo y Adaptativo',
          'Aplicación de Estándares de Accesibilidad (WCAG 2.1 AA)',
        ],
        colors: ['#5C5CB7', '#3D3DAA', '#00008F', '#DD7358', '#D75D3D','#D24723','#7698CB','#41949F','#E196AA'],
        typography: [
          { name: 'Public headline', usage: 'Títulos y encabezados' },
          { name: 'Source sans pro', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu028-1_onezxr.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu078-1_xyjys5.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu016-1_idgqse.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu048-1_k4uffx.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu134-1_vlg4pa.png' }
        ],
      },
      development: { 
        activities: [],  
        stack: [],
      },
      marketing: [
        'Email-marketing',
      ],
    },
    solution: {
      description: 'Se entregó un rediseño estratégico de la plataforma web de AXA Colpatria, transformándola en una experiencia digital de seguros moderna, intuitiva e inclusiva.',
    },
    results: [
      { value: '+30%', metric: 'Aumento satisfacción del cliente' },
      { value: '+25%', metric: 'Aumento tasa conversión productos' },
      { value: '+40%', metric: 'Redireccionamiento a landing pages' },
    ],

     marketing: [
      
    ],
    liveUrl: 'https://www.axacolpatria.co/home',
    imageGallery: [
      {
        url: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756512408/AXA_Colpatria_antes_website_ecypnb.jpg",
        alt: "Imagen resultado sitio web_AXA_COLPATRIA",
        caption: "Home AXA Colpatria_antes",
        tag: "antes" 
      },
      {
        url: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756511734/Proyectos_oswal_web_design_AXA_Home_page_p62gsa.jpg",
        alt: "Imagen resultado sitio web_Amazon b&B",
        caption: "Home AXA Colpatria_Ahora",
        tag: "resultado" 
      }
    ]
  },
  
  {
    id: 4, slug: 'acueducto-ia',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757289000/plataforma_concursos.jpg',
    title: 'Plataforma de Estudio con IA para Acueducto de Bogotá',
    roles: ['UX Research', 'UI Design', 'Frontend Designer'],
    keyAchievement: 'Plataforma donde los empleados suben sus PDFs, la IA genera resúmenes automáticos, crean quizzes y exámenes de práctica, y un chat con IA resuelve dudas en tiempo real — todo para prepararse para los concursos de ascenso.',
    client: 'Acueducto de Bogotá',
    industry: 'Servicios públicos',
    location: 'Bogotá, Colombia',
    myRole: 'Frontend Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Developer'],
    challenge: 'El Acueducto de Bogotá buscaba una solución innovadora para apoyar a sus empleados en la preparación de los concursos de ascenso. El reto era ir más allá de los métodos tradicionales: crear una plataforma donde cada empleado pudiera subir sus propios materiales de estudio, obtener resúmenes inteligentes generados por IA, practicar con quizzes y exámenes, y despejar dudas en tiempo real — todo de forma autónoma, sin depender de formadores presenciales.',
    process: {
      research: [
        'User Flow del ciclo completo de estudio: subir PDF → resumen → quiz → chat',
        'Arquitectura de la Información y Sitemap',
        'Pruebas de Usabilidad con empleados reales',
      ],
      design: {
        activities: [
          'Diseño de Mockups para cada módulo (subida, resumen, quizz, chat, dashboard)',
          'Adaptación y Aplicación de UI kit institucional',
          'Diseño de elementos gráficos y microinteracciones',
        ],
        colors: ['#1361C4', '#02FFA6'],
        typography: [
          { name: 'Montserrat', usage: 'Títulos y encabezados' },
          { name: 'Inter', usage: 'Texto y contenido' },
        ],
      },
      development: {
        activities: [
          'Módulo de carga de PDFs con procesamiento automático por IA',
          'Generación automática de resúmenes inteligentes del material subido',
          'Sistema de quizzes y exámenes de práctica generados desde el contenido',
          'Chat con IA para resolver dudas sobre el material de estudio',
          'Dashboard de gestión de usuarios y seguimiento de progreso',
          'Implementación de seguridad y control de acceso interno',
        ],
        stack: [
          { name: 'Vue.js', icon: 'fa-brands fa-vuejs' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756246659/Proyectos_oswal_web_design_AXA_landing_vida_hlubht.gif',
      description: 'Se desarrolló una plataforma de estudio potenciada con IA para el Acueducto de Bogotá: los empleados suben sus PDFs, la IA genera resúmenes automáticos, crean quizzes y exámenes de práctica desde ese mismo contenido, y pueden despejar dudas en tiempo real con un chat inteligente — convirtiendo cualquier material de estudio en una experiencia de aprendizaje activa y autónoma.',
    },
    results: [
      { value: 'Autónomo', metric: 'Cada empleado estudia a su ritmo sin depender de formadores presenciales' },
      { value: 'IA integrada', metric: 'Resúmenes automáticos, quizzes y chat para despejar dudas del material' },
      { value: 'Concursos', metric: 'Preparación efectiva para los concursos de ascenso del Acueducto' },
    ],
    marketing: [],
    liveUrl: 'https://acua.online/',
  },


 {
    id: 5, slug: 'bunker-libros',
    title: 'Buker de Libros - Interfaz Digital para Gestión de Pedidos por WhatsApp',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1759844475/bunker_search_etcshz.png',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Creación de una interfaz web simple,permite a los usuarios buscar y seleccionar libros para, posteriormente, enviar su pedido directamente a través de WhatsApp para cerrar la venta, optimizando el proceso de cotización y búsqueda interna.',
    client: 'Bunker de libros',
    industry: 'Aseguradora',
    location: 'Bogota,Colombia',
    myRole: 'Frontend designer',
    responsibilities: ['UX design', 'UI Design', 'Frontend Developer'],
    challenge: 'El principal desafío era digitalizar el proceso de venta de libros que operaba de manera manual,Se necesitaba una interfaz web sencilla que actuara como un buscador y catálogo inteligente, eliminando la necesidad de correos electrónicos o llamadas complejas. El reto fue diseñar una experiencia que fuera intuitiva para el usuario final',
    process: {
      research: [
        
      ],
      design: {
        activities: [
          'Diseño de Mockups',
          'Prototipos',
         
        ],
        colors: ['#044366', '#007078'],
        typography: [
          { name: 'Poppins', usage: 'Títulos y encabezados' },
          { name: 'Poppins', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu028-1_onezxr.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu078-1_xyjys5.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu016-1_idgqse.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu048-1_k4uffx.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu134-1_vlg4pa.png' }
        ],
      },
      development: { 
        activities: [
          'Integración API libros',
          'Implementación en vue.js',
          'Desarrollo de Funcionalidades Personalizadas',
          'Sistema de Búsqueda y Filtrado Dinámico ',
      
        ],  
        stack: [
            { name: 'Vue.js', icon: 'fa-brands fa-vuejs' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
     
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1759844816/Bunker_libros_buscador_zp0wdr.gif',
      description: 'Se entregó una interfaz web ligera y focalizada que actúa como un puente eficiente entre el cliente y el emprendedor. La plataforma de "Buker de Libros" permite a los usuarios construir su pedido de forma intuitiva y lo envía al instante a WhatsApp, digitalizando el inicio del embudo de ventas y proporcionando al emprendedor la información de la solicitud de forma organizada y sin errores, optimizando el tiempo dedicado a la búsqueda y cotización.',
    },
    results: [
      { value: '+8.5%', metric: 'asa de Conversión a WhatsApp' },
      { value: '-40%', metric: 'en el Tiempo de Gestión de Pedidos Inicial' },
    ],

     marketing: [
      
    ],
    liveUrl: 'https://bunkerdelibros.shop/',
  },

{
    id: 6, slug: 'clinica-dental',
    title: 'Clínica Odontológica en Suecia',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288824/Clinica-en-suecia_olmnmu.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño Web y UX para una Experiencia Profesional y Confiable',
    client: 'kliniken Schröder',
    industry: 'Clinica dental',
    location: 'Estocolmo, Suecia',
    myRole: 'Web designer',
    responsibilities: ['Web designer'],
    challenge: 'Diseño y desarrollo de una plataforma web moderna y profesional para una clínica odontológica en Suecia, con el objetivo de proyectar confianza, facilitar el acceso a información sobre tratamientos.',
    process: {
      research: [
        'Análisis de Audiencia Sueca y Estándares de Confianza',
        'Análisis de Usabilidad del Sitio Web',
        'Arquitectura de la Información y Sitemap',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#2C2C96', '#99A833'],
        typography: [
          { name: 'Cormorant Garamond', usage: 'Títulos y encabezados' },
          { name: 'Open sans', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757437831/Blekning-icon2_oivi6k.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757437832/corona-dental-2_iljbtg.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757437832/Snarkskenor-icon2_dvnoj3.png' }
        ],
      },
      development: { 
        activities: [
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
     
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756514195/Proyectos_oswal_web_design_Tandkliniken_schroder_slkyt8.gif',
      description: 'Se entregó un sitio web profesional y minimalista para la clínica odontológica en Suecia, diseñado para ser una herramienta clave en la captación y comunicación con los pacientes. La plataforma, con un estilo estético sueco, presenta los servicios y al equipo de manera clara y transparente, estableciendo la confianza digital',
    },
    results: [
      { value: '+20%', metric: 'Tasa de Conversión de Reservas' },
      
    ],
    liveUrl: 'https://tandklinikenlschroder.se/',
  },

  {
    id: 7, slug: 'bestyle-catalogo',
    title: 'Bestyle - Catálogo Digital Interactivo y Venta Express',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757289224/bestyle_Web_design.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño y desarrollo de una solución de catálogo digital ágil y moderna, permitiendo a Bestyle vender sus prendas online de forma rápida y directa a través de WhatsApp y enlaces de pago.',
    client: 'Bestyle',
    industry: 'Ropa y moda',
    location: 'Colombia',
    myRole: 'Frontend designer',
    responsibilities: ['Web designer', 'Frontend Developer'],
    challenge: 'Bestyle, una marca de moda con fuerte presencia en redes sociales, necesitaba trascender la venta por mensaje directo y establecer una presencia online funcional y expedita para su catálogo de prendas. El principal desafío era crear una solución digital rápida y fácil de usar que permitiera a los clientes explorar las prendas, calcular el total de su compra y finalizar el pedido de manera fluida vía WhatsApp o mediante un enlace de pago, todo ello sin la complejidad de un e-commerce tradicional.',
    process: {
      design: {
        activities: [
          'Diseño de Mockups',
          'Diseño Responsivo y Adaptativo',
          'Adaptación de Componentes de Diseño e Iconografía Genérica',
        ],
      },
      development: { 
        activities: [
          'Implementación de Funcionalidades Personalizadas',
          'Implementación de Generación de Pedido vía WhatsApp y link de pago',
          'Sistema de Búsqueda y Filtrado Dinámico (Categorías y Subcategorías)',
        ],  
        stack: [
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
      marketing: [
        'Optimización para Motores de Búsqueda (SEO)',
        'Análisis de Experiencia Digital',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756247093/Proyectos_oswal_web_design_bestyle_lh9b7z.gif',
      description: 'Se desarrolló una plataforma de catálogo digital ágil y moderna para Bestyle, permitiendo a la marca realizar ventas online rápidas y directas. permite a los clientes seleccionar prendas, calcular su total y finalizar la compra enviando el pedido por WhatsApp o a través de un link de pago.',
    },
    results: [
      { value: '+20%', metric: ' Ventas Directas Online' },
      { value: '24/7', metric: 'Mayor Alcance y Disponibilidad' },
      { value: '+30%', metric: 'Productividad en gestión de consultas' },
    ],
    liveUrl: 'https://bestyle.store/',
  },
  
  {
    id: 8, slug: 'axa-landing',
    title: 'AXA Colpatria - Landing Page "Seguro de Vida Deudor"',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288825/Landing_AX-COL_.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Creación de una landing page corporativa de alto impacto visual y optimizada para la conversión, enfocada en la captación de leads para el Seguro de Vida Deudor de AXA Colpatria.',
    client: 'AXA COLPATRIA',
    industry: 'Aseguradora',
    location: 'Colombia',
    myRole: 'UX/UI designer',
    responsibilities: ['UX design', 'UI Design', 'Frontend Developer'],
    challenge: 'AXA Colpatria necesitaba una landing page específica y altamente efectiva para promocionar su Seguro de Vida Deudor. El desafío era diseñar y desarrollar una página que no solo comunicara de forma clara los beneficios y requisitos del seguro, sino que también inspirara confianza, guiara al usuario intuitivamente, y que se pudiera integrar facilmente a un CRM.',
    process: {
      research: [
        'Benchmark',
        'Análisis de Usabilidad del Sitio Web',
      
        'Pruebas de Usabilidad',
      ],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Integración sistema de diseño',
          'Prototipado',

        ],
        colors: ['#5C5CB7', '#3D3DAA', '#00008F', '#DD7358', '#D75D3D','#D24723','#7698CB','#41949F','#E196AA'],
        typography: [
          { name: 'Publico Headline Web', usage: 'Títulos y encabezados' },
          { name: 'Source Sans Pro', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu028-1_onezxr.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu078-1_xyjys5.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu016-1_idgqse.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu048-1_k4uffx.png' },
          { type: 'image', value: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757428991/ilu134-1_vlg4pa.png' }
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Implementación en html, css y Javascript',
          'Desarrollo de Funcionalidades Personalizadas',
          'Diseño y configuración de iconos fuente',
          'Creación y envío de formulario',
        ],  
        stack: [
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
      marketing: [
        'Optimización para Motores de Búsqueda (SEO)',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756246659/Proyectos_oswal_web_design_AXA_landing_vida_hlubht.gif',
      description: 'Se entregó una landing page clave para AXA Colpatria, concebida en Figma y desarrollada con código HTML, CSS y JavaScript. Esta página es totalmente responsiva y fue construida para cumplir con objetivos de negocio y marketing claros. Su diseño presenta los beneficios del Seguro de Vida Deudor de forma directa y su función principal es captar leads calificados eficientemente a través de un formulario optimizado.',
    },
    results: [
      { value: '+35%', metric: 'Tasa de Conversión de Leads' },
      { value: '-15%', metric: 'Tasa de rebote' },
    ],
 marketing: [
      'Integración Google analytics',
      'Meta etiquetas',
      'Optimización SEO ',
       
    ],

    liveUrl: 'https://lpsv.netlify.app/',
  },
  
  {
    id: 9, slug: 'betterme-clinica',
    title: 'BetterMe - Tu Transformación Estética en Colombia',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757288824/Betterme_Ver2_bo15xy.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Web moderna y sencilla para BetterMe, facilitando a extranjeros el acceso a servicios de cirugía y procedimientos estéticos en Colombia',
    client: 'Betterme',
    industry: 'Estética y Belleza', 
    location: 'Miami, Medellín',
    myRole: 'Web designer',
    responsibilities: ['Web designer', 'Frontend Developer'],
    challenge: 'El desafío principal era construir un sitio web que no solo mostrara la gama de servicios y el equipo de especialistas, sino que también transmitiera confianza, seguridad y la propuesta de valor integral (logística, recuperación). Además, era crucial que la plataforma fuera fácilmente actualizable por el equipo de BetterMe para mantener la información de servicios y especialistas al día.',
    process: {
      design: {
        activities: [
          'Diseño de Mockups',
          'Prototipado',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#3a4183',  '#F1918C', '#E6E6F2'],
        typography: [ 
          { name: 'Manrope', usage: 'Títulos y texto contenido' },
        ],
        icons: [
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/quienes-somos.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/quienes-somos-betterme.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/facial.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/aparatologia.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/ciudades.png' },
          { type: 'image', value: 'http://betterme.oswal.com.co/wp-content/uploads/2025/02/medicina-estetica.png' }
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
      marketing: [
        'Test A/B (A/B Testing)',
        'Optimización para Motores de Búsqueda (SEO)',
        'Análisis de Experiencia Digital',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756249634/Proyectos_oswal_web_design_Betterme_hx48fj.gif',
      description: 'Se rediseñó un sitio web moderno y responsivo para BetterMe, construyendo la experiencia desde cero. La solución optimiza la interfaz de usuario para extranjeros interesados en procedimientos estéticos en Colombia, integra funcionalidades clave de información de servicios y facilita el contacto directo.',
    },
    results: [
      { value: '+20%', metric: 'Tasa de Conversión de Consultas' },
      { value: '+25%', metric: 'Volumen de consultas directas vía correo y WhatsApp' },
      { value: '+40%', metric: 'Facilidad de Gestión de Contenido' },
    ],
    liveUrl: 'https://betterme.oswal.com.co/',
  },
  {
    id: 10, slug: 'dedicandote',
    title: 'Dedicándote: Website de Dedicatorias Musicales y Diseño Personalizado',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757429234/dedicandote_proyecto_oswaldo.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño y desarrollo de una landing page promocional y funcional para "Dedicándote", permitiendo a los usuarios elegir diseños y dedicar canciones con reproductores de música personalizados',
    client: 'Dedicandote',
    industry: 'Música', 
    location: 'Bogotá, Colombia',
    myRole: 'Frontend designer',
    responsibilities: ['Web designer', 'Frontend Developer','Marketing'],
    challenge: '"Dedicándote" buscaba lanzar un servicio innovador: dedicatorias musicales con diseños personalizados. El desafío era crear una presencia online atractiva y funcional que promocionara este producto único y, al mismo tiempo, facilitara el proceso de personalización de la dedicatoria, la selección de la canción, la visualización del reproductor y la gestión del pedido',
    process: {
      design: {
        activities: [
          'Diseño de Mockups',
          'Prototipado',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#AA50E6', '#a9f9f3', '#3969CB'],
        typography: [
          { name: 'Montserrat', usage: 'Títulos y texto contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-song-64.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-play-64.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-get-quote-60.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/icons8-image-64.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/arco-iris.png' },
          { type: 'image', value: 'https://dedicandote.com/wp-content/uploads/2024/12/rayo.png' },
        ],
      },
      development: { 
        activities: [
          'Configuración hosting',
          'Construcción de Layouts y Diseño a Medida de reproductores de música',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
          'Implementación de Seguridad Web',
          'Implementación de Formulario',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
          { name: 'PHP', icon: 'fa-brands fa-php' },
        ],
      },
     
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1756249840/Proyectos_oswal_web_design_Dedicandote_f0subc.gif',
      description: 'Se entregó una landing page promocional y transaccional para "Dedicándote", construida en WordPress, que integra reproductores de música personalizables desarrollados a medida con HTML, CSS y JavaScript. Esta plataforma, con un diseño moderno y centrado en la emoción, permite a los usuarios elegir entre diversos diseños, dedicar canciones, previsualizar su creación y gestionar el pedido con un formulario detallado, notificaciones automáticas por correo',
    },
    results: [
      { value: '5%', metric: 'Tasa de Conversión de Pedidos' },
      { value: '45%', metric: 'Nivel de Interacción con Reproductores' },
      { value: '70%', metric: 'Reducción del Tiempo de Procesamiento de Pedidos' },
    ],
    marketing: [
      'Estrategia de lanzamiento digital',
      'Estrategia embudo de ventas',
      'Optimización SEO ',
       
    ],
    liveUrl: 'https://dedicandote.com/',
  },
 
   {
  
    id: 11, slug: 'cafe-cumbre',
    title: 'Café Cumbre Real: Diseño Web, Marca de Café de Origen',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757454819/Web_cafe_cumbre_Proyectos_Oswal.png',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Diseño web para la marca de café molido y tostado "Café Cumbre Real", con el objetivo de establecer una presencia digital que celebre la calidad del producto y facilite su venta online.',
    client: 'Café Cumbre Real',
    industry: 'Venta de café',
    location: 'Fusagasuga, Colombia',
    myRole: 'Web designer',
    responsibilities: ['Web designer'],
    challenge: '"Café Cumbre Real" necesitaba una identidad digital que reflejara la autenticidad y el proceso artesanal de su café de origen. El desafío era crear una plataforma web que no solo funcionara como una tienda online, sino que también contara la historia detrás de cada grano. El objetivo era diseñar un sitio que generara confianza, atrajera a conocedores del café y simplificara la experiencia de compra,',
    process: {
      research: [],
      design: {
        activities: [
          'Creación de Wireframes y Diseño de Mockups',
          'Prototipado de visualizaciones',
          'Optimización y mejoramiento de UI Kit',
          'Diseño de Iconografía y Elementos Gráficos',
        ],
        colors: ['#811C25', '#1A6340'],
        typography: [
          { name: 'Cormorant Garamond', usage: 'Títulos y encabezados' },
          { name: 'Open sans', usage: 'Texto y contenido' },
        ],
        icons: [
          { type: 'image', value: 'https://cafecumbrereal.com/wp-content/uploads/2022/02/taza-1.png' },
          { type: 'image', value: 'https://cafecumbrereal.com/wp-content/uploads/2022/02/cultivo-granos-de-cafe-.png' },
          { type: 'image', value: 'https://cafecumbrereal.com/wp-content/uploads/2022/02/proceso-lavar.png' },
          { type: 'image', value: 'https://cafecumbrereal.com/wp-content/uploads/2022/02/ubicacion.png' }
        ],
      },
      development: { 
        activities: [
          'Evaluación de Accesibilidad Web',
          'Migración a hosting',
          'Construcción de Layouts y Diseño a Medida con Constructor Visual',
          'Performance Optimization',
          'Mantenimiento y Actualizaciones Wordpress',
          'Desarrollo de Funcionalidades Personalizadas',
        ],  
        stack: [
          { name: 'Wordpress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
      marketing: [
        'Optimización para Motores de Búsqueda (SEO)',
        'Análisis de Experiencia Digital',
      ],
    },
    solution: {
      gif: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1757456367/Proyectos_oswal_record_website_cafe_cumbre_xtrwtp.gif',
      description: 'Se diseño e implemento un sitio web sumerge en la historia de la marca a través de un diseño visualmente atractivo y una narrativa cuidadosamente elaborada. El resultado es un sitio web que transforma a los visitantes en clientes.',
    },
    results: [
      { value: '+4%', metric: 'Tasa de Conversión Inicial' },
      { value: 'Mayor', metric: 'Comunicación Efectiva de la Marca' },
      { value: '+15%', metric: 'Volumen de consultas por WhatsApp' },
    ],
    liveUrl: 'https://cafecumbrereal.com/',
  },

  {
    id: 12, slug: 'celebrarte',
    title: 'Celebrarte — Invitaciones Digitales Interactivas: Reinventando la Forma de Celebrar',
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1787964181/celebrarte_pc_ncmqdr.jpg",
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Plataforma de invitaciones digitales animadas (baby shower, bodas, cumpleaños) con sobre animado, RSVP, muro de deseos y checkout vía WhatsApp — entrega del link personalizado en menos de 24 horas.',
    client: 'Celebrarte',
    industry: 'Entretenimiento / Eventos',
    location: 'Colombia',
    myRole: 'Frontend Designer & UX Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Designer'],
    challenge: 'Celebrarte necesitaba diferenciarse de la invitación digital tradicional —una imagen estática enviada por WhatsApp— y ofrecer en su lugar una experiencia animada, interactiva y memorable. El reto era diseñar y construir una plataforma de plantillas personalizables (baby shower, boda, cumpleaños) con sobre animado, confirmación de asistencia (RSVP), muro de deseos y mapa interactivo, pensada 100% para móvil, con un flujo de personalización simple y un tiempo de entrega del link menor a 24 horas.',
    process: {
      research: [
        'User Flow de personalización y compra',
        'Arquitectura de la información por categoría de evento',
        'Pruebas de usabilidad con clientas reales',
      ],
      design: {
        activities: [
          'Diseño de mockups por plantilla y categoría',
          'Sistema de diseño reutilizable para nuevas plantillas',
          'Diseño del sobre animado y microinteracciones',
        ],
        colors: ['#5A1B5E', '#3A1140', '#1A0A20', '#7A2E8A'],
        typography: [
          { name: 'Quicksand', usage: 'Cuerpo base — todo el texto general (400, 500, 600, 700)' },
          { name: 'Playfair Display', usage: 'Títulos / display — encabezados elegantes (400, 600, 700)' },
        ],
      },
      development: {
        activities: [
          'Diseño de microinteracciones y animaciones JS/CSS (sobre animado, confeti, transiciones)',
          'Construcción de la interfaz interactiva y dinámica utilizando Vue.js',
          'Formulario de personalización en tiempo real con previsualización',
          'Integración con WhatsApp para checkout y soporte',
          'Optimización de performance para carga rápida en móvil',
        ],
        stack: [
          { name: 'Vue.js', icon: 'fa-brands fa-vuejs' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
    },
    solution: {
      description: 'Se desarrolló una plataforma de invitaciones digitales animadas y personalizables para Celebrarte, con plantillas por categoría de evento, sobre animado interactivo, RSVP, muro de deseos en tiempo real y checkout simplificado vía WhatsApp — logrando una experiencia de compra fluida de principio a fin, y sirviendo como base para generar rápidamente nuevas plantillas personalizadas a partir del mismo sistema.',
    },
    results: [
      { value: '+50', metric: 'Celebraciones realizadas con la plataforma' },
      { value: '4.8★', metric: 'Calificación promedio en Google' },
      { value: '<24h', metric: 'Tiempo de entrega del link personalizado' },
    ],
    liveUrl: 'https://celebrarte.com.co/',
  },

  {
    id: 13, slug: 'cafe-de-los-loros',
    title: 'Café de los Loros: La Puerta de Entrada al Sabor Amazónico en Leticia',
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1787965586/cafe-loros-pc_ff26lc.jpg",
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Web que posiciona a Café de los Loros como el santuario del café amazónico en Leticia, con reservas y cotización de eventos directamente vía WhatsApp.',
    client: 'Café de los Loros',
    industry: 'Gastronomía / Café-Bar',
    location: 'Leticia, Amazonas, Colombia',
    myRole: 'Frontend Designer & UX Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Designer'],
    challenge: 'Café de los Loros buscaba posicionarse como el punto de encuentro obligado para quienes llegan a Leticia camino al Amazonas: un lugar que fuera café, bar y espacio de eventos a la vez. El reto era construir una web que transmitiera esa identidad "selva-café" desde el primer scroll, mostrara con claridad la oferta (café, cócteles, comidas, postres, vinos y cervezas) y facilitara dos acciones clave: reservar mesa y cotizar un evento (reuniones de negocios, coffee breaks, celebraciones), todo en un sitio simple de mantener por el cliente.',
    process: {
      research: [
        'User Flow de reserva y cotización de eventos',
        'Arquitectura de la información por tipo de visitante (turista de paso vs. cliente de eventos corporativos)',
        'Pruebas de usabilidad en mobile (perfil principal: viajero consultando desde el celular)',
      ],
      design: {
        activities: [
          'Diseño de mockups para Home, Menú, Eventos y Blog',
          'Diseño de componente interactivo "Encuentra tu perfil ideal" (slider de intensidad de café)',
          'Selección de imágenes y tono visual "santuario amazónico"',
        ],
        colors: ['#DA3313', '#F2B33D', '#8B8D3B', '#77624C', '#ACA043'],
        typography: [
          { name: 'Quicksand', usage: 'Títulos y texto — toda la interfaz (400, 500, 600, 700)' },
        ],
      },
      development: {
        activities: [
          'Maquetación en WordPress + Elementor sobre el theme del sitio',
          'Diseño de microinteracciones (slider de intensidad de café, scroll reveals)',
          'Integración de formulario de reservas y cotización de eventos',
          'Automatización del flujo de reservas (notificaciones automáticas al cliente y al negocio)',
          'Integración con WhatsApp para contacto directo',
          'Optimización de imágenes y performance para conexión móvil',
        ],
        stack: [
          { name: 'WordPress', icon: 'fa-brands fa-wordpress' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
    },
    solution: {
      description: 'Se diseñó una web para Café de los Loros que presenta la experiencia del lugar como "el santuario del café amazónico", con secciones claras de producto (café, cócteles, comidas, postres), un componente interactivo para elegir intensidad de café, y flujos directos de reserva y cotización de eventos vía WhatsApp — posicionando al café como la primera parada de cualquier viajero que llega a Leticia.',
    },
    results: [
      { value: '+100', metric: 'Eventos realizados y gestionados a través del sitio' },
      { value: '6:30 am – 10 pm', metric: 'Horario comunicado con claridad (L–S)' },
      { value: 'WhatsApp', metric: 'Canal directo de reservas y contacto integrado' },
    ],
    liveUrl: 'https://cafedelosloros.com/',
  },

  {
    id: 14, slug: 'fluent-future',
    title: 'Fluent Future: Consultoría de Inglés para Profesionales Hispanohablantes',
    image: "https://res.cloudinary.com/ddqbnr9vo/image/upload/v1787967089/fluente_future_pc_eczwzj.jpg",
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Una web que comunica con claridad quién es Fluent Future y por qué no es una academia más — ayudando a atraer profesionales que buscan mejorar su expresión en inglés para avanzar en sus carreras.',
    client: 'Fluent Future',
    industry: 'Educación / Consultoría de idiomas',
    location: 'Remoto — profesionales hispanohablantes',
    myRole: 'Frontend Designer & UX Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Designer'],
    challenge: 'Fluent Future acompaña a profesionales hispanohablantes que ya tienen inglés funcional, pero necesitan pulir cómo se expresan en momentos que importan: una reunión, una entrevista, una negociación. El reto era transmitir ese posicionamiento — consultoría personal para pulir la expresión, no una academia que enseña desde cero — y construir una experiencia de usuario que generara confianza, diferenciara la propuesta de valor y facilitara la reserva de sesiones de forma fluida.',
    process: {
      research: [
        'Definición del perfil de usuario: profesional hispanohablante con inglés funcional',
        'User Flow de reserva de sesión y onboarding',
        'Arquitectura de la información centrada en la propuesta de valor diferencial',
        'Pruebas de usabilidad para mejorar la experiencia de reservas',
      ],
      design: {
        activities: [
          'Diseño de mockups y sistema de diseño propio (sin UI framework)',
          'Microinteracciones y animaciones con GSAP 3.15 + CSS @keyframes',
          'Diseño del flujo de reservas y confirmación de sesiones',
          'Optimización de la experiencia de usuario en todo el recorrido',
        ],
        colors: ['#2E8A93', '#D9603A', '#F0B450', '#FEFAF5', '#332E2A'],
        typography: [
          { name: 'Poppins', usage: 'Headings — presencia y claridad' },
          { name: 'Karla', usage: 'Body — legibilidad en texto largo' },
        ],
      },
      development: {
        activities: [
          'Construcción con Nuxt 3 (Vue 3, SSR activo)',
          'Integración con CMS Storyblok para gestión de contenido',
          'Sistema de reservas de sesiones integrado',
          'Configuración de Google Analytics para seguimiento de conversiones',
          'Animaciones con GSAP 3.15 y CSS @keyframes',
          'CSS Vanilla con custom properties (sin UI framework)',
          'Optimización de performance y Core Web Vitals',
        ],
        stack: [
          { name: 'Vue.js', icon: 'fa-brands fa-vuejs' },
          { name: 'Storyblok', icon: 'fa-solid fa-layer-group' },
          { name: 'GSAP', icon: 'fa-solid fa-wand-magic-sparkles' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
    },
    solution: {
      description: 'Se diseñó y desarrolló una plataforma web con Nuxt 3 y CMS Storyblok que posiciona a Fluent Future como consultoría de expresión en inglés para profesionales, diferenciándola de academias tradicionales. La experiencia incluye animaciones GSAP, un sistema de reservas de sesiones integrado, seguimiento con Google Analytics y contenido gestionable desde Storyblok — logrando un sitio rápido, escalable y con una propuesta de valor clara desde el primer scroll.',
    },
    results: [
      { value: 'Clara', metric: 'Propuesta de valor diferenciada — no academia, consultoría personal' },
      { value: 'Reservas', metric: 'Flujo de agendamiento de sesiones sin fricción desde el primer día' },
      { value: 'Escalable', metric: 'Contenido gestionable de forma autónoma para crecer sin depender de un dev' },
    ],
    liveUrl: 'https://fluent-future.netlify.app/',
  },

  {
    id: 15, slug: 'polla-breve',
    title: 'Polla Breve: La Experiencia Definitiva del Mundial 2026',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1787967743/Polla_breve_pc_tqtrhq.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Interfaz web interactiva para que grupos de amigos, familias y compañeros de trabajo vivan el Mundial 2026 juntos — pronosticando partidos, compitiendo en rankings en vivo y ganando puntos con trivias y bonuses diarios.',
    client: 'Polla Breve',
    industry: 'Entretenimiento / Deportes',
    location: 'Colombia',
    myRole: 'Frontend Designer & UX Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Designer'],
    challenge: 'El reto era crear una plataforma que fuera más allá de un simple marcador de pronósticos: una experiencia completa de participación en el Mundial 2026 donde cada usuario tuviera su propio espacio autenticado, pudiera ver su posición en el ranking en tiempo real, participar en trivias diarias, desbloquear bonuses y revisar estadísticas — todo con una interfaz intuitiva, rápida y diseñada para enganchar durante toda la duración del torneo.',
    process: {
      research: [
        'Definición de mecánicas de juego: pronósticos, puntos, bonuses y trivias',
        'User Flow de registro, autenticación y participación',
        'Arquitectura de la información por sección (partidos, ranking, trivias, perfil)',
        'Pruebas de usabilidad enfocadas en la rapidez del flujo de pronóstico',
      ],
      design: {
        activities: [
          'Diseño de mockups para Home, Ranking, Pronósticos, Trivias y Estadísticas',
          'Sistema de diseño con identidad visual de torneo (Mundial 2026)',
          'Diseño de componentes de ranking en vivo y tarjetas de partido',
          'Microinteracciones para pronósticos, puntuación y resultados',
        ],
        colors: ['#059669', '#ECFDF5'],
        typography: [
          { name: 'Sans moderna', usage: 'Interfaz general — claridad y velocidad de lectura' },
          { name: 'Display bold', usage: 'Puntuaciones, rankings y números destacados' },
        ],
      },
      development: {
        activities: [
          'Autenticación por usuario para sesiones individuales y personalizadas',
          'Perfil administrador para gestionar participantes, resultados y configuración del torneo',
          'Rankings en tiempo real actualizados con cada resultado',
          'Sistema de pronósticos por partido con cálculo automático de puntos',
          'Trivias diarias y bonuses por racha de aciertos',
          'Dashboard de estadísticas personales y comparativas',
          'Optimización de performance para picos de tráfico durante los partidos',
        ],
        stack: [
          { name: 'Vue.js', icon: 'fa-brands fa-vuejs' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
    },
    solution: {
      description: 'Se diseñó y desarrolló Polla Breve, una plataforma web interactiva para vivir el Mundial 2026 con autenticación individual por usuario, ranking en tiempo real, sistema de pronósticos con puntuación automática, trivias diarias, bonuses y dashboard de estadísticas — convirtiendo cada partido en una experiencia de competencia grupal que engancha de inicio a fin del torneo.',
    },
    results: [
      { value: 'Competencia grupal', metric: 'Grupos de amigos y compañeros viviendo el torneo juntos desde un solo link' },
      { value: 'Sin esfuerzo', metric: 'El admin carga resultados y el sistema actualiza puntos y rankings solo' },
      { value: 'Enganchados', metric: 'Trivias y bonuses diarios que mantienen la participación activa durante todo el Mundial' },
    ],
    liveUrl: 'https://pollabreve.online/',
  },

  {
    id: 16, slug: 'swea',
    title: 'Swea Fastighetsservice: Presencia Digital para Limpieza Profesional de Tejados en Estocolmo',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1779639507/Estocolmo_Portada_eqeqq9.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'One-page profesional que convierte visitantes en clientes desde el primer scroll — con formulario de contacto directo y WhatsApp integrado, diseñada para que el equipo de Swea gestione su contenido de forma completamente autónoma.',
    client: 'Swea Fastighetsservice',
    industry: 'Servicios del hogar / Limpieza de tejados',
    location: 'Estocolmo, Suecia',
    myRole: 'Frontend Designer & UX Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Designer'],
    challenge: 'Swea Fastighetsservice necesitaba una presencia digital que les permitiera competir en el mercado de Estocolmo: una empresa de limpieza profesional de tejados que llegaba a propietarios y administradores de edificios que buscan servicios de confianza. El reto era comunicar profesionalismo y experiencia desde el primer vistazo, facilitar el contacto inmediato — sin formularios complicados — y entregarles una herramienta que pudieran actualizar ellos mismos sin depender de un desarrollador cada vez que cambiara un precio, un servicio o una foto.',
    process: {
      research: [
        'Análisis del perfil de cliente: propietarios y administradores de edificios en Estocolmo',
        'User Flow de contacto y solicitud de presupuesto',
        'Arquitectura de la información para una one-page de alto impacto',
        'Benchmark de servicios similares en el mercado escandinavo',
      ],
      design: {
        activities: [
          'Diseño de mockup de one-page con jerarquía visual clara',
          'Secciones: servicios, proceso de trabajo, galería, testimonios y contacto',
          'Componente de formulario de presupuesto y botón de WhatsApp directo',
          'Adaptación de identidad visual al mercado escandinavo',
        ],
        colors: ['#22629F', '#C8913A'],
        typography: [
          { name: 'Sans moderna', usage: 'Toda la interfaz — claridad y confianza en mercado europeo' },
        ],
      },
      development: {
        activities: [
          'One-page construida con Astro + Vue.js para máxima velocidad de carga',
          'Dashboard personalizado para gestión autónoma de contenido (precios, servicios, fotos)',
          'Formulario de contacto y solicitud de presupuesto integrado',
          'Botón de contacto directo por WhatsApp para cierre rápido',
          'Optimización de rendimiento y SEO local para búsquedas en Estocolmo',
        ],
        stack: [
          { name: 'Astro', icon: 'fa-solid fa-rocket' },
          { name: 'Vue.js', icon: 'fa-brands fa-vuejs' },
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
    },
    solution: {
      description: 'Se diseñó y desarrolló una one-page profesional para Swea Fastighetsservice que comunica autoridad y confianza desde el primer scroll — presentando sus servicios de limpieza de tejados con claridad, facilitando el contacto inmediato vía formulario y WhatsApp, y entregando un dashboard personalizado que permite al equipo actualizar contenido de forma autónoma sin necesitar soporte técnico.',
    },
    results: [
      { value: 'Presencia', metric: 'De invisible a encontrable: web profesional en el mercado de Estocolmo' },
      { value: 'Contacto directo', metric: 'Formulario + WhatsApp para que el cliente llegue al cierre en un solo paso' },
      { value: 'Autonomía', metric: 'Dashboard propio para actualizar servicios, precios y fotos sin un dev' },
    ],
    liveUrl: 'https://sweafastighetsservice.se/',
  },

  {
    id: 17, slug: 'femme-naturelle',
    title: 'Femme Naturelle: De la Vitrina Digital al Agendamiento Automatizado',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1788217127/femme-book-pc_xvaooz.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'One-page elegante que presenta la propuesta de Femme Naturelle y guía a cada visitante por un paso a paso claro para agendar su cita — con confirmación automática al correo del cliente desde el primer contacto.',
    client: 'Femme Naturelle',
    industry: 'Belleza & Bienestar',
    location: 'Colombia',
    myRole: 'Frontend Designer & UX Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Developer'],
    challenge: 'Femme Naturelle necesitaba pasar de gestionar sus citas por WhatsApp y mensajes informales a tener una presencia web que comunicara la calidad y el cuidado de su propuesta desde el primer vistazo. El reto era diseñar una one-page que transmitiera la esencia de la marca — femenina, natural y cercana — y que al mismo tiempo guiara a cada visitante por un flujo de agendamiento claro y simple, asegurando que tanto la clienta como el negocio recibieran la confirmación de la cita de forma automática, sin depender de seguimientos manuales.',
    process: {
      research: [
        'Perfil de usuaria: mujer que busca tratamientos de belleza naturales y acceso fácil desde el celular',
        'User Flow del recorrido completo: conocer la marca → explorar servicios → agendar cita',
        'Arquitectura de la one-page para maximizar conversión en mobile',
      ],
      design: {
        activities: [
          'Diseño del mockup de one-page con identidad visual femenina y natural',
          'Secciones: hero, propuesta de valor, servicios, paso a paso de agendamiento y contacto',
          'Diseño del flujo de agendamiento en pasos simples y formulario de reserva',
          'Microinteracciones y transiciones suaves para una experiencia fluida',
        ],
        colors: ['#C800DE', '#4B004F', '#FAF8F9'],
        typography: [
          { name: 'Cormorant Garamond', usage: 'Títulos — elegancia y feminidad' },
          { name: 'Open Sans', usage: 'Texto — legibilidad y claridad' },
        ],
      },
      development: {
        activities: [
          'Maquetación en HTML, CSS y JS puro — sin dependencias de framework',
          'Paso a paso de agendamiento con validación en tiempo real',
          'Automatización de correo de confirmación para la clienta y para el negocio',
          'Diseño 100% responsivo optimizado para mobile-first',
          'Animaciones CSS y transiciones suaves al hacer scroll',
        ],
        stack: [
          { name: 'HTML', icon: 'fa-brands fa-html5' },
          { name: 'CSS', icon: 'fa-brands fa-css3' },
          { name: 'JS', icon: 'fa-brands fa-js' },
        ],
      },
    },
    solution: {
      description: 'Se diseñó y desarrolló una one-page para Femme Naturelle que combina una presentación cuidada de la marca con un flujo de agendamiento en pasos simples: la clienta elige el servicio, selecciona fecha y hora, completa sus datos y recibe automáticamente un correo de confirmación — mientras el negocio también es notificado al instante. Sin llamadas, sin mensajes de seguimiento, sin fricciones.',
    },
    results: [
      { value: 'Automatizado', metric: 'Citas confirmadas al correo sin intervención manual del negocio' },
      { value: 'Simple', metric: 'Flujo en pasos claros que cualquier clienta puede completar desde el celular' },
      { value: 'Profesional', metric: 'Presencia digital que refleja la calidad y la esencia de la marca' },
    ],
    liveUrl: 'https://femmenaturelle.online/',
  },

  {
    id: 18, slug: 'reservas-spa',
    title: 'Reservas SPA: Del Agendamiento Manual a la Automatización Total',
    image: 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1788220191/spa-book-pc_muqees.jpg',
    roles: ['UX Research', 'UI Design', 'Frontend Development'],
    keyAchievement: 'Web app de reservas que elimina la gestión manual: el cliente reserva online, recibe confirmación automática por correo y el centro gestiona todo desde un dashboard propio conectado a Google Calendar.',
    client: 'spa-studio.online',
    industry: 'Belleza & Bienestar',
    location: 'Colombia',
    myRole: 'Frontend Designer & UX Designer',
    responsibilities: ['UX Research', 'UI Design', 'Frontend Developer'],
    challenge: 'El centro de estética gestionaba todas sus reservas por WhatsApp y llamadas, lo que generaba confusiones, dobles reservas y tiempo perdido en coordinación manual. Necesitaban una solución digital que permitiera reservar en cualquier momento, confirmara automáticamente la cita por correo y le diera al centro una vista clara de su agenda — sincronizada con Google Calendar para no perder ninguna reserva.',
    process: {
      research: [
        'Mapeo del flujo actual de reservas: desde WhatsApp hasta la confirmación manual',
        'Identificación de fricciones: dobles reservas, olvidos y ausencia de confirmaciones automáticas',
        'Diseño del user journey optimizado para cliente y para el administrador del centro',
      ],
      design: {
        activities: [
          'Flujo de reserva en pasos simples: servicio → fecha/hora → datos → confirmación',
          'Dashboard para el centro: vista de reservas del día, semana y gestión de disponibilidad',
          'Interfaz mobile-first para que cualquier cliente pueda reservar desde el celular',
          'Microinteracciones y feedback visual en cada paso del proceso',
        ],
        colors: ['#716FCD', '#FFF4F1', '#FD876E'],
        typography: [
          { name: 'Poppins', usage: 'Títulos — moderno y limpio' },
          { name: 'Inter', usage: 'Texto — legibilidad y claridad' },
        ],
      },
      development: {
        activities: [
          'Web app en Vue 3 + Vite con JavaScript — interfaz rápida y reactiva',
          'Sistema de reservas con validación de disponibilidad en tiempo real',
          'Envío automático de correo de confirmación al cliente y al centro con los detalles de la cita',
          'Dashboard para el centro: listado de reservas, estados y acciones de gestión',
          'Integración con Google Calendar para sincronizar cada nueva reserva automáticamente',
          'Diseño responsive optimizado para mobile-first',
        ],
        stack: [
          { name: 'Vue.js', icon: 'fa-brands fa-vuejs' },
          { name: 'Vite', icon: 'fa-solid fa-bolt' },
          { name: 'JavaScript', icon: 'fa-brands fa-js' },
        ],
      },
    },
    solution: {
      description: 'Se diseñó y desarrolló una web app de reservas completa: el cliente elige el servicio, selecciona fecha y hora disponible, completa sus datos y recibe automáticamente una confirmación por correo — mientras el centro recibe la misma notificación y puede verla al instante en su dashboard y en Google Calendar. Sin llamadas, sin confusiones, sin tiempo perdido en coordinación manual.',
    },
    results: [
      { value: 'Automatizado', metric: 'Confirmaciones por correo al cliente y al centro sin intervención manual' },
      { value: 'Organizado', metric: 'Dashboard propio con visibilidad total de las reservas del día' },
      { value: 'Sincronizado', metric: 'Agenda conectada a Google Calendar para una gestión sin duplicados' },
    ],
    liveUrl: 'https://spa-studio.online/',
  }
]

const projectSlug = computed(() => route.params.slug as string)

// Orden de galería: misma secuencia que Projects.vue
const galleryOrder = [1, 15, 3, 2, 14, 4, 12, 6, 8, 7, 10, 16, 13, 5, 9, 11, 17, 18]
const sortedResults = [...results].sort((a, b) => galleryOrder.indexOf(a.id) - galleryOrder.indexOf(b.id))

const goBack = () => {
  router.push('/projects')
}

const previousProject = () => {
  const currentIndex = sortedResults.findIndex(p => p.slug === projectSlug.value)
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : sortedResults.length - 1
  const prevSlug = sortedResults[prevIndex].slug
  router.push(`/project/${prevSlug}`)
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

const nextProject = () => {
  const currentIndex = sortedResults.findIndex(p => p.slug === projectSlug.value)
  const nextIndex = (currentIndex + 1) % sortedResults.length
  const nextSlug = sortedResults[nextIndex].slug
  router.push(`/project/${nextSlug}`)
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

const viewProject = () => {
  if (currentProject.value?.liveUrl) {
    window.open(currentProject.value.liveUrl, '_blank')
  }
}

onMounted(() => {
  currentProject.value = results.find(p => p.slug === projectSlug.value) || null
})

// Watch for route changes to update current project
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    currentProject.value = results.find(p => p.slug === (newSlug as string)) || null
  }
})
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
  overflow-y: auto;
}

/* Top Navigation */
.top-navigation-static {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
}

.back-to-gallery-btn {
  display: flex;
  align-items: center;
  gap: 0px;
  padding: 0px;
  background: #4831D4;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(72, 49, 212, 0.3);
  position: relative;
  overflow: hidden;
  min-height: 56px;
}

.back-to-gallery-btn span {
  padding: 1rem 1.5rem;
  display: block;
  flex-grow: 1;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.back-to-gallery-btn .arrow-icon {
  background: #CCF381;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  min-width: 56px;
  min-height: 56px;
}

.back-to-gallery-btn .arrow-icon svg {
  width: 20px;
  height: 20px;
  color: #4831D4;
  transition: transform 0.3s ease;
}

.back-to-gallery-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(72, 49, 212, 0.4);
}

.back-to-gallery-btn:hover .arrow-icon {
  background: #B8E85C;
  transform: scale(1.05);
}

.back-to-gallery-btn:hover .arrow-icon svg {
  transform: translateX(-2px);
}

/* Close Button X */
.close-button-x {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.close-button-x:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 2rem;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.7) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 2rem 1rem;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #CCF381, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(204, 243, 129, 0.3);
}

.meta-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(204, 243, 129, 0.2);
  border-radius: 50%;
  color: #CCF381;
}

.meta-item-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.9rem;
  opacity: 0.7;
  text-transform: capitalize;
  letter-spacing: 0.1em;
}

.meta-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #CCF381;
}

/* Sections */
.section {
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #CCF381;
  text-align: center;
}

.section-content {
  font-size: 1.2rem;
  line-height: 1.8;
  opacity: 0.9;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

/* Challenge Section */
.challenge-section {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 2rem auto;
  max-width: 1200px;
  border: 1px solid rgba(204, 243, 129, 0.2);
}

/* Process Section */
.process-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: 2rem auto;
  max-width: 1200px;
}

.process-step {
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(204, 243, 129, 0.2);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.step-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  background: rgba(204, 243, 129, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #CCF381;
  margin: 0;
}

.step-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.step-list li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  opacity: 0.9;
}

.step-list li::before {
  content: '•';
  color: #CCF381;
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Design Details */
.design-details {
  margin-top: 2rem;
}

.detail-group {
  margin-bottom: 2rem;
}

.detail-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #CCF381;
}

.color-palette {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.color-swatch {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.typography-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.typography-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.font-name {
  font-weight: 600;
  color: #CCF381;
}

.font-usage {
  opacity: 0.8;
  font-size: 0.9rem;
}

.tech-stack {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(204, 243, 129, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(204, 243, 129, 0.3);
}

.tech-item i {
  font-size: 1.2rem;
  color: #CCF381;
}

/* Estilos para Marketing */
.marketing-channels {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.channel-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.channel-item:hover {
  background: rgba(204, 243, 129, 0.1);
  border-color: rgba(204, 243, 129, 0.3);
}

.channel-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(204, 243, 129, 0.1);
  border-radius: 8px;
}

.channel-icon i {
  font-size: 1.2rem;
  color: #CCF381;
}

.channel-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.channel-name {
  font-weight: 600;
  color: #CCF381;
  font-size: 0.95rem;
}

.channel-description {
  opacity: 0.8;
  font-size: 0.85rem;
  color: #ffffff;
}

.marketing-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.marketing-result-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: rgba(204, 243, 129, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(204, 243, 129, 0.2);
}

.result-value {
  font-size: 2rem;
  font-weight: 700;
  color: #CCF381;
  display: block;
  margin-bottom: 0.5rem;
}

.result-label {
  font-size: 0.9rem;
  opacity: 0.8;
  color: #ffffff;
}

/* Solution Section */
.solution-section {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 2rem auto;
  max-width: 1200px;
  border: 1px solid rgba(204, 243, 129, 0.2);
}

.solution-content {
  text-align: center;
}

.solution-demo {
  margin-bottom: 2rem;
}

.solution-gif {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.solution-description {
  font-size: 1.1rem;
  line-height: 1.7;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
}

/* Results Section */
.results-section {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin: 2rem auto;
  max-width: 1200px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.result-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(204, 243, 129, 0.3);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.result-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #CCF381;
  margin-bottom: 0.5rem;
}

.result-metric {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.4;
}

/* Solution Gallery */
.solution-gallery {
  margin-bottom: 2rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.gallery-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-image-container {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #4831D4;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.gallery-caption {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: #CCF381;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(204, 243, 129, 0.3);
}

/* Bottom Fixed Navigation */
.bottom-navigation {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1rem 2rem;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 100;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  white-space: nowrap;
}

.nav-btn.primary {
  background: #4831D4;
  color: white;
  box-shadow: 0 4px 15px rgba(72, 49, 212, 0.3);
}

.nav-btn.primary:hover {
  background: #3a2aa0;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(72, 49, 212, 0.4);
}

.nav-btn.secondary {
  background: transparent;
  color: #4831D4;
  border: none;
  font-weight: 600;
}

.nav-btn.secondary:hover {
  background: rgba(72, 49, 212, 0.1);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-meta {
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
  }
  
  .meta-item {
    flex-direction: column;
    text-align: center;
    padding: 0.75rem 1rem;
  }
  
  .meta-item-content {
    align-items: center;
  }
  
  .section {
    padding: 2rem 0.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .process-step {
    padding: 1.5rem;
  }
  
  .color-palette {
    justify-content: center;
  }
  
  .tech-stack {
    justify-content: center;
  }
  
  .bottom-navigation {
    left: 1rem;
    right: 1rem;
    transform: none;
    padding: 0.75rem 1rem;
    gap: 0.5rem;
    border-radius: 25px;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .challenge-section,
  .process-section,
  .solution-section,
  .results-section {
    margin: 1rem auto;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .result-value {
    font-size: 2rem;
  }
  
  .nav-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .nav-btn span {
    display: none;
  }
  
  .back-to-gallery-btn > span {
    display: none;
  }
  
  .back-to-gallery-btn {
    padding: 0px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    justify-content: center;
  }
  
  .back-to-gallery-btn .arrow-icon {
    border-radius: 50%;
  }
}
</style>