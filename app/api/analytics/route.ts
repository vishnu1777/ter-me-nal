import { NextRequest, NextResponse } from "next/server";
// Lazy-import Prisma inside handlers to avoid build-time initialization

export async function GET(request: NextRequest) {
  try {
    const mod = await import('@/lib/prisma');
    const prisma = mod.getPrisma ? mod.getPrisma() : (mod.prisma?.client ?? mod.prisma);
    const analytics = await prisma.analytics.findMany({
      orderBy: { executedAt: "desc" },
      take: 100,
    });

    // Get command frequency
    const commandFrequency = await prisma.analytics.groupBy({
      by: ["command"],
      _count: { command: true },
      orderBy: { _count: { command: "desc" } },
      take: 10,
    });

    // Get average response time
    const avgResponseTime = await prisma.analytics.aggregate({
      _avg: { responseTime: true },
    });

    return NextResponse.json({
      recentAnalytics: analytics,
      commandFrequency,
      avgResponseTime: avgResponseTime._avg.responseTime,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
