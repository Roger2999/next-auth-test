import HomeCard from "@/components/home-card";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
export default function Home() {
  const stack = ["Better auth", "Prisma", "Resend"];
  const features = [
    "Registro y login con credenciales",
    "Login con Github",
    "Sesión persistente",
    "Rutas protegidas",
    "Encriptación de datos sensibles",
  ];

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 p-3 sm:p-10">
      <div className="flex w-100 max-w-[90%] flex-col gap-5">
        <h1 className={`text-2xl`}>
          Bienvenido a mi proyecto de autenticación
        </h1>
        <Card>
          <CardContent className="text-success space-y-2">
            <div className="text-md flex gap-2">
              <ArrowRightIcon />
              Registrate y confirma tu email, luego inicias sesión
              automáticamente.
            </div>
            <div className="text-md flex gap-2">
              <ArrowRightIcon />
              Inicia sesión con tus credenciales o con tu cuenta de Github
            </div>
          </CardContent>
        </Card>
        <HomeCard title="Teconologías utilizadas" items={stack} />
        <HomeCard title="Funcionalidades" items={features} />
      </div>
    </div>
  );
}
