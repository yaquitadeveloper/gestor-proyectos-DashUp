// src/scripts/headerManager.ts

// Función para esperar a que el DOM esté listo
function waitForDOM(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => resolve());
    } else {
      resolve();
    }
  });
}

// Función para obtener las iniciales del nombre
function getInitials(name: string): string {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Función para actualizar la información del usuario en el header
async function updateUserInfo(user: any): Promise<void> {
  try {
    console.log('👤 Actualizando información del usuario:', user.email);
    
    // Importar Firebase dinámicamente
    const { db } = await import("../lib/firebase");
    const { doc, getDoc } = await import("firebase/firestore");
    
    let displayName = user.displayName || user.email?.split('@')[0] || 'Usuario';
    let email = user.email || '';
    
    // Intentar obtener datos adicionales del usuario desde Firestore
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        displayName = userData.name || displayName;
        console.log('�� Datos obtenidos de Firestore:', userData);
      }
    } catch (firestoreError) {
      console.warn('⚠️ No se pudieron obtener datos de Firestore, usando datos de Auth:', firestoreError);
    }
    
    // Obtener elementos del DOM
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    const userInitialsElement = document.getElementById('userInitials');
    const userInitialsMenuElement = document.getElementById('userInitialsMenu');
    
    // Actualizar elementos del DOM
    if (userNameElement) userNameElement.textContent = displayName;
    if (userEmailElement) userEmailElement.textContent = email;
    
    const initials = getInitials(displayName);
    if (userInitialsElement) userInitialsElement.textContent = initials;
    if (userInitialsMenuElement) userInitialsMenuElement.textContent = initials;
    
    console.log('✅ Información del usuario actualizada:', { displayName, email, initials });
    
  } catch (error) {
    console.error('❌ Error al actualizar información del usuario:', error);
  }
}

// Función para cerrar sesión
async function handleLogout(): Promise<void> {
  try {
    console.log('�� Cerrando sesión...');
    const { signOut } = await import("firebase/auth");
    const { auth } = await import("../lib/firebase");
    
    await signOut(auth);
    window.location.href = "/";
  } catch (error) {
    console.error('❌ Error al cerrar sesión:', error);
    alert('Error al cerrar sesión. Intenta de nuevo.');
  }
}

// Función principal que se ejecuta cuando todo está listo
export async function initializeHeader(): Promise<void> {
  try {
    console.log('🚀 Inicializando header del dashboard...');
    
    // Esperar a que el DOM esté listo
    await waitForDOM();
    
    // Importar Firebase dinámicamente
    const { onAuthStateChanged } = await import("firebase/auth");
    const { auth } = await import("../lib/firebase");

    console.log('✅ Firebase importado correctamente');

    // Obtener elementos del DOM
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userMenu');
    const logoutBtn = document.getElementById('logoutBtn');

    // Verificar que todos los elementos existen
    if (!userMenuBtn || !userMenu || !logoutBtn) {
      console.error('❌ No se encontraron todos los elementos del DOM');
      return;
    }

    console.log('✅ Elementos del DOM encontrados');

    // Configurar event listeners
    userMenuBtn.addEventListener('click', function(e: Event) {
      e.stopPropagation();
      console.log('��️ Click en botón de menú');
      userMenu.classList.toggle('hidden');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e: Event) {
      if (!userMenu.contains(e.target as Node) && !userMenuBtn.contains(e.target as Node)) {
        userMenu.classList.add('hidden');
      }
    });

    // Event listener para cerrar sesión
    logoutBtn.addEventListener('click', function(e: Event) {
      e.preventDefault();
      console.log('🖱️ Click en cerrar sesión');
      handleLogout();
    });

    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('🔐 Usuario autenticado detectado:', user.email);
        updateUserInfo(user);
      } else {
        console.log('🔓 Usuario no autenticado');
      }
    });

    console.log('✅ Header del dashboard inicializado correctamente');

  } catch (error) {
    console.error('❌ Error inicializando header:', error);
  }
}