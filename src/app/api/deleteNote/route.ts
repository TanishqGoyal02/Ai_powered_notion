import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { note_id } = await req.json();
  await db.delete($notes).where(eq($notes.id, parseInt(note_id)));
  return new NextResponse("ok", { status: 200 });
}
