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

### Notas importantes:

- **NUNCA** subas el archivo `.env` al repositorio
- El archivo `.env` ya está incluido en `.gitignore`
- Usa el archivo `env.example` como plantilla
- Todas las variables deben comenzar con `PUBLIC_` para que Astro las reconozca en el cliente

### Verificación:

Después de configurar las variables de entorno, reinicia el servidor de desarrollo para que los cambios surtan efecto.
