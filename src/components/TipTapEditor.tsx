"use client";
import React from "react";
import {
  EditorContent,
  combineTransactionSteps,
  useEditor,
} from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenubar from "./TipTapMenubar";
import { Button } from "./ui/button";
import { useDebounce } from "../lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { useCompletion } from "ai/react";
import { comma } from "postcss/lib/list";
type props = { note: NoteType };

const TipTapEditor = ({ note }: props) => {
  const [editorState, setEditorState] = React.useState(note.editorState || "");
  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const propmt = this.editor.getText().split(" ").slice(-30).join(" ");
          complete(propmt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
      customText,
    ],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const lastcompletion = React.useRef("");

  React.useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastcompletion.current.length);
    lastcompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const debounceEditorState = useDebounce(editorState, 500);
  React.useEffect(() => {
    if (debounceEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log("Note saved", data);
      },
      onError: () => {
        console.log("Failed to save note");
      },
    });
    console.log(debounceEditorState);
  }, [debounceEditorState]);
  return (
    <>
      <div className="flex">
        {editor && <TipTapMenubar editor={editor} />}
        <Button className="ml-auto bg-green-800">Saved</Button>
      </div>
      <div className="prose prose-sm w-full mt-4">
        <EditorContent editor={editor} />
      </div>
      <div className="h-4"></div>
      <span className="text-sm">
        Tip : Press
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-slate-100 border-gray-200 rounded-lg">
          Shift+A
        </kbd>
        for AI autocomplete
      </span>
    </>
  );
};

export default TipTapEditor;
