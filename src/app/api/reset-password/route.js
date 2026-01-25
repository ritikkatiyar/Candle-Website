import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    // Find user with valid reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() } // Token not expired
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}