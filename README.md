# DashUp - Gestor de Proyectos

<img src="public/images/logo.png" alt="DashUp Logo" width="200" height="auto" />

// ...existing code...

## 🚀 Demo en Vivo
[Ver Demo](https://gestor-proyectos-dash-up.vercel.app/)

## 📝 Descripción
DashUp es una aplicación de gestión de proyectos construida con Astro y Firebase, que permite a equipos organizar y dar seguimiento a sus proyectos de manera eficiente.

## 🛠️ Tecnologías
- [Astro](https://astro.build/) - Framework Web
- [Firebase](https://firebase.google.com/) - Backend y Autenticación
- [TailwindCSS](https://tailwindcss.com/) - Estilos
- [Vercel](https://vercel.com/) - Deployment

## 📋 Prerequisitos
- Node.js (versión 18 o superior)
- pnpm
- Cuenta de Firebase

## 🔧 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/yaquitadeveloper/gestor-proyectos-DashUp.git
cd gestor-proyectos-DashUp
```

2. Instalar dependencias
```bash
pnpm install
```

3. Ejecutar en modo desarrollo
```bash
pnpm run dev
```

## 📁 Estructura del Proyecto
```
gestor-proyectos-DashUp/
├── src/
│   ├── assets/
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/
│   │   ├── Compañias.astro
│   │   ├── Cta.astro
│   │   ├── Features.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── ModalSignup.astro
│   │   ├── Testimonial.astro
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   ├── firebase-config.ts
│   │   └── firebase.ts
│   ├── pages/
│   │   ├── dashboard.astro
│   │   └── index.astro
│   ├── scripts/
│   │   └── signupLogic.ts
│   └── styles/
│       └── global.css
└── public/
    ├── images/
    │   ├── mobile.png
    │   └── trello2.jpg
    └── favicon.svg
```

## 🚀 Scripts Disponibles
- `pnpm run dev` - Inicia el servidor de desarrollo
- `pnpm run build` - Construye el proyecto para producción
- `pnpm run preview` - Previsualiza la build de producción

## 🔒 Variables de Entorno
El proyecto usa las credenciales públicas de Firebase. Las credenciales están seguras para uso en frontend ya que:
- Son públicas por diseño
- La seguridad se maneja a través de las reglas de Firebase
- Los permisos se gestionan por roles de usuario

## 👥 Equipo
Proyecto desarrollado por un equipo de 3 desarrolladores, cada uno con roles específicos gestionados a través de Firebase Console.

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles

## 🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

---
Desarrollado con ❤️ por el equipo DashUp
