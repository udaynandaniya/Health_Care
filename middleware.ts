// // // import { NextResponse } from "next/server"
// // // import type { NextRequest } from "next/server"
// // // import jwt from "jsonwebtoken"

// // // export function middleware(request: NextRequest) {
// // //   const token = request.cookies.get("auth-token")?.value
// // //   const { pathname } = request.nextUrl

// // //   // Public routes that don't need authentication
// // //   const publicRoutes = [
// // //     "/",
// // //     "/auth/login",
// // //     "/user/signup",
// // //     "/doctor/signup",
// // //     "/hospital/signup",
// // //     "/api/auth/me",
// // //     "/api/auth/logout",
// // //   ]

// // //   if (publicRoutes.includes(pathname)) {
// // //     return NextResponse.next()
// // //   }

// // //   // Check if user is authenticated
// // //   // if (!token) {
// // //   //   return NextResponse.redirect(new URL("/auth/login", request.url))
// // //   // }
// // //   if (!token) {
// // //   console.log("No token found. Redirecting to login.");
// // //   return NextResponse.redirect(new URL("/auth/login", request.url));
// // // }


// // //   try {
// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

// // //     // Role-based route protection
// // //     // if (pathname.startsWith("/user/") && decoded.role !== "user" && !decoded.isAdmin) {
// // //     //   return NextResponse.redirect(new URL("/", request.url))
// // //     // }

// // //     if (pathname.startsWith("/doctor/") && decoded.role !== "doctor" && !decoded.isAdmin) {
// // //       return NextResponse.redirect(new URL("/", request.url))
// // //     }

// // //     if (pathname.startsWith("/hospital/") && decoded.role !== "hospital" && !decoded.isAdmin) {
// // //       return NextResponse.redirect(new URL("/", request.url))
// // //     }

// // //     if (pathname.startsWith("/admin/") && !decoded.isAdmin) {
// // //       return NextResponse.redirect(new URL("/", request.url))
// // //     }

// // //     return NextResponse.next()
// // //   } catch (error) {
// // //     // Invalid token, redirect to login
// // //     return NextResponse.redirect(new URL("/auth/login", request.url))
// // //   }
// // // }

// // // export const config = {
// // //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// // // }


// // // middleware.ts

// // import { NextResponse } from "next/server"
// // import type { NextRequest } from "next/server"
// // import jwt from "jsonwebtoken"

// // export function middleware(request: NextRequest) {
// //   const token = request.cookies.get("auth-token")?.value
// //   const { pathname } = request.nextUrl

// //   // Public routes that don't require authentication
// //   const publicRoutes = [
// //     "/",
// //     "/auth/login",
// //     "/user/signup",
// //     "/doctor/signup",
// //     "/hospital/signup",
// //     "/api/auth/me",
// //     "/api/auth/logout",
// //   ]

// //   // Allow access to public routes
// //   if (publicRoutes.includes(pathname)) {
// //     return NextResponse.next()
// //   }

// //   // Block access if no token is present
// //   if (!token) {
// //     return NextResponse.redirect(new URL("/auth/login", request.url))
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

// //     // Role-based protection
// //     if (pathname.startsWith("/user/") && decoded.role !== "user" && !decoded.isAdmin) {
// //       return NextResponse.redirect(new URL("/", request.url))
// //     }

// //     if (pathname.startsWith("/doctor/") && decoded.role !== "doctor" && !decoded.isAdmin) {
// //       return NextResponse.redirect(new URL("/", request.url))
// //     }

// //     if (pathname.startsWith("/hospital/") && decoded.role !== "hospital" && !decoded.isAdmin) {
// //       return NextResponse.redirect(new URL("/", request.url))
// //     }

// //     if (pathname.startsWith("/admin/") && !decoded.isAdmin) {
// //       return NextResponse.redirect(new URL("/", request.url))
// //     }

