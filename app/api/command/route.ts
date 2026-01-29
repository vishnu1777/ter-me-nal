import { NextRequest, NextResponse } from "next/server";
import { parseCommand } from "@/lib/commandParser";

export async function POST(request: NextRequest) {
  try {
    const { command, visitorId } = await request.json();

    if (!command) {
      return NextResponse.json(
        { error: "Command is required" },
        { status: 400 },
      );
    }

    const result = await parseCommand(command, visitorId || "");

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error executing command:", error);
    return NextResponse.json(
      {
        type: "error",
        message: "An error occurred while executing the command.",
      },
      { status: 500 },
    );
  }
}
