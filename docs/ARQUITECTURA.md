# Arquitectura de Cressara

Este documento explica cómo está organizado el proyecto, qué función cumple cada parte y qué se eliminó durante la limpieza de julio de 2026.

## Vista general

```text
CRESSARA/
├── api/                    Entrada de FastAPI para Vercel
├── backend/                API, autenticación y persistencia
├── docs/                   Documentación técnica y funcional
├── frontend/               Aplicación React
├── requirements.txt        Dependencias Python para Vercel
└── vercel.json             Enrutamiento general del despliegue
```

## Frontend

El frontend usa React, Vite y Tailwind CSS. `src/index.jsx` inicia React y `src/App.jsx` define las rutas.

### Páginas

- `pages/public/`: páginas visibles para cualquier visitante.
  - `Home.jsx`: portada, presentación, contenido destacado y contacto.
  - `Comunidad.jsx`: información e inscripción a Cressara Club.
  - `Nosotros.jsx`: misión, filosofía y presentación de la marca.
  - `NotFound.jsx`: respuesta para rutas que no existen.
- `pages/legal/`: documentos legales públicos.
  - `AvisoPrivacidad.jsx`: tratamiento de datos y derechos ARCO.
  - `TerminosCondiciones.jsx`: condiciones de uso del sitio.
- `pages/admin/`: interfaz privada para administrar el catálogo.
  - `AdminLogin.jsx`: inicio de sesión.
  - `AdminDashboard.jsx`: creación, edición y eliminación de cursos.

### Componentes

- `components/layout/`: estructura compartida entre páginas.
  - `Navbar.jsx`: navegación principal y menú móvil.
  - `Footer.jsx`: contacto, enlaces legales y redes sociales.
  - `BrandLogo.jsx`: representación reutilizable del logotipo.
- `components/content/`: bloques editoriales reutilizables.
  - `SocialLinks.jsx`: catálogo y presentación de redes sociales.
  - `VideoPreview.jsx`: vista previa y apertura de videos externos.
- `components/ui/`: primitivas visuales utilizadas por el panel administrativo. Se conservaron únicamente las que tienen una importación real.

### Funcionalidades y servicios

- `features/auth/AuthContext.jsx`: mantiene la sesión disponible para toda la aplicación.
- `features/auth/ProtectedRoute.jsx`: evita mostrar el panel sin una sesión válida.
- `services/api.js`: configura Axios y normaliza errores enviados por FastAPI.
- `services/contact.js`: centraliza correo, WhatsApp y enlaces de contacto.
- `lib/utils.js`: combina clases CSS utilizadas por los componentes UI.

### Estilos y configuración

- `index.css`: estilos globales, variables visuales y tipografías.
- `App.css`: ajustes mínimos del contenedor principal.
- `tailwind.config.js`: colores, tipografías y animaciones de marca.
- `vite.config.cjs`: alias `@`, servidor local y construcción del frontend.
- `components.json`: configuración para mantener componentes compatibles con shadcn/ui.

## Backend

`backend/server.py` contiene la API FastAPI actual. Está dividido internamente en secciones claramente marcadas:

1. lectura y validación del entorno;
2. conexión e inicialización de MongoDB;
3. creación de la aplicación y middleware;
4. autenticación mediante JWT y cookie segura;
5. modelos de entrada y salida;
6. endpoints de autenticación y cursos;
7. comprobaciones de salud;
8. datos iniciales y ciclo de vida.

`api/index.py` adapta esa aplicación al entorno serverless de Vercel. `backend/tests/` contiene las pruebas de integración de la API.

## Cambios realizados durante la limpieza

- Las páginas se agruparon por público, legal y administración.
- Los componentes se separaron en layout, contenido y UI.
- Autenticación y servicios salieron de carpetas genéricas para mostrar claramente su responsabilidad.
- La documentación se centralizó en `docs/`.
- Se eliminaron las páginas antiguas de cursos y su componente sin uso.
- Se eliminaron configuraciones de Create React App, CRACO y Webpack después de confirmar que el proyecto usa Vite.
- Se eliminaron componentes UI nunca importados, archivos vacíos, reportes generados y configuraciones duplicadas.
- Las dependencias npm bajaron de aproximadamente 1,539 a 215 y la auditoría quedó en cero vulnerabilidades conocidas.

## Cómo seguir agregando código

- Una página pública nueva va en `pages/public/`.
- Una función privada del panel va en `pages/admin/` o en una nueva carpeta dentro de `features/` si incluye estado o lógica reutilizable.
- Un bloque visual reutilizable va en `components/content/`.
- Un elemento estructural compartido va en `components/layout/`.
- Una integración externa o cliente HTTP va en `services/`.
- No se debe agregar una dependencia antes de comprobar que las herramientas actuales no cubren la necesidad.

## Verificación

Desde `frontend/`:

```bash
npm run build
npm audit
```

La construcción debe terminar sin errores y la auditoría debe reportar cero vulnerabilidades. El aviso actual sobre un bloque JavaScript mayor de 500 kB es un trabajo de rendimiento pendiente, no un error de compilación.