// //     // All checks passed
// //     return NextResponse.next()
// //   } catch (error) {
// //     // Token is invalid or expired
// //     return NextResponse.redirect(new URL("/auth/login", request.url))
// //   }
// // }

// // export const config = {
// //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// // }


// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import jwt from "jsonwebtoken"

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("auth-token")?.value
//   const { pathname } = request.nextUrl

//   console.log("🔍 Incoming Path:", pathname)
//   console.log("🔐 Token:", token ? "[Present]" : "[Missing]")

//   const publicRoutes = [
//     "/",
//     "/auth/login",
//     "/user/signup",
//     "/doctor/signup",
//     "/hospital/signup",
//     "/api/auth/me",
//     "/api/auth/logout",
//   ]

//   if (publicRoutes.includes(pathname)) {
//     console.log("✅ Public route - allowed")
//     return NextResponse.next()
//   }

//   if (!token) {
//     console.log("⛔ No token - redirect to /auth/login")
//     return NextResponse.redirect(new URL("/auth/login", request.url))
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     console.log("🧾 Decoded Token:", decoded)

//     if (pathname.startsWith("/user/") && decoded.role !== "user" && !decoded.isAdmin) {
//       console.log("⛔ Not user or admin - redirect")
//       return NextResponse.redirect(new URL("/", request.url))
//     }

//     if (pathname.startsWith("/doctor/") && decoded.role !== "doctor" && !decoded.isAdmin) {
//       console.log("⛔ Not doctor or admin - redirect")
//       return NextResponse.redirect(new URL("/", request.url))
//     }

//     if (pathname.startsWith("/hospital/") && decoded.role !== "hospital" && !decoded.isAdmin) {
//       console.log("⛔ Not hospital or admin - redirect")
//       return NextResponse.redirect(new URL("/", request.url))
//     }

//     if (pathname.startsWith("/admin/") && !decoded.isAdmin) {
//       console.log("⛔ Not admin - redirect")
//       return NextResponse.redirect(new URL("/", request.url))
//     }

//     console.log("✅ Authenticated and authorized - continue")
//     return NextResponse.next()
//   } catch (error) {
//     console.error("❌ Invalid token:", error)
//     return NextResponse.redirect(new URL("/auth/login", request.url))
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }


import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  console.log("🔍 Incoming Path:", pathname)
  console.log("🔐 Token:", token ? "[Present]" : "[Missing]")

  const publicRoutes = [
    "/",
    "/auth/login",
    "/user/signup",
    "/doctor/signup",
    "/hospital/signup",
    "/api/auth/me",
    "/api/auth/logout",
  ]

  if (publicRoutes.includes(pathname)) {
    console.log("✅ Public route - allowed")
    return NextResponse.next()
  }

  if (!token) {
    console.log("⛔ No token - redirect to /auth/login")
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    console.log("🧾 Decoded Token Payload:", payload)

    if (pathname.startsWith("/user/") && payload.role !== "user" && !payload.isAdmin) {
      console.log("⛔ Not user or admin - redirect")
      return NextResponse.redirect(new URL("/", request.url))
    }

    if (pathname.startsWith("/doctor/") && payload.role !== "doctor" && !payload.isAdmin) {
      console.log("⛔ Not doctor or admin - redirect")
      return NextResponse.redirect(new URL("/", request.url))
    }

    if (pathname.startsWith("/hospital/") && payload.role !== "hospital" && !payload.isAdmin) {
      console.log("⛔ Not hospital or admin - redirect")
      return NextResponse.redirect(new URL("/", request.url))
    }

    if (pathname.startsWith("/admin/") && !payload.isAdmin) {
      console.log("⛔ Not admin - redirect")
      return NextResponse.redirect(new URL("/", request.url))
    }

    console.log("✅ Authenticated and authorized - continue")
    return NextResponse.next()
  } catch (error) {
    console.error("❌ Invalid token:", error)
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
