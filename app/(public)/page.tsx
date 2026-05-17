import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FeatureCard from "@/components/ui/feature-card";
import { features, stack } from "@/lib/constants";

export default function Home() {
  return (
    <div className="from-background to-background/80 flex w-full flex-col items-center gap-10 bg-linear-to-b px-4 py-16">
      <section className="flex flex-col items-center gap-6">
        <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Sistema de Autenticación
        </h1>
        <p className="text-muted-foreground text-lg">
          Una implementación moderna y segura de autenticación con Next.js,
          utilizando las mejores prácticas de seguridad y experiencia de
          usuario.
        </p>
      </section>
      <section className="flex w-full max-w-3xl flex-col gap-10">
        <section>
          <h2 className="sr-only">Features</h2>
          <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <FeatureCard key={feature.title} data={feature} />
            ))}
          </div>
        </section>
        <section className="space-y-5">
          <h2 className="text-center text-xl sm:text-left">
            Tecnologias utilizadas:
          </h2>
          <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {stack.map((s) => (
              <Card
                key={s.name}
                className="border-border/50 bg-card/50 hover:bg-card/80 flex h-full w-full max-w-[80%] flex-col p-0 pb-2 transition-colors"
              >
                <CardHeader className="border border-b p-2 text-center">
                  <CardTitle>{s.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-accent-foreground/60">
                  {s.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
