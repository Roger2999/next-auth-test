# Next Auth Test

Una aplicación moderna de Next.js con autenticación mejorada, base de datos PostgreSQL y características de usuario completas.

## Tech Stack

- **Framework**: [Next.js 16.2](https://nextjs.org) con App Router
- **Autenticación**: [better-auth](https://better-auth.js.org/)
- **Base de Datos**: PostgreSQL con [Prisma ORM](https://www.prisma.io)
- **UI**: [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com)
- **Manejo de Archivos**: [UploadThing](https://uploadthing.com)
- **Email**: [Resend](https://resend.com)
- **Validación**: [Zod](https://zod.dev)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)

## Requisitos Previos

- Node.js 18+
- PostgreSQL 14+
- npm, yarn, pnpm o bun

## Instalación

1. Clonar el repositorio:
```bash
git clone <repo-url>
cd next-auth-test
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

Necesitarás configurar:
- `DATABASE_URL` - Conexión a PostgreSQL
- Credenciales de autenticación de better-auth
- Credenciales de UploadThing
- Credenciales de Resend (para emails)

4. Ejecutar migraciones de base de datos:
```bash
npx prisma migrate dev
```

## Desarrollo

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Compila para producción
- `npm start` - Ejecuta servidor de producción
- `npm run lint` - Ejecuta ESLint

## Estructura del Proyecto

```
├── app/                    # App Router de Next.js
├── components/             # Componentes React reutilizables
├── lib/                    # Utilidades y funciones auxiliares
├── prisma/                 # Esquema y migraciones de Prisma
├── public/                 # Archivos estáticos
└── types/                  # Definiciones TypeScript
```

## Desarrollo de Base de Datos

Ver estado del esquema:
```bash
npx prisma studio
```

Crear nueva migración:
```bash
npx prisma migrate dev --name <nombre>
```

## Deploy en Vercel

La forma más fácil es usar [Vercel Platform](https://vercel.com) de los creadores de Next.js.

Consulta la [documentación de deployment de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
