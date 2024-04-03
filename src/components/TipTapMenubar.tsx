"user client";
import { Editor } from "@tiptap/react";
import exp from "constants";
import {
  Bold,
  Code,
  CodepenIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import React from "react";

type props = {
  editor: Editor;
};

const TipTapMenubar = ({ editor }: props) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-green-600" : "bg-white-200"}
      >
        <Bold className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-green-600" : "bg-white-200"}
      >
        <Italic className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-green-600" : "bg-white-200"}
      >
        <Strikethrough className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "bg-green-600" : "bg-white-200"}
      >
        <Code className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "bg-green-600"
            : "bg-white-200"
        }
      >
        <Heading1 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-green-600"
            : "bg-white-200"
        }
      >
        <Heading2 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "bg-green-600"
            : "bg-white-200"
        }
      >
        <Heading3 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? "bg-green-600"
            : "bg-white-200"
        }
      >
        <Heading4 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? "bg-green-600"
            : "bg-white-200"
        }
      >
        <Heading5 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? "bg-green-600"
            : "bg-white-200"
        }
      >
        <Heading6 className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? "bg-green-600" : "bg-white-200"
        }
      >
        <List className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList") ? "bg-green-600" : "bg-white-200"
        }
      >
        <ListOrdered className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock") ? "bg-green-600" : "bg-white-200"
        }
      >
        <CodepenIcon className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote") ? "bg-green-600" : "bg-white-200"
        }
      >
        <Quote className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="w-6 h-6" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TipTapMenubar;
