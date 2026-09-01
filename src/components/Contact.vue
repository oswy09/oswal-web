<template>
  <div class="contact-container">
    <!-- Vertical Lines Background -->
    <div class="vertical-lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

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

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header Section -->
      <div class="header-section">
        <h1 class="main-title">Contacto</h1>
        <p class="subtitle">¿Listo para crear algo increíble juntos? Conectemos y hagamos realidad tu proyecto digital.</p>
      </div>

      <!-- Browser Container -->
      <div class="browser-container">
        <!-- Mac Browser Window -->
        <div class="mac-browser">
          <!-- Browser Header -->
          <div class="browser-header">
            <!-- Traffic Lights -->
            <div class="traffic-lights">
              <div class="traffic-light close"></div>
              <div class="traffic-light minimize"></div>
              <div class="traffic-light maximize"></div>
            </div>
            
            <!-- Address Bar -->
            <div class="address-bar">
              <div class="url-container">
                <div class="secure-icon">🔒</div>
                <input 
                  type="text" 
                  class="url-input" 
                  :value="searchQuery"
                  @input="updateSearch"
                  placeholder="Buscar..."
                  readonly
                />
                <div class="search-icon">🔍</div>
              </div>
            </div>

            <!-- Browser Controls -->
            <div class="browser-controls">
              <button class="control-btn">⟲</button>
              <button class="control-btn">⟳</button>
            </div>
          </div>

          <!-- Browser Content -->
          <div class="browser-content">
            <!-- Search Results Page -->
            <div class="search-results">
              <!-- Search Header -->
              <div class="search-header">
                <div class="search-logo">
                  <span class="logo-text">Buscar</span>
                </div>
                <div class="search-bar-main">
                  <input 
                    type="text" 
                    class="main-search-input" 
                    :value="searchQuery"
                    readonly
                  />
                  <button class="search-btn">🔍</button>
                </div>
              </div>

              <!-- Search Results -->
              <div class="results-container">
                <div class="results-info">
                  Aproximadamente 1 resultado: el diseñador web que estás buscando.🤭 (0.45 segundos)
                </div>

                <!-- Contact Card -->
                <div class="contact-card-browser">
                  <div class="contact-header">
                    <div class="contact-avatar">
                      <img src="https://res.cloudinary.com/ddqbnr9vo/image/upload/v1759897392/Oswal_jaimes_perfil_ozajmv.jpg" alt="Oswal" />
                    </div>
                    <div class="contact-info">
                      <h3>Oswal Jaimes</h3>
                      <p>Diseñador Web & UX/UI</p>
                    </div>
                  </div>
                  
                  <div class="contact-methods">
                    <a href="mailto:web@oswalstudio.com" class="contact-method email">
                      <div class="method-icon">📧</div>
                      <div class="method-info">
                        <span class="method-label">Email</span>
                        <span class="method-value">web@oswalstudio.com</span>
                      </div>
                    </a>

                    <a href="https://wa.me/573057502790" class="contact-method whatsapp" target="_blank">
                      <div class="method-icon">💬</div>
                      <div class="method-info">
                        <span class="method-label">WhatsApp</span>
                        <span class="method-value">+57 305 750 2790</span>
                      </div>
                    </a>

                    <a href="https://www.linkedin.com/in/oswaldo-jaimes/" class="contact-method linkedin" target="_blank">
                      <div class="method-icon">💼</div>
                      <div class="method-info">
                        <span class="method-label">LinkedIn</span>
                        <span class="method-value">linkedin.com/in/oswal</span>
                      </div>
                    </a>

                    <a href="https://www.instagram.com/oswal_jaimes/" class="contact-method instagram" target="_blank">
                      <div class="method-icon">📷</div>
                      <div class="method-info">
                        <span class="method-label">Instagram</span>
                        <span class="method-value">instagram.com/oswal</span>
                      </div>
                    </a>

                    <a href="https://www.tiktok.com/@oswal_jaimess" class="contact-method tiktok" target="_blank">
                      <div class="method-icon">🎵</div>
                      <div class="method-info">
                        <span class="method-label">TikTok</span>
                        <span class="method-value">Próximamente algo cool aquí ⏳</span>
                      </div>
                    </a>

                    <a href="https://dribbble.com/oswal" class="contact-method dribbble" target="_blank">
                      <div class="method-icon">🏀</div>
                      <div class="method-info">
                        <span class="method-label">Dribbble</span>
                        <span class="method-value">Próximamente algo cool aquí ⏳</span>
                      </div>
                    </a>

                    <a href="https://codepen.io/oswal" class="contact-method codepen" target="_blank">
                      <div class="method-icon">💻</div>
                      <div class="method-info">
                        <span class="method-label">CodePen</span>
                        <span class="method-value">Próximamente algo cool aquí ⏳</span>
                      </div>
                    </a>
                  </div>

                  <div class="contact-cta">
                    <button class="cta-button primary" @click="openWhatsApp">
                      <span>Iniciar Conversación</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </button>
                    <button class="cta-button secondary" @click="copyEmail">
                      <span>Copiar Email</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentFloor = ref(3)
