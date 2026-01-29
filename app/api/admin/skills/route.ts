import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET - List all skills
export async function GET(request: NextRequest) {
  try {
    const mod = await import('@/lib/prisma');
    const prisma = mod.getPrisma ? mod.getPrisma() : (mod.prisma?.client ?? mod.prisma);
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}

// POST - Create new skill
export async function POST(request: NextRequest) {
  try {
    const mod = await import('@/lib/prisma');
    const prisma = mod.getPrisma ? mod.getPrisma() : (mod.prisma?.client ?? mod.prisma);
    const _mod = await import('@supabase/auth-helpers-nextjs');
    const createRouteHandlerClient = ( _mod as any ).createRouteHandlerClient ?? ( _mod as any ).default?.createRouteHandlerClient;
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const skill = await prisma.skill.create({
      data: {
        name: body.name,
        category: body.category,
        proficiency: body.proficiency || 50,
        yearsExp: body.yearsExp || 0,
        order: body.order || 0,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 },
    );
  }
}

// PUT - Update skill
export async function PUT(request: NextRequest) {
  try {
    const mod = await import('@/lib/prisma');
    const prisma = mod.getPrisma ? mod.getPrisma() : (mod.prisma?.client ?? mod.prisma);
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
      return NextResponse.json({ error: "Skill ID required" }, { status: 400 });
    }

    const skill = await prisma.skill.update({
      where: { id },
      data,
    });

    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 },
    );
  }
}

// DELETE - Delete skill
export async function DELETE(request: NextRequest) {
  try {
    const mod = await import('@/lib/prisma');
    const prisma = mod.getPrisma ? mod.getPrisma() : (mod.prisma?.client ?? mod.prisma);
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
      return NextResponse.json({ error: "Skill ID required" }, { status: 400 });
    }

    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 },
    );
  }
}
