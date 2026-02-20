import { NextResponse } from "next/server";

export async function POST(req) {
    const res = NextResponse.json({ message: "Logout successful" });
    const isProduction = process.env.NODE_ENV === "production";
    const cookieDomain = process.env.COOKIE_DOMAIN;

    // Clear the token cookie
    res.cookies.set('token', '', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        ...(cookieDomain ? { domain: cookieDomain } : {}),
        path: '/',
        maxAge: 0, // Expire immediately
    });

    return res;
}