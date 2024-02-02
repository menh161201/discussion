'use client'
import { useEditor,EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from '@tiptap/extension-heading';


export default function TipTap() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({
                levels: [1, 2, 3],
            })
        ],
        content: '<p>Hello World! 🌎️</p>',
    })

    return (
        <EditorContent editor={editor}/>
    )
}