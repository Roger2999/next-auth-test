import { Suspense } from "react";
import UserList from "./components/users-list";
import UserListLoading from "./components/user-list-loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AcountUserManangment() {
  return (
    <>
      <div>AcountUserManangment</div>
      <Button>
        <Link href={"/dashboard/account-user-manangment/create-user"}>
          Create user account
        </Link>
      </Button>
      <Suspense fallback={<UserListLoading />}>
        <UserList />
      </Suspense>
      {/* tabla con listado de usuarios existentes */}
      {/* al hacer click en un usuario muestra los registros asociados a cada uno */}
      {/* Funcionalidad para exportar en pdf cada registro de usuario */}
      {/* boton crear usuario => forumlario=>guarda en db */}
      {/* boton editar usuario => fromulario=>actualiza en db */}
      {/* boton eliminar usuario => modal de confirmacion=> elimina usuario*/}
    </>
  );
}
