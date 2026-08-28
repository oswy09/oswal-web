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
            Hola, soy Oswal
          </h1>
          <p class="subtitle">
            <span class="gradient-text">Diseño experiencias digitales</span> que nacen desde la idea, crecen con estrategia y se construyen con intención. <br><br>
            
            <span class="bold-text">Creo interfaces, sitios web y productos digitales</span> que conectan con las personas y ayudan a marcas a destacar con <span class="highlight-text">propósito y funcionalidad</span>.<br><br>
            
            <span class="accent-text">Cada proyecto es una oportunidad</span> de transformar ideas en <span class="underline-text">experiencias memorables</span>.
          </p>

          <!-- Portfolio Button -->
          <div class="button-wrapper">
            <button class="portfolio-button" @click="goToAbout">
              <span>Ver Portafolio</span>
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
              contact@oswal.com
            </a>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="21.17" y1="8" x2="12" y2="8"/>
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14"/>
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content - Profile Image -->
      <div class="profile-section">
        <div class="profile-container">
          <div class="profile-border"></div>
          <img 
            src="https://oswal.com.co/wp-content/uploads/2025/07/Oswal22.jpg" 
            alt="Profile" 
            class="profile-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAbout = () => {
  router.push('/about')
}
</script>

<style>
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

.subtitle {
  font-size: 1.2rem;
  color: #2d3748;
  font-weight: 500;
  max-width: 500px;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.gradient-text {
  background: linear-gradient(135deg, #4831D4, #6A5AE0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  font-size: 1.4em;
  text-shadow: none;
  position: relative;
}

.gradient-text::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #4831D4, #CCF381);
  border-radius: 2px;
  opacity: 0.8;
}

.highlight-text {
  background: linear-gradient(135deg, #4831D4, #6A5AE0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 1.3em;
  text-shadow: none;
  position: relative;
}

.highlight-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #CCF381, #4831D4);
  border-radius: 2px;
  opacity: 0.7;
}

.bold-text {
  font-weight: 800;
  color: #1a202c;
  font-size: 1.1em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.accent-text {
  color: #4831D4;
  font-weight: 700;
  font-size: 1.1em;
  text-shadow: 0 1px 3px rgba(72, 49, 212, 0.3);
  position: relative;
}

.accent-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: -4px;
  right: -4px;
  bottom: 0;
  background: rgba(204, 243, 129, 0.2);
  border-radius: 4px;
  z-index: -1;
}

.underline-text {
  position: relative;
  font-weight: 700;
  color: #2d3748;
}

.underline-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #CCF381, #4831D4);
  border-radius: 2px;
  opacity: 0.8;
}

.button-wrapper {
  margin-bottom: 3rem;
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
  transition: color 0.3s ease;
  transition: transform 0.2s ease-in-out, color 0.3s ease;
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
  gap: 1.5rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4831D4;
  text-decoration: none;
  font-size: 1rem;
}

.contact-link svg {
  width: 20px;
  height: 20px;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  color: #4831D4;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #CCF381;
}

.social-link svg {
  width: 24px;
  height: 24px;
}

.profile-section {
  position: relative;
}

.profile-container {
  width: 400px;
  height: 400px;
  position: relative;
}

.profile-border {
  position: absolute;
  inset: -20px;
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
  border: 20px solid #F4F9FC;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
    text-align: center;
  }

  .background-shape {
    display: none;
  }

  .contact-info {
    align-items: center;
  }

  .profile-container {
    width: 300px;
    height: 300px;
  }
}
</style>