import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload; // payload contains the decoded user object
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}

export async function middleware(request) {
  console.log("middle ware invoked")
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const user =await verifyToken(token);

      if (pathname.startsWith("/admin") && user.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      // pass if user is okay
    } catch (err) {
      console.log("Error Occurred",err)
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
