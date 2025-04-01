import connectToDatabase from "../../../../lib/mongodb";
import ContactModel from "../../../../models/ContactModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, mobile, message } = body;

    if (!name || !mobile || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Try saving to MongoDB and check for errors
    const newContact = new ContactModel({ name, mobile, message });
    const savedContact = await newContact.save();

    if (!savedContact) {
      return NextResponse.json(
        { error: "Failed to save contact information" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Contact saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ MongoDB Save Error:", error); // Logs the error to console

    return NextResponse.json(
      { error: error.message || "Something went wrong while saving data" },
      { status: 500 }
    );
  }
}
