"use client";
import React, { use } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Plus } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

const CreateNoteDialog = (props: Props) => {
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const uploadToFirebase = useMutation({
    mutationFn: async (note_id: string) => {
      const response = await axios.post("/api/uploadToFirebase", {
        note_id,
      });
      return response.data;
    },
  });

  const createNotebook = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createNoteBook", { name: input });
      return response.data;
    },
  });
  const handdleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      alert("Name is required");
      return;
    }
    createNotebook.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        console.log("Notebook created", { note_id });
        uploadToFirebase.mutate(note_id);
        router.push(`/notebook/${note_id}`);
      },
      onError: () => {
        console.log(" Failed to create notebook Error");
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex border-green-600 rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
          <h2 className="font-semibold text-green-600 sm:mt-2">
            New Note Book
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Notebook</DialogTitle>
          <DialogDescription>
            You can create a new note by clicking the button below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handdleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Name..."
          />
          <div className="h-4"></div>
          <div className="flex  gap-2">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;
