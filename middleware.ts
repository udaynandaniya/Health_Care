// //C:\Users\UDAYN\Downloads\healthcare-platform\middleware.ts


// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { jwtVerify } from "jose"

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("auth-token")?.value
//   const { pathname } = request.nextUrl

//   console.log("🔍 Incoming Path:", pathname)
//   console.log("🔐 Token:", token ? "[Present]" : "[Missing]")

//   const publicRoutes = [
//     "/",
//     "/auth/login",
//     "/auth/forgot-password",

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
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET)
//     const { payload } = await jwtVerify(token, secret)

//     console.log("🧾 Decoded Token Payload:", payload)

//     if (pathname.startsWith("/user/") && payload.role !== "user" && !payload.isAdmin) {
//       console.log("⛔ Not user or admin - redirect")
//       return NextResponse.redirect(new URL("/", request.url))
//     }

//     if (pathname.startsWith("/doctor/") && payload.role !== "doctor" && !payload.isAdmin) {
//       console.log("⛔ Not doctor or admin - redirect")
//       return NextResponse.redirect(new URL("/", request.url))
//     }

//     if (pathname.startsWith("/hospital/") && payload.role !== "hospital" && !payload.isAdmin) {
//       console.log("⛔ Not hospital or admin - redirect")
//       return NextResponse.redirect(new URL("/", request.url))
//     }

//     if (pathname.startsWith("/admin/") && !payload.isAdmin) {
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
    "/auth/forgot-password",
    "/user/signup",
    "/doctor/signup",
    "/hospital/signup",
    "/api/auth/me",
    "/api/auth/logout",
    // Add all reset password API routes as public
    "/api/auth/reset-by-otp/send-otp",
    "/api/auth/reset-by-otp/verify-otp",
    "/api/auth/reset-by-otp/reset-password",
    "/api/auth/reset-by-old",
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
