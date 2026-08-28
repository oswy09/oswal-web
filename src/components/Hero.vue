<template>
  <div class="hero">
    <!-- Vertical Lines Background -->
    <div class="vertical-lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <div class="main-content">
      <!-- Left Content -->
      <div class="content-left">
        <!-- Background Shape -->
        <div class="background-shape"></div>
        
        <!-- Content -->
        <div class="content-wrapper">
          <h1 class="title">
            <span class="title-stroke">Hola</span>, soy Oswal
          </h1>
          <p class="hero-tagline">
            <strong>Toda idea de negocio</strong> puede convertirse en un sistema que vende, atiende y crece.
          </p>
          <p class="hero-body">
            Yo te ayudo a llevarla ahí: de boceto a sistema, piso por piso.
          </p>
          <p class="hero-cta-hint">
            Sube al elevador y descubre cómo.
          </p>

          <!-- Portfolio Button -->
          <div class="button-wrapper">
            <button class="portfolio-button" @click="goToAbout">
              <span>Subir al Elevador</span>
              <div class="arrow-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </button>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <a href="mailto:contact@oswal.com" class="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              web@oswal.com.co
            </a>
            <div class="social-links">
              <!-- LinkedIn -->
              <a href="https://www.linkedin.com/in/oswaldo-jaimes/" target="_blank" class="social-link" aria-label="LinkedIn de Oswaldo Jaimes">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <!-- WhatsApp -->
              <a href="https://wa.me/573057502790" target="_blank" class="social-link" aria-label="Enviar mensaje de WhatsApp a Oswaldo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
              <!-- Instagram -->
              <a href="https://www.instagram.com/Oswal_Jaimes/" target="_blank" class="social-link" aria-label="Instagram de Oswaldo Jaimes">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content - Elevator Section (Desktop) -->
      <div class="elevator-section">
        <div class="elevator-wrapper">
          <div class="elevator-container">
            <!-- Floor Display -->
            <div class="floor-display">
              <div class="display-screen">
                <span class="floor-number"></span>
                <span class="floor-name">Inicio</span>
              </div>
            </div>

            <!-- Elevator Frame -->
            <div class="elevator-frame">
              <!-- Elevator Content -->
              <div class="elevator-content">
                <div class="elevator-inner">
                  <!-- Side Rails -->
                  <div class="elevator-rails">
                    <div class="rail left"></div>
                    <div class="rail right"></div>
                  </div>

                  <!-- Doors (closed) -->
                  <div class="doors">
                    <div class="door-frame left"></div>
                    <div class="door-frame right"></div>
                    <div class="door left">
                      <div class="door-handle"></div>
                      <div class="door-lines">
                        <div class="line"></div>
                        <div class="line"></div>
                      </div>
                    </div>
                    <div class="door right">
                      <div class="door-handle"></div>
                      <div class="door-lines">
                        <div class="line"></div>
                        <div class="line"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Floor Buttons beside elevator -->
          <div class="hero-floor-buttons">
            <div class="button-panel">
              <button
                v-for="floor in allFloors"
                :key="floor.number"
                class="floor-button"
              >
                <div class="button-light"></div>
                <span class="floor-num">{{ floor.number }}</span>
                <span class="floor-lbl">{{ floor.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Section for Mobile -->
      <div class="profile-section-mobile">
        <div class="profile-container">
          <div class="profile-border"></div>
          <img 
            src="https://res.cloudinary.com/ddqbnr9vo/image/upload/c_fill,w_400,h_400,f_webp,q_85,q_auto/v1757288490/Oswal_perfil_Webdesign.jpg"
            alt="Oswal Jaimes - Diseñador UX y Desarrollador Frontend" 
            class="profile-image"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const allFloors = [
  { number: 1, name: 'Servicios' },
  { number: 2, name: 'Proyectos' },
  { number: 3, name: 'Contacto' },
  { number: 4, name: 'Sobre mí' }
]

const goToAbout = () => {
  router.push('/services')
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  background-color: #F4F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.vertical-lines {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
}

.line {
  width: 1px;
  height: 100%;
  background-color: rgba(72, 49, 212, 0.1);
}

.main-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  position: relative;
  z-index: 1;
}

.content-left {
  flex: 1;
  position: relative;
}

.background-shape {
  position: absolute;
  width: 350px;
  height: 350px;
  background-color: #4831D4;
  opacity: 0.1;
  transform: rotate(45deg);
  top: -14px;
  left: 85px;
  border-radius: 40px;
  z-index: -1;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  color: #4831D4;
  margin-bottom: 1.5rem;
}

.title-stroke {
  -webkit-text-stroke: 2px #4831D4;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* Tagline — mensaje principal, nivel 2 */
.hero-tagline {
  font-size: 1.35rem;
  font-weight: 500;
  color: #2d3748;
  max-width: 480px;
  margin-bottom: 1rem;
  line-height: 1.55;
}

.hero-tagline strong {
  font-weight: 800;
  color: #1a1a2e;
}

/* Cuerpo — apoyo, nivel 3 */
.hero-body {
  font-size: 1rem;
  font-weight: 400;
  color: #718096;
  max-width: 460px;
  margin-bottom: 0.85rem;
  line-height: 1.6;
}

/* CTA hint — invitación, nivel 4 */
.hero-cta-hint {
  font-size: 0.92rem;
  font-weight: 500;
  color: #4831D4;
  max-width: 460px;
  margin-bottom: 2.2rem;
  letter-spacing: 0.01em;
}

.button-wrapper {
  margin-bottom: 2.5rem;
  display: inline-block;
}

.portfolio-button {
  background: #4831D4;
  color: #fff;
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
  transform: translateY(-3px);
}

.portfolio-button:hover .arrow-icon {
  background: #c0e872;
}

.portfolio-button:hover .arrow-icon svg {
  transform: rotate(45deg);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4831D4;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #6A5AE0;
}

.contact-link svg {
  width: 18px;
  height: 18px;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #4831D4;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #CCF381;
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.elevator-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.elevator-wrapper {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.elevator-container {
  position: relative;
  width: 320px;
  transition: transform 0.3s ease;
}

.elevator-container:hover {
  transform: scale(1.02);
}

/* Panel de pisos al lado del elevador */
.hero-floor-buttons {
  background: linear-gradient(to bottom, #2A2356, #1F1A40);
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.2),
    inset 0 2px 10px rgba(255, 255, 255, 0.05);
}

.hero-floor-buttons .button-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hero-floor-buttons .floor-button {
  width: 3.5rem;
  height: 3.5rem;
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

.hero-floor-buttons .floor-button.active {
  background: white;
  color: #4831D4;
  box-shadow:
    0 0 0 3px #4831D4,
    0 4px 15px rgba(0, 0, 0, 0.2);
}

.hero-floor-buttons .floor-button:hover {
  transform: scale(1.08);
}

.hero-floor-buttons .button-light {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.hero-floor-buttons .button-light.is-active {
  background: #CCF381;
  box-shadow: 0 0 8px #CCF381;
}

.hero-floor-buttons .floor-num {
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
}

.hero-floor-buttons .floor-lbl {
  font-size: 0.55rem;
  opacity: 0.85;
  line-height: 1.2;
  text-align: center;
  max-width: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.floor-display {
  position: absolute;
  top: -4.2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: #1a1a1a;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.display-screen {
  background: #000;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #FFD700;
  font-family: "Digital-7", monospace;
  font-size: 1.2rem;
  border: 1px solid #333;
  box-shadow:
    inset 0 0 10px rgba(255, 215, 0, 0.2),
    0 0 15px rgba(255, 215, 0, 0.1);
}

.elevator-frame {
  background: linear-gradient(145deg, #4831D4, #5D4EC7);
  padding: 1rem;
  border-radius: 1rem;
  height: 420px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.2),
    inset 0 2px 10px rgba(255, 255, 255, 0.1);
}

.elevator-content {
  background: #6A5AE0;
  height: calc(100% - 1rem);
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
}

.elevator-inner {
  background: #5D4EC7;
  height: 100%;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
}

.elevator-rails {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.rail {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.rail.left {
  left: 10px;
}

.rail.right {
  right: 10px;
}

.doors {
  position: absolute;
  inset: 0;
  display: flex;
}

.door-frame {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 8px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.door-frame.left {
  left: 0;
}

.door-frame.right {
  right: 0;
}

.door {
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, #4831D4, #5D4EC7);
  position: relative;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.door.left {
  transform-origin: left;
  border-right: 2px solid rgba(255, 255, 255, 0.1);
}

.door.right {
  transform-origin: right;
}

.door-handle {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.door.left .door-handle {
  right: 10px;
}

.door.right .door-handle {
  left: 10px;
}

.door-lines {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 40px;
}

.door-lines .line {
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}


/* Profile Section for Mobile */
.profile-section-mobile {
  display: none;
  justify-content: center;
  align-items: center;
}

.profile-container {
  width: 220px;
  height: 220px;
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

/* Media Queries */
@media (max-width: 1024px) {
  .hidden-desktop {
    display: block;
  }
  
  .main-content {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }

  .background-shape {
    display: none;
  }

  .contact-info {
    align-items: center;
  }

  .elevator-container {
    width: 280px;
  }

  .elevator-frame {
    height: 380px;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 4.2rem;
    line-height: 1.1;
  }

  .subtitle {
    font-size: 20px;
  }

  .accent-text {
    font-size: 25px;
  }

  .elevator-section {
    display: none;
  }

  .profile-section-mobile {
    display: flex;
  }

  .profile-container {
    width: 220px;
    height: 220px;
  }

  .portfolio-button {
    font-size: 0.9rem;
  }

  .portfolio-button span {
    padding: 0.8rem 1.2rem;
  }

  .portfolio-button .arrow-icon {
    padding: 0.6rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 3.8rem;
    line-height: 1.1;
  }

  .subtitle {
    font-size: 18px;
  }

  .accent-text {
    font-size: 22px;
  }

  .main-content {
    padding: 1rem;
  }

  .profile-container {
    width: 200px;
    height: 200px;
  }
}
</style>