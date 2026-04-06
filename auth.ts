import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { NextResponse } from "next/server"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // Definimos el callback "authorized" para controlar el acceso a rutas protegidas y redirecciones según el estado de autenticación.
    authorized({ auth, request }) {
      // Obtenemos la ruta (pathname) del request actual.
      const { pathname } = request.nextUrl
      
      // Determinamos si el usuario está logueado, verificando si existe auth.user.
      // Usamos !! para convertir el valor de auth?.user en un booleano: 
      // si existe (no es null ni undefined ni falsy), será true; si no, será false.
      const isLoggedIn = !!auth?.user
      // Si la ruta empieza con /dashboard, solo permitimos el acceso si el usuario está autenticado.
      if (pathname.startsWith("/dashboard") && !isLoggedIn) {
        return NextResponse.redirect(new URL("/signin",request.nextUrl))
      }

      // Si la ruta es /signin y el usuario ya está autenticado, lo redirigimos al dashboard.
      if (pathname.startsWith("/signin") && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
      }

      // Por defecto, permitimos el acceso.
      return true
    },
  },
})