// ===== LÓGICA DE FIREBASE (SEPARADA) =====
let firebaseInitialized = false;

export const initializeFirebase = async () => {
  try {
    console.log("🔥 Inicializando Firebase...");

    // Importar Firebase dinámicamente
    const { auth, db } = await import("../lib/firebase");
    const {
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      GoogleAuthProvider,
      signInWithPopup,
    } = await import("firebase/auth");
    const { doc, setDoc, getDoc } = await import("firebase/firestore");

    firebaseInitialized = true;
    console.log("✅ Firebase inicializado correctamente");

    // Configurar formularios y botones de Google
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const googleLoginBtn = document.getElementById("google-login-btn");
    const googleSignupBtn = document.getElementById("google-signup-btn");

    // Función de manejo del login
    const loginHandler = async (e: Event) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Login exitoso");
        window.location.href = "/dashboard";
      } catch (error: any) {
        console.error("Error de inicio de sesión:", error.code, error.message);
        let errorMessage = "Ocurrió un error inesperado.";
        if (error.code === "auth/user-not-found") {
          errorMessage = "No existe una cuenta con este correo electrónico.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Contraseña incorrecta.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "El correo electrónico no es válido.";
        }
        alert(errorMessage);
      }
    };

    // Función de manejo del registro
    const signupHandler = async (e: Event) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const name = formData.get("name") as string;

      if (!email || !password || !name) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      try {
        console.log("📊 Datos del formulario capturados correctamente");

        // 1. Crear usuario en Firebase Auth
        console.log("�� Creando usuario en Firebase Auth...");
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("✅ Usuario creado en Auth");

        // 2. Crear documento en Firestore
        console.log("📝 Preparando datos para Firestore...");
        const userDocRef = doc(db, "users", user.uid);
        const userData = {
          name: name,
          email: email,
          role: "normal",
          createdAt: new Date().toISOString(),
          activeBoardIds: [],
          uid: user.uid,
        };

        console.log("�� Datos a guardar en Firestore");

        console.log("�� Intentando guardar en Firestore...");
        await setDoc(userDocRef, userData);
        console.log("✅ Documento guardado exitosamente en Firestore");

        const modal = document.getElementById("signup-modal");
        if (modal) {
          modal.classList.remove("is-active");
          modal.style.display = "none";
        }
        window.location.href = "/dashboard";
      } catch (error: any) {
        console.error("❌ Error completo de registro:", error);
        console.error("❌ Código de error:", error.code);
        console.error("❌ Mensaje de error:", error.message);
        console.error("❌ Stack trace:", error.stack);

        let errorMessage = "Ocurrió un error inesperado.";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "El correo electrónico ya está en uso.";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "La contraseña es muy débil.";
        } else if (error.code === "permission-denied") {
          errorMessage = "Error de permisos en Firestore. Verifica las reglas.";
        } else if (error.code === "unavailable") {
          errorMessage = "Servicio no disponible. Intenta más tarde.";
        }
        alert(errorMessage);
      }
    };

    // Función para Google Sign In
    const googleSignInHandler = async () => {
      const provider = new GoogleAuthProvider();

      try {
        console.log("Iniciando login con Google");
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
          console.log("Usuario nuevo, creando documento en Firestore");
          const userData = {
            name: user.displayName || "Usuario",
            email: user.email,
            role: "normal",
            createdAt: new Date().toISOString(),
            activeBoardIds: [],
            uid: user.uid,
          };

          await setDoc(userDocRef, userData);
          console.log("Documento de Google guardado en Firestore");
        } else {
          console.log("Usuario existente, documento ya existe");
        }

        window.location.href = "/dashboard";
      } catch (error: any) {
        console.error("Error con Google Sign In:", error.code, error.message);
        alert("Error al iniciar sesión con Google.");
      }
    };

    // Configurar event listeners para Firebase
    if (loginForm) {
      loginForm.addEventListener("submit", loginHandler);
    }

    if (signupForm) {
      signupForm.addEventListener("submit", signupHandler);
    }

    if (googleLoginBtn) {
      googleLoginBtn.addEventListener("click", googleSignInHandler);
    }

    if (googleSignupBtn) {
      googleSignupBtn.addEventListener("click", googleSignInHandler);
    }
  } catch (error) {
    console.error("❌ Error inicializando Firebase:", error);
    console.log(
      "⚠️ Los modales funcionarán, pero la autenticación no estará disponible"
    );
  }
};
