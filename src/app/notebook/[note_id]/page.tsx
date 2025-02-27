import DeleteButton from "@/components/DeleteButton";
import TipTapEditor from "@/components/TipTapEditor";
import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
type props = {
  params: { note_id: string };
};

const NotebookPage = async ({ params: { note_id } }: props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/dashboard");
  }
  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(note_id)), eq($notes.userId, userId)));
  if (notes.length !== 1) {
    redirect("/dashboard");
  }
  const user = await clerk.users.getUser(userId);

  const note = notes[0];
  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-xl p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-green-600 " size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="text-semibold">
            {user.firstName}
            {user.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{note.name}</span>
          <div className="ml-auto">
            <DeleteButton note_id={note.id} />
          </div>
        </div>
        <div className="h-4"></div>
        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 ">
          <TipTapEditor note={note} />
        </div>
      </div>
    </div>
  );
};
export default NotebookPage;
