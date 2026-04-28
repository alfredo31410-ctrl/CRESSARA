# CRESARA — PRD

## Original Problem Statement
Build a modern, complete web app for **CRESARA**, an applied emotional-education platform for Latin America. The site must communicate "Entender lo que sientes… para decidir mejor cómo vivir." Tone: profesional, profundo, claro — sin clichés de autoayuda. No es terapia, no es motivación: psicología aplicada a la vida real.

## Architecture
- **Frontend**: React 19 + React Router 7 + Tailwind + Shadcn UI
- **Backend**: FastAPI + Motor (MongoDB async)
- **Auth**: JWT-based email/password with httpOnly cookies (bcrypt)
- **DB**: MongoDB (`cresara_db`)
- **Design system**: Dark mode, Cabinet Grotesk + DM Sans, accent colors #1D3A5F (blue), #584266 (purple), #D1A7B4 (pink)

## User Personas
1. **Visitante público** (mujer, hombre o pareja LATAM) — busca claridad emocional sin clichés. Explora catálogo y se interesa en cursos por categoría.
2. **Admin CRESARA** — gestiona el catálogo: crea, edita, elimina y destaca cursos.

## Core Requirements (static)
- Public site: Home, Cursos catálogo, Detalle de Curso, Nosotros
- Admin: login + dashboard CRUD de cursos
- Cursos categorizados en: mujeres, hombres, relaciones
- Featured flag para destacar cursos
- Video embebido (YouTube/Vimeo) en detalle de curso

## What's Been Implemented (2026-04-28)
- ✅ Backend FastAPI con auth (login / me / logout) + httpOnly cookie
- ✅ CRUD de cursos en `/api/courses` (list+filtros, get, create, update, delete) con auth requerida para mutaciones
- ✅ Seed automático: admin (admin@cresara.com / cresara2026) + 9 cursos demo (3 por categoría)
- ✅ Indices MongoDB en `users.email` (unique), `courses.category`, `courses.featured`
- ✅ Frontend público: Home (hero cinematográfico, marquee, qué es CRESARA, enfoque mujeres/hombres/relaciones, cursos destacados, beneficios, CTA final), Cursos con filtros, Detalle con video embebido + Acceder/Comprar, Nosotros con misión y filosofía
- ✅ Admin: login con toast de error, dashboard con tabla, search, dialog crear/editar (todas las propiedades), confirm-delete, logout
- ✅ Diseño: Cabinet Grotesk en titulares, DM Sans en cuerpo, paleta dark elegante (#0A0A0C base + accents)
- ✅ Animaciones: fade-up staggered, marquee, hover transitions, skeleton loading
- ✅ Estados vacíos para catálogo y dashboard
- ✅ data-testid en todos los elementos interactivos
- ✅ Tests backend 22/22 pasando + tests E2E frontend pasando

## Prioritized Backlog

### P1 — Próximas iteraciones
- Integración Stripe para CTA "Comprar" (placeholders actualmente)
- Newsletter / lead magnet con Resend (incrementa conversión sin requerir compra)
- Página de inscripción / acceso al contenido del curso (player completo + módulos)
- SEO: meta tags por curso, OpenGraph, sitemap
- Subida de imagen de curso vía object storage (en lugar de URL manual)

### P2 — Nice to have
- Página de testimonios / casos
- Blog / artículos cortos para SEO orgánico
- Admin: rich text editor para "contenido adicional"
- Multi-admin con roles
- Analytics dashboard (cursos más vistos)

## Next Tasks
1. Decidir si activar Stripe ya o seguir con leads
2. Definir contenido real para los 9 cursos (videos, imágenes propias)
3. Conectar dominio personalizado y deployar
