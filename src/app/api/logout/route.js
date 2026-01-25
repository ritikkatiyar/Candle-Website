import { NextResponse } from "next/server";

export async function POST(req) {
    const res = NextResponse.json({ message: "Logout successful" });

    // Clear the token cookie
    res.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0, // Expire immediately
    });

    return res;
}