// ===== LÓGICA DE MODALES (INDEPENDIENTE DE FIREBASE) =====
console.log("🚀 Iniciando lógica de modales...");

// Función para cambiar entre modales
export const switchModal = (fromModal: string, toModal: string) => {
  const from = document.getElementById(fromModal);
  const to = document.getElementById(toModal);
  if (from && to) {
    from.classList.remove('is-active');
    from.style.display = 'none';
    to.style.display = 'flex';
    to.classList.add('is-active');
  }
};

// Función para inicializar SOLO los modales (sin Firebase)
export const initializeModals = () => {
  console.log("🎯 Inicializando modales...");
  
  // Elementos de los modales
  const loginModal = document.getElementById('login-modal');
  const signupModal = document.getElementById('signup-modal');
  
  // Botones para abrir modales
  const openLoginBtns = document.querySelectorAll('#open-login-modal');
  const openSignupBtns = document.querySelectorAll('#open-signup-modal');
  
  // Botones para cerrar modales
  const closeLoginBtn = document.getElementById('close-login-modal');
  const closeSignupBtn = document.getElementById('close-signup-modal');
  
  // Botones para cambiar entre modales
  const switchToSignupBtn = document.getElementById('switch-to-signup');
  const switchToLoginBtn = document.getElementById('switch-to-login');

 

  // Abrir modal de login
  openLoginBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log("🔓 Abriendo modal de login");
      if (loginModal) {
        loginModal.style.display = 'flex';
        loginModal.classList.add('is-active');
      }
    });
  });

  // Abrir modal de registro
  openSignupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log("📝 Abriendo modal de registro");
      if (signupModal) {
        signupModal.style.display = 'flex';
        signupModal.classList.add('is-active');
      }
    });
  });

  // Cerrar modales
  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('is-active');
      loginModal.style.display = 'none';
    });
  }

  if (closeSignupBtn && signupModal) {
    closeSignupBtn.addEventListener('click', () => {
      signupModal.classList.remove('is-active');
      signupModal.style.display = 'none';
    });
  }

  // Cambiar entre modales
  if (switchToSignupBtn) {
    switchToSignupBtn.addEventListener('click', () => {
      switchModal('login-modal', 'signup-modal');
    });
  }

  if (switchToLoginBtn) {
    switchToLoginBtn.addEventListener('click', () => {
      switchModal('signup-modal', 'login-modal');
    });
  }

  // Cerrar modales al hacer clic fuera
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('is-active');
        loginModal.style.display = 'none';
      }
    });
  }

  if (signupModal) {
    signupModal.addEventListener('click', (e) => {
      if (e.target === signupModal) {
        signupModal.classList.remove('is-active');
        signupModal.style.display = 'none';
      }
    });
  }
  
  console.log("✅ Modales inicializados correctamente");
};