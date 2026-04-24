import HomeCard from "@/components/home-card/home-card";
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
    <div className="flex flex-col items-center w-full gap-5 p-3 sm:p-10 h-full">
      <div className="w-100 max-w-[90%] space-y-2">
        <h1 className={`text-2xl`}>
          Bienvenido a mi proyecto de autenticación
        </h1>
        <Card>
          <CardContent className=" space-y-2 text-success">
            <div className="flex gap-2 text-md">
              <ArrowRightIcon />
              Registrate y confirma tu email, luego inicias sesión
              automáticamente.
            </div>
            <div className=" flex gap-2 text-md">
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
