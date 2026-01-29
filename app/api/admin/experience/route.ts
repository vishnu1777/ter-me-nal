import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const _mod = await import('@supabase/auth-helpers-nextjs');
    const createRouteHandlerClient = ( _mod as any ).createRouteHandlerClient ?? ( _mod as any ).default?.createRouteHandlerClient;
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const experience = await prisma.experience.create({
      data: {
        company: body.company,
        position: body.position,
        description: body.description,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        current: body.current || false,
        order: body.order || 0,
        location: body.location || "",
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const _mod = await import('@supabase/auth-helpers-nextjs');
    const createRouteHandlerClient = ( _mod as any ).createRouteHandlerClient ?? ( _mod as any ).default?.createRouteHandlerClient;
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Experience ID required" },
        { status: 400 },
      );
    }

    const updateData: any = {};
    if (data.company !== undefined) updateData.company = data.company;
    if (data.position !== undefined) updateData.position = data.position;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.startDate !== undefined) updateData.startDate = data.startDate ? new Date(data.startDate) : undefined;
    if (data.endDate !== undefined) updateData.endDate = data.endDate ? new Date(data.endDate) : undefined;
    if (data.current !== undefined) updateData.current = data.current;
    if (data.order !== undefined) updateData.order = data.order;
    if (data.location !== undefined) updateData.location = data.location;

    const experience = await prisma.experience.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const _mod = await import('@supabase/auth-helpers-nextjs');
    const createRouteHandlerClient = ( _mod as any ).createRouteHandlerClient ?? ( _mod as any ).default?.createRouteHandlerClient;
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Experience ID required" },
        { status: 400 },
      );
    }

    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 },
    );
  }
}
