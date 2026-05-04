# Ismail Ait - Portafolio

Portafolio personal construido con **Astro**, **React**, **Tailwind CSS v4** y **Framer Motion**.  
Muestra mis proyectos open-source directamente desde la API de GitHub.

## Stack

| Tecnología | Uso |
|---|---|
| [Astro](https://astro.build) | Static Site Generator (SSG) |
| [React 19](https://react.dev) | Componentes interactivos |
| [Tailwind CSS v4](https://tailwindcss.com) | Estilos utility-first |
| [Framer Motion](https://framermotion.com) | Animaciones |
| [react-icons](https://react-icons.github.io) | Iconos |

## Estructura del proyecto

```text
/
├── .github/workflows/   # CI/CD: deploy a GitHub Pages
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes React (.tsx)
│   ├── content/         # Colecciones de contenido (Astro)
│   ├── layouts/         # Layout base
│   ├── lib/             # Cliente de API de GitHub
│   ├── pages/           # Páginas (rutas)
│   └── styles/          # CSS global (Tailwind)
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Comandos

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción a `./dist/` |
| `npm run preview` | Preview del build local |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | TypeScript check |
| `npm test` | Tests unitarios |
| `npm run test:e2e` | Tests e2e (Playwright) |

## Variables de entorno

Copia `.env.example` a `.env` y configura:

```bash
PUBLIC_GITHUB_USER=tu_usuario_de_github
```

## Deploy

El proyecto se despliega automáticamente a **GitHub Pages** al hacer push a la rama `main`.

[Ver portafolio](https://khinmmad.github.io/portafolio-astro)
