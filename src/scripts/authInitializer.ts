// ===== INICIALIZACIÓN =====
import { initializeModals } from './modalManager';
import { initializeFirebase } from './firebaseAuth';

const waitForDOM = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeModals();
      initializeFirebase();
    });
  } else {
    initializeModals();
    initializeFirebase();
  }
};

// Inicializar
waitForDOM();