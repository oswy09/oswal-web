import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Google Analytics - Inicialización
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const app = createApp(App)
app.use(router)
app.mount('#root')

// Enviar página vista inicial después de que la app esté montada
router.isReady().then(() => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-QCNHFYS3S9', {
      page_path: router.currentRoute.value.fullPath,
      page_title: router.currentRoute.value.name || router.currentRoute.value.path
    });
  }
})