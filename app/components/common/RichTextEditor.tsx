"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false, // ✅ SSR FIX
  });

  // 🔄 sync content
  useEffect(() => {
    if (!editor) return;

    const update = () => {
      onChange(editor.getHTML());
    };

    editor.on("update", update);

    return () => {
      editor.off("update", update);
    };
  }, [editor, onChange]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg">

      {/* 🔥 TOOLBAR */}
      <div className="flex flex-wrap gap-2 border-b p-2 bg-muted/40">

        {/* BOLD */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("bold") ? "bg-black text-white" : "bg-white"
          }`}
        >
          B
        </button>

        {/* ITALIC */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 text-sm rounded ${
            editor.isActive("italic") ? "bg-black text-white" : "bg-white"
          }`}
        >
          I
        </button>

        {/* H1 */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="px-2 py-1 text-sm rounded bg-white"
        >
          H1
        </button>

        {/* H2 */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-2 py-1 text-sm rounded bg-white"
        >
          H2
        </button>

        {/* BULLET LIST */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 text-sm rounded bg-white"
        >
          • List
        </button>

        {/* NUMBER LIST */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-2 py-1 text-sm rounded bg-white"
        >
          1. List
        </button>

      </div>

      {/* ✍️ EDITOR */}
      <div className="p-3 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}