const searchQuery = ref('diseño web')

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

const goToFloor = (section: Section) => {
  router.push(section.route)
}

const updateSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchQuery.value = target.value
}

const openWhatsApp = () => {
  window.open('https://wa.me/573057502790?text=Hola! Me interesa conocer más sobre tus servicios de diseño web.', '_blank')
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('contacto@oswal.com')
    // Aquí podrías agregar una notificación de éxito
    alert('Email copiado al portapapeles!')
  } catch (err) {
    console.error('Error al copiar email:', err)
  }
}

// Animación de escritura para la búsqueda
onMounted(() => {
  const text = 'diseño web'
  let index = 0
  searchQuery.value = ''
  
  const typeWriter = () => {
    if (index < text.length) {
      searchQuery.value += text.charAt(index)
      index++
      setTimeout(typeWriter, 150)
    }
  }
  
  setTimeout(typeWriter, 1000)
})

onUnmounted(() => {
})
</script>

<style scoped>
.contact-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
  background: #F4F9FC;
  overflow-y: auto;
  height: 100vh;
}

/* Vertical Lines Background */
.vertical-lines {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
  z-index: 0;
}

.line {
  width: 1px;
  height: 100%;
  background-color: rgba(72, 49, 212, 0.1);
}

/* Main Content */
.main-content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: flex-start;
  gap: 3rem;
}

/* Header Section */
.header-section {
  text-align: center;
  padding-top: 4rem;
  width: 100%;
  max-width: 800px;
}

.main-title {
  font-size: 4rem;
  font-weight: 900;
  color: #4831D4;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.3rem;
  color: #666;
  margin: 0 auto 1.5rem auto;
  line-height: 1.6;
  width: 100%;
  text-align: center;
  display: block;
  max-width: 100%;
  box-sizing: border-box;
}

/* Browser Container */
.browser-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 2rem auto;
  display: flex;
  justify-content: center;
}

.mac-browser {
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border: 1px solid #e1e5e9;
  margin: 0 auto;
}

/* Browser Header */
.browser-header {
  background: #f6f8fa;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid #e1e5e9;
}

.traffic-lights {
  display: flex;
  gap: 8px;
}

.traffic-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.traffic-light.close {
  background: #ff5f57;
}

.traffic-light.minimize {
  background: #ffbd2e;
}

.traffic-light.maximize {
  background: #28ca42;
}

.address-bar {
  flex: 1;
  max-width: 600px;
}

.url-container {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 8px 12px;
  gap: 8px;
}

.secure-icon {
  color: #28a745;
  font-size: 14px;
}

.url-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #24292f;
  background: transparent;
}

.search-icon {
  color: #656d76;
  font-size: 14px;
}

.browser-controls {
  display: flex;
  gap: 5px;
}

.control-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #656d76;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.control-btn:hover {
  background: #f3f4f6;
}

/* Browser Content */
.browser-content {
  background: #ffffff;
  min-height: 600px;
  padding: 0;
}

/* Search Results */
.search-results {
  padding: 20px;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.search-logo {
  font-size: 24px;
  font-weight: bold;
  color: #4831D4;
}

.search-bar-main {
  flex: 1;
  max-width: 500px;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 24px;
  padding: 8px 16px;
  gap: 10px;
}

.main-search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #333;
}

