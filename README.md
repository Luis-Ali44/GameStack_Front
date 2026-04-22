# GameCenter — Frontend

> Plataforma web para gestionar partidas, torneos y compartir conocimiento entre jugadores.

**Demo en producción:** [game-stack-front.vercel.app](https://game-stack-front.vercel.app)

---

## Descripción

GameCenter es una plataforma orientada a jugadores de videojuegos, juegos de mesa y juegos de cartas. Permite registrar juegos, organizar partidas y torneos, compartir tips y estrategias, y consultar rankings por período.

Este repositorio corresponde al **frontend** de la aplicación, desarrollado con Next.js 16 y TypeScript bajo una arquitectura SOA con separación de responsabilidades en tres capas.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTE (Puerto 3000)                │
│              Next.js 16 · TypeScript · React 19         │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP / REST (proxy rewrites)
┌──────────────────────▼──────────────────────────────────┐
│                   SERVICIO (Puerto 4000)                │
│        Next.js API Routes · JWT · Zod · node-postgres   │
│           https://prueba-kohl-phi-76.vercel.app         │
└──────────────────────┬──────────────────────────────────┘
                       │ SQL
┌──────────────────────▼──────────────────────────────────┐
│                   DATOS (Puerto 5432)                   │
│              PostgreSQL · Supabase · 11 tablas          │
└─────────────────────────────────────────────────────────┘
```

El frontend se comunica con el backend exclusivamente a través de la API REST. Se usan **proxy rewrites** de Next.js para evitar problemas de CORS entre dominios de Vercel.

---

## Repositorios del proyecto

| Capa          | Repositorio                                                                   | Deploy |
|------|-------------|--------|
| Frontend      | [fer-duran06/GameStack_Front](https://github.com/fer-duran06/GameStack_Front) | [game-stack-front.vercel.app](https://game-stack-front.vercel.app)    |
| Backend       | [fer-duran06/GameStack_Back](https://github.com/fer-duran06/GameStack_Back)   | [prueba-kohl-phi-76.vercel.app](https://prueba-kohl-phi-76.vercel.app)  |

---

## Stack tecnológico

| Tecnología | Uso |
|------------|-----|
| Next.js 16.2 | Framework principal (App Router) |
| TypeScript 5 | Tipado estático |
| React 19 | UI |
| RAWG.io API | Búsqueda de videojuegos |
| Vercel | Despliegue serverless |
| localStorage | Caché visual de datos creados |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx              # Root layout con AuthProvider
│   ├── page.tsx                # Redirect a /dashboard
│   ├── login/page.tsx          # Login y registro (tabs)
│   ├── dashboard/page.tsx      # Panel principal con estadísticas
│   ├── juegos/page.tsx         # Buscador RAWG + juegos registrados
│   ├── partidas/
│   │   ├── page.tsx            # Lista de partidas con filtros
│   │   └── nueva/page.tsx      # Formulario crear partida
│   ├── torneos/
│   │   ├── page.tsx            # Mis torneos + torneos destacados
│   │   └── nueva/page.tsx      # Formulario crear torneo
│   ├── tips/
│   │   ├── page.tsx            # Mis tips + tips de comunidad
│   │   └── nueva/page.tsx      # Formulario publicar tip
│   ├── rankings/page.tsx       # Tabla de rankings por juego y período
│   └── perfil/page.tsx         # Perfil de usuario + logros
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Navegación lateral
│   │   └── MainLayout.tsx      # Wrapper con protección de ruta
│   └── ui/
│       └── Badge.tsx
├── context/
│   └── AuthContext.tsx         # JWT en localStorage, login/logout
├── hooks/
│   └── useProtectedRoute.ts    # Redirección si no está autenticado
├── lib/
│   └── api.ts                  # Helper fetch con headers de autenticación
├── services/
│   ├── auth.service.ts
│   ├── games.service.ts
│   ├── matches.service.ts
│   ├── tournaments.service.ts
│   ├── tips.service.ts
│   ├── rankings.service.ts
│   └── users.service.ts
└── types/
    ├── auth.types.ts
    ├── user.types.ts
    ├── game.types.ts
    ├── match.types.ts
    ├── tournament.types.ts
    ├── tip.types.ts
    └── ranking.types.ts
```

---

## Instalación y uso local

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Backend corriendo (ver repo GameStack_Back)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/fer-duran06/GameStack_Front.git
cd GameStack_Front

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con la URL del backend

# 4. Iniciar servidor de desarrollo
npm run dev
# Disponible en http://localhost:3001
```

### Variables de entorno

``` env
    NEXT_PUBLIC_API_URL=https://prueba-kohl-phi-76.vercel.app
```

---


## API Externa — RAWG.io

La búsqueda de juegos se realiza a través de [RAWG.io](https://rawg.io/apidocs), la base de datos de videojuegos más grande del mundo con más de 500,000 títulos. El flujo es:

1. El usuario busca un juego por nombre
2. El frontend consulta `GET /api/v1/games/search?q=` (el backend hace la llamada a RAWG)
3. El usuario selecciona el juego y lo registra con `POST /api/v1/games`
4. El juego queda disponible en la plataforma con un ID interno

---

## Esquema de Base de Datos

La base de datos cuenta con **11 tablas** en PostgreSQL:

`users` · `games` · `matches` · `match_participants` · `tournaments` · `tournament_participants` · `tournament_matches` · `tips` · `tip_likes` · `builds` · `rankings`

---

## Equipo de desarrollo

| Nombre | Matrícula 
|--------|-----------|-----|
| Luis Ali Rios Cristobal | 243682 
| Rodolfo Ramirez Reyes | 243768 
| Fernando Alexis Durán Vázquez | 243827 

**Universidad Politécnica de Chiapas — 5°C**
Materia: Aplicaciones Web Orientada a Servicios
Docente: Mtra. Viviana López Rojo