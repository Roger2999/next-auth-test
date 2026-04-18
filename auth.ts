// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHub],
//   pages: {
//     signIn: "/signin",
//   },
//   // callbacks: {
//   //   authorized({ auth, request }) {
//   //     const { pathname } = request.nextUrl;
//   //     // Determinamos si el usuario está logueado, verificando si existe auth.user.
//   //     const isLoggedIn = !!auth?.user;
//   //     if (pathname.startsWith("/dashboard") && !isLoggedIn) {
//   //       return NextResponse.redirect(new URL("/signin", request.nextUrl));
//   //     }
//   //     if (pathname.startsWith("/signin") && isLoggedIn) {
//   //       return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//   //     }

//   //     // Por defecto, permitimos el acceso.
//   //     return true;
//   //   },
//   // },
// });
