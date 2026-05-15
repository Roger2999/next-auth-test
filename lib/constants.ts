import { ArrowRightIcon, LockIcon, UserIcon } from "lucide-react";

export const routes = [
  { name: "Home", href: "/", current: false, id: "1" },
  { name: "Contact", href: "/contact", current: false, id: "2" },
  { name: "About us", href: "/about", current: false, id: "3" },
];
export const stack = ["Better auth", "Prisma", "Resend"];

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
