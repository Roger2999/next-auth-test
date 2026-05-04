import HomeCard from "@/components/ui/home-card";
import { ArrowRightIcon, LockIcon, UserIcon, MailIcon } from "lucide-react";

const stack = ["Better auth", "Prisma", "Resend"];

const features = [
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

export default function Home() {
  return (
    <div className="from-background to-background/80 flex min-h-screen w-full flex-col items-center gap-10 bg-linear-to-b px-4 py-16">
      <section className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Sistema de Autenticación
        </h1>
        <p className="text-muted-foreground text-lg">
          Una implementación moderna y segura de autenticación con Next.js,
          utilizando las mejores prácticas de seguridad y experiencia de
          usuario.
        </p>
      </section>

      <section className="flex w-full max-w-3xl flex-col gap-8">
        <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group border-border/50 bg-card/50 hover:bg-card/80 flex items-start justify-center gap-4 rounded-lg border p-4 transition-colors sm:w-full sm:justify-start"
            >
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <feature.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <HomeCard title="Tecnologías utilizadas" items={stack} />
      </section>
    </div>
  );
}
