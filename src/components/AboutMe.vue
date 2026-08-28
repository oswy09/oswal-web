<template>
  <div class="portfolio-container">
    <!-- Floor Buttons -->
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

    <!-- Close Button -->
    <router-link to="/" class="close-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </router-link>

    <div class="about-section">
      <!-- Título principal al inicio -->
      <div class="hero-title-section">
        <p class="eyebrow">diseñador web · bogotá, colombia</p>
        <h1 class="main-title">Sobre <span class="title-accent">Mí</span></h1>

        <!-- Profile Image with rotating border -->
        <div class="profile-section">
          <div class="profile-container">
            <div class="profile-border"></div>
            <img
              src="https://res.cloudinary.com/ddqbnr9vo/image/upload/v1759897392/Oswal_jaimes_perfil_ozajmv.jpg"
              alt="Oswal Profile"
              class="profile-image"
            />
          </div>
        </div>

        <p class="main-description">
          ¿Quién soy? Fácil: el culpable de que te quedes mirando una web más de la cuenta. Soy Diseñador web, fanático de las interfaces que atrapan y de las experiencias que te hacen decir "wow" 😲(o al menos un "mmm, esto está bueno").
        </p>

        <!-- Stats strip -->
        <div class="stats-strip">
          <div class="stat-item">
            <span class="stat-num">12+</span>
            <span class="stat-lbl">años de</span>
            <span class="stat-lbl">experiencia</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">80+</span>
            <span class="stat-lbl">proyectos</span>
            <span class="stat-lbl">entregados</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">∞</span>
            <span class="stat-lbl">ideas</span>
            <span class="stat-lbl">en cola</span>
          </div>
        </div>
      </div>

      <!-- Sección principal con PC animado -->
      <div class="hero-section">
        <div class="content-wrapper">
          <div class="text-content">
            <p class="secondary-description">
              Entre UX, marketing y el arte de acomodar cada pixel, también me llevo bien con el código porque las
              ideas geniales necesitan un buen desarrollo para brillar en la web,
              Me gusta crear sitios web, interfaces y  productos o activos digitales.<br><br>
              
              ¿Sigues conmigo en este recorrido? 
              Genial, porque fuera de la pantalla también hay vida: me gusta dibujar, dejo que la música me acompañe,
              devorando algún libro o corriendo detrás de un balón (porque el fútbol también es parte de mi terapia creativa).
            </p>
          </div>
          
          <!-- PC Animado -->
          <div class="pc-container">
            <div class="pc-setup">
              <!-- Monitor -->
              <div class="monitor">
                <div class="monitor-stand"></div>
                <div class="monitor-base"></div>
                <div class="screen">
                  <div class="screen-content">
                    <!-- Interfaz animada con pestañas -->
                    <div class="interface-container">
                      <!-- Barra de pestañas -->
                      <div class="interface-tabs">
                        <div 
                          v-for="(tab, index) in interfaceTabs" 
                          :key="index"
                          class="interface-tab"
                          :class="{ active: currentTab === index }"
                        >
                          <div class="tab-icon" v-html="tab.icon"></div>
                          <span class="tab-title">{{ tab.title }}</span>
                        </div>
                      </div>
                      
                      <!-- Contenido de las pestañas -->
                      <div class="tab-content">
                        <!-- Pestaña UX/Figma -->
                        <div v-if="currentTab === 0" class="figma-interface">
                          <div class="figma-toolbar">
                            <div class="figma-tools">
                              <div class="tool-icon">🔲</div>
                              <div class="tool-icon">⭕</div>
                              <div class="tool-icon">📝</div>
                              <div class="tool-icon">🎨</div>
                            </div>
                          </div>
                          <div class="figma-canvas">
                            <div class="figma-frame">
                              <div class="figma-element header"></div>
                              <div class="figma-element sidebar"></div>
                              <div class="figma-element content"></div>
                              <div class="figma-element button"></div>
                            </div>
                            <div class="figma-properties">
                              <div class="property-item">
                                <span>Width:</span>
                                <span>320px</span>
                              </div>
                              <div class="property-item">
                                <span>Height:</span>
                                <span>240px</span>
                              </div>
                              <div class="property-item">
                                <span>Fill:</span>
                                <div class="color-swatch"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Pestaña Desarrollo/Vue.js -->
                        <div v-if="currentTab === 1" class="development-interface">
                          <div class="code-editor">
                            <div class="editor-header">
                              <div class="file-tabs">
                                <div class="file-tab active">App.vue</div>
                                <div class="file-tab">main.js</div>
                              </div>
                            </div>
                            <div class="editor-content">
                              <div class="line-numbers">
                                <div class="line-number">1</div>
                                <div class="line-number">2</div>
                                <div class="line-number">3</div>
                                <div class="line-number">4</div>
                                <div class="line-number">5</div>
                                <div class="line-number">6</div>
                                <div class="line-number">7</div>
                                <div class="line-number">8</div>
                                <div class="line-number">9</div>
                                <div class="line-number">10</div>
                              </div>
                              <div class="code-content">
                                <div class="code-line"><span class="token-tag">&lt;template&gt;</span></div>
                                <div class="code-line">  <span class="token-tag">&lt;div</span> <span class="token-attr">class</span>=<span class="token-string">"app"</span><span class="token-tag">&gt;</span></div>
                                <div class="code-line">    <span class="token-tag">&lt;h1&gt;</span><span class="token-text">{{ title }}</span><span class="token-tag">&lt;/h1&gt;</span></div>
                                <div class="code-line">    <span class="token-tag">&lt;button</span> <span class="token-attr">@click</span>=<span class="token-string">"increment"</span><span class="token-tag">&gt;</span></div>
                                <div class="code-line">      <span class="token-text">Count: {{ count }}</span></div>
                                <div class="code-line">    <span class="token-tag">&lt;/button&gt;</span></div>
                                <div class="code-line">  <span class="token-tag">&lt;/div&gt;</span></div>
                                <div class="code-line"><span class="token-tag">&lt;/template&gt;</span></div>
                                <div class="code-line"></div>
                                <div class="code-line"><span class="token-tag">&lt;script&gt;</span></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Pestaña WordPress -->
                        <div v-if="currentTab === 2" class="wordpress-interface">
                          <div class="wp-header">
                            <div class="wp-logo">W</div>
                            <div class="wp-menu">
                              <span>Dashboard</span>
                              <span>Posts</span>
                              <span>Pages</span>
                              <span>Plugins</span>
                            </div>
                          </div>
                          <div class="wp-content">
                            <div class="wp-sidebar">
                              <div class="wp-menu-item active">📝 Posts</div>
                              <div class="wp-menu-item">📄 Pages</div>
                              <div class="wp-menu-item">🎨 Appearance</div>
                              <div class="wp-menu-item">🔌 Plugins</div>
                            </div>
                            <div class="wp-main">
                              <div class="wp-post-item">
                                <div class="post-title">Mi nuevo artículo</div>
                                <div class="post-meta">Publicado hace 2 días</div>
                              </div>
                              <div class="wp-post-item">
                                <div class="post-title">Guía de desarrollo</div>
                                <div class="post-meta">Borrador</div>
                              </div>
                              <div class="wp-post-item">
                                <div class="post-title">Tutorial Vue.js</div>
                                <div class="post-meta">Programado</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Pestaña Marketing -->
                        <div v-if="currentTab === 3" class="marketing-interface">
                          <div class="marketing-header">
                            <h3>Campaign Analytics</h3>
                            <div class="date-range">Last 30 days</div>
                          </div>
                          <div class="marketing-stats">
                            <div class="stat-card">
                              <div class="stat-number">12.5K</div>
                              <div class="stat-label">Impressions</div>
                              <div class="stat-trend up">↗ +15%</div>
                            </div>
                            <div class="stat-card">
                              <div class="stat-number">847</div>
                              <div class="stat-label">Clicks</div>
                              <div class="stat-trend up">↗ +8%</div>
                            </div>
                            <div class="stat-card">
                              <div class="stat-number">6.8%</div>
                              <div class="stat-label">CTR</div>
                              <div class="stat-trend down">↘ -2%</div>
                            </div>
                          </div>
                          <div class="marketing-chart">
                            <div class="chart-bars">
                              <div class="chart-bar" style="height: 60%"></div>
                              <div class="chart-bar" style="height: 80%"></div>
                              <div class="chart-bar" style="height: 45%"></div>
                              <div class="chart-bar" style="height: 90%"></div>
                              <div class="chart-bar" style="height: 70%"></div>
                              <div class="chart-bar" style="height: 85%"></div>
                            </div>
                          </div>
                        </div>
                        <!-- Pestaña IA & Automatización -->
                        <div v-if="currentTab === 4" class="ai-interface">
                          <div class="ai-header">
                            <span class="ai-badge">🤖 IA</span>
                            <span class="ai-title">Automatización activa</span>
                            <span class="ai-live">● live</span>
                          </div>
                          <div class="ai-flow">
                            <div class="flow-node flow-trigger">
                              <span class="flow-emoji">📥</span>
                              <span class="flow-lbl">Lead</span>
                            </div>
                            <div class="flow-line"></div>
                            <div class="flow-node">
                              <span class="flow-emoji">💬</span>
                              <span class="flow-lbl">WhatsApp</span>
                            </div>
                            <div class="flow-line"></div>
                            <div class="flow-node">
                              <span class="flow-emoji">📧</span>
                              <span class="flow-lbl">Email</span>
                            </div>
                            <div class="flow-line"></div>
                            <div class="flow-node flow-success">
                              <span class="flow-emoji">✓</span>
                              <span class="flow-lbl">Conversión</span>
                            </div>
                          </div>
                          <div class="ai-metrics">
                            <div class="ai-metric">
                              <span class="am-num">847</span>
                              <span class="am-lbl">enviados</span>
                            </div>
                            <div class="ai-metric">
                              <span class="am-num">92%</span>
                              <span class="am-lbl">apertura</span>
                            </div>
                            <div class="ai-metric">
                              <span class="am-num">+38%</span>
                              <span class="am-lbl">conversión</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Teclado -->
              <div class="keyboard">
                <div class="keyboard-row">
                  <div class="key" v-for="n in 14" :key="'row1-' + n"></div>
                </div>
                <div class="keyboard-row">
                  <div class="key" v-for="n in 13" :key="'row2-' + n"></div>
                </div>
                <div class="keyboard-row">
                  <div class="key" v-for="n in 12" :key="'row3-' + n"></div>
                </div>
                <div class="keyboard-row">
                  <div class="key space-key"></div>
                </div>
              </div>
              
              <!-- Mouse -->
              <div class="mouse">
                <div class="mouse-button left"></div>
                <div class="mouse-button right"></div>
                <div class="mouse-scroll"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Secciones de contenido -->
      <div class="content-sections">
        <!-- Sección de habilidades -->
        <div class="skills-section">
          <h2>Mi Kit de habilidades</h2>
          <div class="skills-grid">
            <div
              v-for="skill in skills"
              :key="skill.id"
              class="skill-card"
              :style="{ '--accent': skill.color }"
            >
              <div class="skill-icon">{{ skill.icon }}</div>
              <h3>{{ skill.title }}</h3>
              <p>{{ skill.description }}</p>
              <div class="skill-tags">
                <span v-for="tag in skill.tags" :key="tag" class="skill-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección de contacto -->
        <div class="contact-section">
          <h2>¿Trabajamos Juntos?</h2>
          <p>Estoy siempre abierto a nuevos proyectos y colaboraciones interesantes.</p>
          <div class="contact-buttons">
            <button class="portfolio-button" @click="goToContact">
              <span>Contactarme</span>
              <div class="arrow-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
