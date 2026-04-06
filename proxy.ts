// Auth.js v5: reexportar `auth` como `proxy` (Next.js 16 renombró middleware → proxy).
export { auth as proxy } from "@/auth"

// No ejecutar en la API de Auth, estáticos ni imágenes optimizadas.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}