import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadFileToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { note_id } = await req.json();
    // extract out the dalle imageurl
    // save it to firebase
    console.log("noteIdinfirebase", note_id);
    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.id, parseInt(note_id)));
    if (!notes[0].imageUrl) {
      return new NextResponse("no image url", { status: 400 });
    }
    const firebase_url = await uploadFileToFirebase(
      notes[0].imageUrl,
      notes[0].name
    );
    // update the note with the firebase url
    console.log("firebase_url", firebase_url);
    await db
      .update($notes)
      .set({
        imageUrl: firebase_url,
      })
      .where(eq($notes.id, parseInt(note_id)));
    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("error", { status: 500 });
  }
}
