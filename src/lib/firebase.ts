// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Importa la configuración pública desde el nuevo archivo.
import { firebaseConfig } from "./firebase-config";

// Inicializa la app con la configuración importada.
const app = initializeApp(firebaseConfig);

// Exporta las instancias de los servicios.
export const auth = getAuth(app);
export const db = getFirestore(app);
