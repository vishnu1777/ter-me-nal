import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const education = await prisma.education.findMany({
      orderBy: { startDate: 'desc' },
    });
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const _mod = await import('@supabase/auth-helpers-nextjs');
    const createRouteHandlerClient = ( _mod as any ).createRouteHandlerClient ?? ( _mod as any ).default?.createRouteHandlerClient;
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const education = await prisma.education.create({
      data: {
        institution: body.institution,
        degree: body.degree,
        field: body.field,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        description: body.description,
      },
    });
    
    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const _mod = await import('@supabase/auth-helpers-nextjs');
    const createRouteHandlerClient = ( _mod as any ).createRouteHandlerClient ?? ( _mod as any ).default?.createRouteHandlerClient;
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...data } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Education ID required' }, { status: 400 });
    }

    const updateData: any = {};
    if (data.institution !== undefined) updateData.institution = data.institution;
    if (data.degree !== undefined) updateData.degree = data.degree;
    if (data.field !== undefined) updateData.field = data.field;
    if (data.startDate !== undefined) updateData.startDate = data.startDate ? new Date(data.startDate) : undefined;
    if (data.endDate !== undefined) updateData.endDate = data.endDate ? new Date(data.endDate) : undefined;
    if (data.description !== undefined) updateData.description = data.description;

    const education = await prisma.education.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const _mod = await import('@supabase/auth-helpers-nextjs');
    const createRouteHandlerClient = ( _mod as any ).createRouteHandlerClient ?? ( _mod as any ).default?.createRouteHandlerClient;
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Education ID required' }, { status: 400 });
    }

    await prisma.education.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 });
  }
}
