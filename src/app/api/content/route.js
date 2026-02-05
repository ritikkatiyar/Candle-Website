import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/ContentModel";
import { verifyToken } from "@/lib/jwt";

// GET - Fetch all active content or content by section
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    let query = { isActive: true };
    if (section) {
      query.section = section;
    }

    const content = await Content.find(query).sort({ section: 1, order: 1 });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Create new content (Admin only)
export async function POST(request) {
  try {
    await connectToDatabase();

    // Verify admin token
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { section, title, content, image, order } = await request.json();

    if (!section) {
      return NextResponse.json({ error: "Section is required" }, { status: 400 });
    }

    const newContent = new Content({
      section,
      title,
      content,
      image: image || null,
      order: order || 0
    });

    await newContent.save();

    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    console.error("Error creating content:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT - Update content (Admin only)
export async function PUT(request) {
  try {
    await connectToDatabase();

    // Verify admin token
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { id, section, title, content, image, order, isActive } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Content ID is required" }, { status: 400 });
    }

    const updatedContent = await Content.findByIdAndUpdate(
      id,
      {
        section,
        title,
        content,
        image,
        order,
        isActive
      },
      { new: true }
    );

    if (!updatedContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Delete content (Admin only)
export async function DELETE(request) {
  try {
    await connectToDatabase();

    // Verify admin token
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Content ID is required" }, { status: 400 });
    }

    const deletedContent = await Content.findByIdAndDelete(id);

    if (!deletedContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}