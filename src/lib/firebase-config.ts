// src/lib/firebase-config.ts

// Estas credenciales son seguras para el frontend porque son públicas.
// ¡NUNCA incluyas claves privadas de servicio aquí!

// Debug: Verificar variables de entorno
console.log("🔍 Debug - Variables de entorno:");
console.log("PUBLIC_FIREBASE_API_KEY:", import.meta.env.PUBLIC_FIREBASE_API_KEY);
console.log("PUBLIC_FIREBASE_AUTH_DOMAIN:", import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log("PUBLIC_FIREBASE_PROJECT_ID:", import.meta.env.PUBLIC_FIREBASE_PROJECT_ID);
console.log("PUBLIC_FIREBASE_STORAGE_BUCKET:", import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET);
console.log("PUBLIC_FIREBASE_MESSAGING_SENDER_ID:", import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
console.log("PUBLIC_FIREBASE_APP_ID:", import.meta.env.PUBLIC_FIREBASE_APP_ID);

export const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// Debug: Verificar configuración final
console.log("🔧 Firebase Config:", firebaseConfig);
console.log("🔧 Project ID específico:", firebaseConfig.projectId);
console.log("🔧 Storage Bucket específico:", firebaseConfig.storageBucket);