// import perfilImg from '@/assets/imagenes/Perfil_Oswal_jaimes_Web_Design.jpg';

const router = useRouter()
const currentFloor = ref(4)
const currentTab = ref(0)
let tabInterval: number | null = null

// Define variables for the code demo
const title = ref('Mi App')
const count = ref(0)

const skills = [
  {
    id: 1,
    icon: '🎨',
    title: 'Diseño web/UX',
    description: 'Interfaces intuitivas y experiencias de usuario que convierten visitas en clientes.',
    color: '#4831D4',
    tags: ['Figma', 'UX Research', 'Wireframes', 'Prototipos']
  },
  {
    id: 2,
    icon: '💻',
    title: 'Desarrollo web',
    description: 'De la idea al sitio en vivo: Vue.js, Astro, WordPress y animaciones que sorprenden.',
    color: '#059669',
    tags: ['Vue.js', 'Astro', 'WordPress', 'GSAP']
  },
  {
    id: 3,
    icon: '📣',
    title: 'Marketing Digital',
    description: 'Estrategias para crecer tu presencia digital, atraer tráfico y convertir.',
    color: '#d97706',
    tags: ['SEO', 'Landing pages', 'Analytics', 'Email']
  }
]

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

const interfaceTabs = [
  {
    title: 'UX Design',
    icon: '<i class="fab fa-figma" style="color: #F24E1E;"></i>'
  },
  {
    title: 'Desarrollo',
    icon: '<i class="fab fa-vuejs" style="color: #4FC08D;"></i>'
  },
  {
    title: 'WordPress',
    icon: '<i class="fab fa-wordpress" style="color: #21759B;"></i>'
  },
  {
    title: 'Marketing',
    icon: '<i class="fas fa-chart-line" style="color: #FF6B6B;"></i>'
  },
  {
    title: 'IA & Auto',
    icon: '<span style="font-size:12px">🤖</span>'
  }
]

