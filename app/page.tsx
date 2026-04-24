import HomeCard from "@/components/home-card/home-card";

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
    <div className="flex flex-col items-center w-full gap-5 p-3 sm:p-10 flex-1">
      <h1 className={`text-2xl`}>Bienvenido a mi proyecto de autenticación</h1>
      <HomeCard title="Teconologías utilizadas" items={stack} />
      <HomeCard title="Funcionalidades" items={features} />
    </div>
  );
}
