import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET - List all projects
export async function GET(request: NextRequest) {
  try {
    const mod = await import('@/lib/prisma');
    const prisma = mod.getPrisma ? mod.getPrisma() : (mod.prisma?.client ?? mod.prisma);
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    // Check authentication
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
    const createData: any = {
      name: body.name,
      description: body.description,
      longDesc: body.longDesc,
      tech: body.tech || [],
      github: body.github,
      live: body.live,
      featured: body.featured || false,
      category: body.category,
    };
    if (body.startDate) createData.startDate = new Date(body.startDate);
    if (body.endDate) createData.endDate = new Date(body.endDate);

    const project = await prisma.project.create({ data: createData });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
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
      return NextResponse.json(
        { error: "Project ID required" },
        { status: 400 },
      );
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
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
      return NextResponse.json(
        { error: "Project ID required" },
        { status: 400 },
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
