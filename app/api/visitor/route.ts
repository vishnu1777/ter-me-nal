import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, userAgent } = body;

    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Parse user agent for browser info
    const browser = userAgent || "Unknown";

    const visitor = await prisma.visitor.create({
      data: {
        id,
        ip,
        browser,
        commands: [],
      },
    });

    return NextResponse.json(visitor);
  } catch (error) {
    console.error("Error creating visitor:", error);
    return NextResponse.json(
      { error: "Failed to create visitor" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const count = await prisma.visitor.count();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch visitor count" },
      { status: 500 },
    );
  }
}
