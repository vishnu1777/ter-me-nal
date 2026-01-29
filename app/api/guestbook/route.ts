import { NextRequest, NextResponse } from "next/server";

// Lazy import Prisma in handlers to avoid build-time initialization

export async function GET(request: NextRequest) {
  try {
    const mod = await import('@/lib/prisma');
    const prisma = mod.getPrisma ? mod.getPrisma() : (mod.prisma?.client ?? mod.prisma);
    const entries = await prisma.guestbook.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching guestbook:", error);
    return NextResponse.json(
      { error: "Failed to fetch guestbook" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const mod = await import('@/lib/prisma');
    const prisma = mod.getPrisma ? mod.getPrisma() : (mod.prisma?.client ?? mod.prisma);
    const body = await request.json();
    const { name, message, email } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 },
      );
    }

    const entry = await prisma.guestbook.create({
      data: {
        name,
        message,
        email,
        approved: false, // Require manual approval
      },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 },
    );
  }
}
