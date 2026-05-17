import { ArrowRightIcon, LockIcon, UserIcon } from "lucide-react";

export const routes = [
  { name: "Home", href: "/", current: false, id: "1" },
  { name: "Contact", href: "/contact", current: false, id: "2" },
  { name: "About us", href: "/about", current: false, id: "3" },
];
export const stack = [
  {
    name: "Next.js 15",
    description: "Framework React con App Router y Server Actions",
  },
  {
    name: "BetterAuth",
    description: "Autenticación flexible con OAuth, email y más",
  },
  { name: "TypeScript", description: "Tipado estático para código más seguro" },
  {
    name: "Prisma",
    description: "ORM con tipado seguro y migraciones automáticas",
  },
  { name: "PostgreSQL", description: "Base de datos relacional robusta" },
  {
    name: "Tailwind CSS",
    description: "Framework CSS utility-first con shadcn/ui",
  },
  { name: "Zod", description: "Validación de esquemas TypeScript" },
  {
    name: "Resend",
    description: "API de email transaccional para confirmaciones",
  },
];

export const features = [
  {
    title: "Registro seguro",
    description: "Crea tu cuenta y confirma tu email",
    icon: UserIcon,
  },
  {
    title: "Autenticación flexible",
    description: "Inicia sesión con credenciales oGithub",
    icon: LockIcon,
  },
  {
    title: "Sesión persistente",
    description: "Mantente conectado de forma segura",
    icon: ArrowRightIcon,
  },
  {
    title: "Protección de rutas",
    description: "Acceso solo a usuarios autenticados",
    icon: LockIcon,
  },
];
