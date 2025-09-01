# Configuración de Variables de Entorno

## Firebase Configuration

Para configurar las credenciales de Firebase, sigue estos pasos:

1. **Crea un archivo `.env` en la raíz del proyecto**
2. **Copia el contenido del archivo `env.example` al archivo `.env`**
3. **Reemplaza los valores con tus propias credenciales de Firebase**

### Estructura del archivo `.env`:

```env
# Firebase Configuration
PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### Obtener las credenciales de Firebase:

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a Configuración del proyecto (ícono de engranaje)
4. En la pestaña "General", desplázate hacia abajo hasta "Tus apps"
5. Selecciona tu aplicación web o crea una nueva
6. Copia las credenciales de configuración

## 🚀 Configuración para Vercel (Producción)

### Variables de Entorno en Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a la pestaña "Settings"
4. En la sección "Environment Variables", agrega las siguientes variables:

```
PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
PUBLIC_FIREBASE_APP_ID=tu_app_id
```

5. **Importante**: Marca todas las variables como "Production", "Preview" y "Development"
6. Haz clic en "Save"
7. Redespliega tu aplicación

### Solución para Modales en Producción:

Si los modales de login/registro no funcionan en producción, verifica:

1. **Variables de entorno configuradas correctamente en Vercel**
2. **Firebase configurado para el dominio de producción**
3. **Reglas de Firestore permiten acceso desde el dominio de producción**

### Configuración de Firebase para Producción:

1. En la consola de Firebase, ve a "Authentication" > "Settings" > "Authorized domains"
2. Agrega tu dominio de Vercel (ej: `tu-proyecto.vercel.app`)
3. En Firestore, verifica que las reglas permitan acceso desde tu dominio

## 🔧 Notas importantes:

- **NUNCA** subas el archivo `.env` al repositorio
- El archivo `.env` ya está incluido en `.gitignore`
- Usa el archivo `env.example` como plantilla
- Todas las variables deben comenzar con `PUBLIC_` para que Astro las reconozca en el cliente
- En Vercel, las variables de entorno deben estar configuradas en el dashboard

### Verificación:

Después de configurar las variables de entorno:
1. **Desarrollo**: Reinicia el servidor de desarrollo
2. **Producción**: Redespliega la aplicación en Vercel

### Troubleshooting:

Si los modales siguen sin funcionar en producción:

1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Console"
3. Busca errores relacionados con Firebase o JavaScript
4. Verifica que las variables de entorno estén disponibles ejecutando en la consola:
   ```javascript
   console.log(import.meta.env.PUBLIC_FIREBASE_API_KEY);
   ```