const goToFloor = (section: Section) => {
  router.push(section.route)
}

const goToContact = () => {
  router.push('/contact')
}

const nextTab = () => {
  currentTab.value = (currentTab.value + 1) % interfaceTabs.length
}

onMounted(() => {
  // Cambiar pestaña cada 5 segundos
  tabInterval = setInterval(nextTab, 5000)
})

onUnmounted(() => {
  if (tabInterval) {
    clearInterval(tabInterval)
  }
})
</script>

<style scoped>
/* Contenedor principal del portfolio */
.portfolio-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
  background: #F4F9FC;
}

.about-section {
  width: 100%;
  overflow-y: auto;
  height: 100vh;
  scroll-behavior: smooth;
}

/* Sección del título principal */
.hero-title-section {
  padding: 4rem 2rem 2rem 2rem;
  text-align: center;
  background: #F4F9FC;
}

.hero-title-section .main-title {
  font-size: 5rem;
  font-weight: 900;
  color: #4831D4;
  margin: 0 0 2rem 0;
  line-height: 1.1;
}

.hero-title-section .main-description {
  font-size: 1.4rem;
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

/* Profile Section */
.profile-section {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.profile-container {
  width: 300px;
  height: 300px;
  position: relative;
}

.profile-border {
  position: absolute;
  inset: -15px;
  border-radius: 50%;
  background: linear-gradient(45deg, #4831D4, #CCF381);
  animation: rotate 4s linear infinite;
}

.profile-image {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 15px solid #F4F9FC;
  z-index: 1;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Sección hero con PC animado */
.hero-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  gap: 4rem;
}

.text-content {
  flex: 1;
  max-width: 500px;
}

.secondary-description {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* PC Container */
.pc-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  overflow: visible;
}

.pc-setup {
  position: relative;
  transform: rotateY(-15deg) rotateX(5deg);
  animation: float 6s ease-in-out infinite;
}

/* Monitor */
.monitor {
  position: relative;
  width: 400px;
  height: 280px;
  margin-bottom: 20px;
}

.screen {
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  border-radius: 8px;
  border: 8px solid #2a2a2a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
}

.screen-content {
  width: 100%;
  height: 100%;
  background: #f8f9fa;
  position: relative;
}

/* Interface Container */
.interface-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 11px;
}

/* Interface Tabs */
.interface-tabs {
  display: flex;
  background: #e9ecef;
  border-bottom: 1px solid #dee2e6;
  height: 35px;
}

.interface-tab {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  justify-content: center;
}

.interface-tab.active {
  background: white;
  border-bottom: 2px solid #4831D4;
}

.tab-icon {
  font-size: 12px;
}

.tab-title {
  font-size: 10px;
  font-weight: 500;
  color: #495057;
}

.interface-tab.active .tab-title {
  color: #4831D4;
}

/* Tab Content */
.tab-content {
  flex: 1;
  background: white;
  overflow: hidden;
}

/* Figma Interface */
.figma-interface {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f1f3f4;
}

.figma-toolbar {
  height: 30px;
  background: white;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.figma-tools {
  display: flex;
  gap: 8px;
}

.tool-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  font-size: 10px;
}

.tool-icon:hover {
  background: #f1f3f4;
}

.figma-canvas {
  flex: 1;
  display: flex;
  position: relative;
  background: #f8f9fa;
}

.figma-frame {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 120px;
  height: 80px;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.figma-element {
  border-radius: 2px;
}

.figma-element.header {
  height: 12px;
  background: #4831D4;
}

.figma-element.sidebar {
  height: 20px;
  width: 30px;
  background: #CCF381;
}

.figma-element.content {
  height: 20px;
  background: #e9ecef;
}

.figma-element.button {
  height: 8px;
  width: 40px;
  background: #ff6b6b;
}

.figma-properties {
  position: absolute;
  top: 20px;
  right: 10px;
  width: 80px;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  padding: 6px;
  font-size: 8px;
}

.property-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  color: #495057;
}

.color-swatch {
  width: 12px;
  height: 12px;
  background: #4831D4;
  border-radius: 2px;
  border: 1px solid #dee2e6;
}

/* Development Interface */
.development-interface {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
}

.code-editor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.editor-header {
  height: 30px;
  background: #2d2d30;
  border-bottom: 1px solid #3e3e42;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.file-tabs {
  display: flex;
  gap: 2px;
}

.file-tab {
  background: #3c3c3c;
  color: #cccccc;
  padding: 4px 12px;
  border-radius: 4px 4px 0 0;
  font-size: 10px;
  cursor: pointer;
}

.file-tab.active {
  background: #1e1e1e;
  color: #ffffff;
}

.editor-content {
  flex: 1;
  display: flex;
  background: #1e1e1e;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 10px;
  line-height: 1.4;
}

.line-numbers {
  background: #252526;
  color: #858585;
  padding: 8px 8px 8px 12px;
  border-right: 1px solid #3e3e42;
  user-select: none;
  min-width: 30px;
}

.line-number {
  text-align: right;
  padding-right: 8px;
}

.code-content {
  flex: 1;
  padding: 8px 12px;
  color: #d4d4d4;
  overflow: hidden;
}

.code-line {
  margin-bottom: 2px;
  white-space: nowrap;
}

.token-tag {
  color: #569cd6;
}

.token-attr {
  color: #92c5f8;
}

.token-string {
  color: #ce9178;
}

.token-text {
  color: #d4d4d4;
}

/* WordPress Interface */
.wordpress-interface {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f1f1f1;
}

.wp-header {
  height: 30px;
  background: #23282d;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 15px;
}

.wp-logo {
  width: 20px;
  height: 20px;
  background: #0073aa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 10px;
}

.wp-menu {
  display: flex;
  gap: 10px;
}

.wp-menu span {
  color: #a0a5aa;
  font-size: 9px;
  cursor: pointer;
}

.wp-menu span:hover {
  color: #00a0d2;
}

.wp-content {
  flex: 1;
  display: flex;
}

.wp-sidebar {
  width: 60px;
  background: #23282d;
  padding: 8px 4px;
}

.wp-menu-item {
  color: #a0a5aa;
  font-size: 8px;
  padding: 4px;
  margin-bottom: 2px;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
}

.wp-menu-item.active {
  background: #0073aa;
  color: white;
}

.wp-main {
  flex: 1;
  background: white;
  padding: 10px;
}

.wp-post-item {
  padding: 6px;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 4px;
}

.post-title {
  font-size: 10px;
  font-weight: 600;
  color: #23282d;
  margin-bottom: 2px;
}

.post-meta {
  font-size: 8px;
  color: #666;
}

/* Marketing Interface */
.marketing-interface {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  padding: 10px;
}

.marketing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.marketing-header h3 {
  font-size: 12px;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

.date-range {
  font-size: 8px;
  color: #6c757d;
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 10px;
}

.marketing-stats {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.stat-card {
  flex: 1;
  background: white;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.stat-number {
  font-size: 12px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 8px;
  color: #6c757d;
  margin-bottom: 2px;
}

.stat-trend {
  font-size: 7px;
  font-weight: 500;
}

.stat-trend.up {
  color: #28a745;
}

.stat-trend.down {
  color: #dc3545;
}

.marketing-chart {
  flex: 1;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: end;
}

.chart-bars {
  display: flex;
  gap: 4px;
  align-items: end;
  width: 100%;
  height: 60px;
}

.chart-bar {
  flex: 1;
  background: linear-gradient(to top, #4831D4, #6A5AE0);
  border-radius: 2px 2px 0 0;
  min-height: 10px;
  animation: growBar 2s ease-out;
}

@keyframes growBar {
  from { height: 0; }
  to { height: var(--bar-height, 50%); }
}

/* Monitor Stand */
.monitor-stand {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 15px;
  background: #666;
  border-radius: 0 0 8px 8px;
}

.monitor-base {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 10px;
  background: #555;
  border-radius: 20px;
}

/* Keyboard */
.keyboard {
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.keyboard-row {
  display: flex;
  gap: 3px;
  margin-bottom: 3px;
  justify-content: center;
}

.key {
  width: 18px;
  height: 18px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.space-key {
  width: 120px;
  height: 18px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Mouse */
.mouse {
  position: absolute;
  bottom: -70px;
  right: -50px;
  width: 40px;
  height: 60px;
  background: #f0f0f0;
  border-radius: 20px 20px 15px 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.mouse-button {
  position: absolute;
  top: 5px;
  width: 16px;
  height: 25px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px 8px 0 0;
}

.mouse-button.left { left: 3px; }
.mouse-button.right { right: 3px; }

.mouse-scroll {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 15px;
  background: #ddd;
  border-radius: 4px;
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: rotateY(-15deg) rotateX(5deg) translateY(0px); }
  50% { transform: rotateY(-15deg) rotateX(5deg) translateY(-10px); }
}

/* Content sections */
.content-sections {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.content-sections > div {
  margin-bottom: 6rem;
}

.content-sections h2 {
  font-size: 2.5rem;
  color: #4831D4;
  margin-bottom: 2rem;
  text-align: center;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.skill-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(72, 49, 212, 0.1);
}

.skill-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(72, 49, 212, 0.15);
}

.skill-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
}

.skill-card h3 {
  color: #4831D4;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
}

.skill-card p {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
}

/* Contact Section */
.contact-section {
  text-align: center;
  background: white;
  padding: 4rem 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.contact-section p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-buttons {
  display: flex;
  justify-content: center;
}

.portfolio-button {
  background: #4831D4;
  color: white;
  border: 1px solid #4831D4;
  padding: 0px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, color 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.portfolio-button span {
  padding: 1rem 1.5rem;
  display: block;
  flex-grow: 1;
}

.portfolio-button .arrow-icon {
  background: #CCF381;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.portfolio-button .arrow-icon svg {
  width: 20px;
  height: 20px;
  color: #4831D4;
}

.portfolio-button:hover {
  transform: translateY(-2px);
}

.portfolio-button:hover .arrow-icon {
  background: #c0e872;
}

.portfolio-button:hover .arrow-icon svg {
  transform: rotate(45deg);
}

/* Floor buttons and close button styles */
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

.close-button {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(72, 49, 212, 0.1);
  border: none;
  width: 3rem;
  height: 3rem;
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

/* Responsive Design */
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .pc-setup {
    transform: scale(0.8) rotateY(-15deg) rotateX(5deg);
  }
  
  .hero-title-section .main-title {
    font-size: 4rem;
  }
  
  .profile-container {
    width: 250px;
    height: 250px;
  }
  
  .pc-container {
    margin-bottom: 3rem;
    padding: 0 1rem;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
    height: 300px;
    overflow: hidden;
  }
}

@media (max-width: 768px) {
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

  .hero-title-section .main-title {
    font-size: 3rem;
  }
  
  .pc-setup {
    transform: scale(0.6) rotateY(-15deg) rotateX(5deg);
    max-width: 100%;
  }
  
  .contact-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .profile-container {
    width: 200px;
    height: 200px;
  }
  
  .pc-container {
    margin-bottom: 4rem;
    padding: 0 1rem;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
    touch-action: none;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
  }
  
  .pc-setup {
    transform: scale(0.6) rotateY(-15deg) rotateX(5deg);
    max-width: 100%;
  }
  
  .content-sections {
    padding: 2rem 1rem;
  }
  
  .content-sections h2 {
    margin-top: 2rem;
  }
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

  .hero-section {
    padding: 1rem;
  }
  
  .hero-title-section .main-title {
    font-size: 2.5rem;
  }
  
  .pc-setup {
    transform: scale(0.6) rotateY(-15deg) rotateX(5deg);
  }
  
  .content-sections {
    padding: 2rem 1rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-container {
    width: 180px;
    height: 180px;
  }
  
  .pc-container {
    margin-bottom: 5rem;
    padding: 0 0.5rem;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
    touch-action: none;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2rem;
  }
  
  .pc-setup {
    transform: scale(0.5) rotateY(-15deg) rotateX(5deg);
    max-width: 100%;
  }

  .content-sections h2 {
    margin-top: 3rem;
  }
}

/* ── AI & Automatización tab ───────────────────── */
.ai-interface {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #0f0f1a;
  padding: 10px;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.ai-header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ai-badge {
  background: rgba(72,49,212,0.3);
  color: #a78bfa;
  font-size: 8px;
  padding: 2px 6px;
  border-radius: 10px;
  border: 1px solid rgba(167,139,250,0.3);
  font-weight: 700;
}

.ai-title {
  font-size: 8px;
  color: #c4b5fd;
  font-weight: 600;
  flex: 1;
}

.ai-live {
  font-size: 7px;
  color: #4ade80;
  font-weight: 700;
  animation: aiPulse 1.5s ease-in-out infinite;
}

@keyframes aiPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
}

.ai-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px;
  padding: 5px 7px;
  min-width: 40px;
}

.flow-emoji { font-size: 13px; line-height: 1; }
.flow-lbl   { font-size: 6px; color: #9ca3af; white-space: nowrap; }

.flow-trigger {
  border-color: rgba(72,49,212,0.5);
  background: rgba(72,49,212,0.15);
}

.flow-success {
  border-color: rgba(74,222,128,0.5);
  background: rgba(74,222,128,0.1);
}

.flow-success .flow-emoji { color: #4ade80; font-size: 14px; font-weight: bold; }

.flow-line {
  flex-shrink: 0;
  height: 1px;
  width: 14px;
  background: linear-gradient(to right, rgba(72,49,212,0.6), rgba(74,222,128,0.6));
  position: relative;
}

.flow-line::after {
  content: '';
  position: absolute;
  right: -3px;
  top: -3px;
  width: 6px;
  height: 6px;
  background: rgba(74,222,128,0.4);
  border-radius: 50%;
  animation: flowDot 2s ease-in-out infinite;
}

@keyframes flowDot {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50%       { transform: scale(0.4); opacity: 0.2; }
}

.ai-metrics {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.ai-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 5px;
  padding: 4px 9px;
}

.am-num {
  font-size: 11px;
  font-weight: bold;
  color: #a78bfa;
  line-height: 1;
}

.am-lbl {
  font-size: 6px;
  color: #6b7280;
  margin-top: 2px;
}

/* ── Eyebrow ───────────────────────────────────── */
.eyebrow {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #4831D4;
  margin: 0 0 0.75rem;
  opacity: 0.75;
}

/* ── Title accent word ─────────────────────────── */
.title-accent {
  color: #CCF381;
  background: #4831D4;
  padding: 0 0.18em;
  border-radius: 5px;
}

/* ── Stats strip ───────────────────────────────── */
.stats-strip {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  margin: 2rem auto 0;
  padding: 1.4rem 2.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(72,49,212,0.08);
  max-width: 480px;
  border: 1px solid rgba(72,49,212,0.07);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
}

.stat-num {
  font-size: 2.2rem;
  font-weight: 900;
  color: #4831D4;
  line-height: 1;
}

.stat-lbl {
  font-size: 0.65rem;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.3;
}

.stat-divider {
  width: 1px;
  height: 48px;
  background: rgba(72,49,212,0.12);
}

/* ── Skill card accent border & tags ───────────── */
.skill-card {
  border-top: 3px solid var(--accent, #4831D4) !important;
}

.skill-card h3 {
  color: var(--accent, #4831D4) !important;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
  justify-content: center;
}

.skill-tag {
  background: color-mix(in srgb, var(--accent, #4831D4) 8%, transparent);
  color: var(--accent, #4831D4);
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.22rem 0.65rem;
  border-radius: 20px;
  border: 1px solid color-mix(in srgb, var(--accent, #4831D4) 18%, transparent);
}
</style>