import { getSession } from "@/lib/helpers";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getSession();

  return (
    <>
      <div className="text-2xl">
        <h1>{session?.user.name} dashboard</h1>
      </div>
      <h2 className="">Procedimientos:</h2>
      <ul>
        <li>
          <Link href={"/dashboard/account-user-manangment/"}>
            Gestión de cuentas de usuario
          </Link>
          <Link href={"#"}>Gestión de incidentes de ciberseguridad</Link>
        </li>
      </ul>
    </>
  );
}