.search-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #4831D4;
  cursor: pointer;
}

/* Results Container */
.results-container {
  max-width: 800px;
}

.results-info {
  color: #70757a;
  font-size: 14px;
  margin-bottom: 20px;
}

/* Result Items */
.result-item {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.result-item:hover {
  background: #f8f9fa;
}

.result-item.featured {
  background: linear-gradient(135deg, #f8f4ff, #fff);
  border: 1px solid #e8e0ff;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.result-favicon {
  font-size: 16px;
}

.result-url {
  color: #1a73e8;
  font-size: 14px;
}

.result-title {
  color: #1a0dab;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 8px;
  cursor: pointer;
  line-height: 1.3;
}

.result-title:hover {
  text-decoration: underline;
}

.result-description {
  color: #4d5156;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.result-links {
  display: flex;
  gap: 15px;
}

.result-link {
  color: #1a73e8;
  text-decoration: none;
  font-size: 14px;
}

.result-link:hover {
  text-decoration: underline;
}

/* Contact Card Browser - Styled like external card */
.contact-card-browser {
  background: linear-gradient(135deg, #4831D4, #6A5AE0);
  color: white;
  padding: 30px;
  border-radius: 16px;
  margin: 20px 0;
  box-shadow: 0 10px 30px rgba(72, 49, 212, 0.3);
}

.contact-card-browser .contact-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.contact-card-browser .contact-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.contact-card-browser .contact-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-card-browser .contact-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0px;
  line-height: 32px;
}

.contact-card-browser .contact-info p {
  opacity: 0.9;
  line-height: 10px;
  font-size: 1rem;
}

.contact-card-browser .contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.contact-card-browser .contact-method {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
}

.contact-card-browser .contact-method:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.contact-card-browser .method-icon {
  font-size: 20px;
}

.contact-card-browser .method-info {
  display: flex;
  flex-direction: column;
}

.contact-card-browser .method-label {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 2px;
}

.contact-card-browser .method-value {
  font-size: 14px;
  font-weight: 500;
}

.contact-card-browser .contact-cta {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.contact-card-browser .cta-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 14px;
}

.contact-card-browser .cta-button.primary {
  background: #CCF381;
  color: #4831D4;
}

.contact-card-browser .cta-button.primary:hover {
  background: #b8e86d;
  transform: translateY(-2px);
}

.contact-card-browser .cta-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.contact-card-browser .cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.contact-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.contact-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.contact-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.contact-info p {
  opacity: 0.9;
  font-size: 1rem;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
}

.contact-method:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.method-icon {
  font-size: 20px;
}

.method-info {
  display: flex;
  flex-direction: column;
}

.method-label {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 2px;
}

.method-value {
  font-size: 14px;
  font-weight: 500;
}

.contact-cta {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.cta-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 14px;
}

.cta-button.primary {
  background: #CCF381;
  color: #4831D4;
}

.cta-button.primary:hover {
  background: #b8e86d;
  transform: translateY(-2px);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Floor Buttons */
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

/* Close Button */
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
  .main-title {
    font-size: 3rem;
  }
  
  .contact-methods {
    grid-template-columns: 1fr;
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

  .main-content {
    padding: 1rem;
  }
  
  .browser-container {
    max-width: 100%;
    padding: 0 0.5rem;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .browser-header {
    padding: 8px 15px;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .address-bar {
    order: 3;
    width: 100%;
  }
  
  .search-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .contact-header {
    flex-direction: column;
    text-align: center;
  }
  
  .contact-cta {
    justify-content: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-info h3 {
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  
  .contact-info p {
    line-height: 1.4;
    margin-bottom: 0.8rem;
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

  .main-title {
    font-size: 2rem;
  }
  
  .mac-browser {
    margin: 0 -1rem;
    border-radius: 0;
  }
  
  .browser-content {
    min-height: 500px;
  }
  
  .contact-card {
    margin: 0 -1rem;
    border-radius: 0;
  }
  
  .contact-info h3 {
    margin-bottom: 0.8rem;
    line-height: 1.4;
    font-size: 1.4rem;
  }
  
  .contact-info p {
    line-height: 1.5;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
}
</style>