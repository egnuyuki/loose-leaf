import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// Editor is a controlled component: accepts `value` (tiptap JSON or HTML)
// and calls `onChange` with the editor JSON on updates.
const Editor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: (value && (value.json ?? value)) || '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none w-full text-lg bg-white rounded outline-none min-h-64 resize-none',
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange({ json: editor.getJSON(), text: editor.getText(), html: editor.getHTML() })
      }
    },
  })

  // Keep editor content in sync when parent value changes
  useEffect(() => {
    if (!editor) return
    // allow empty string to clear the editor; only skip when value is null/undefined
    if (value === undefined || value === null) return
    const content = value.json ?? value
    try {
      const current = editor.getJSON()
      if (JSON.stringify(current) !== JSON.stringify(content)) {
        editor.commands.setContent(content)
      }
    } catch (e) {
      // ignore invalid content
      console.error("Failed to set editor content:", e)
    }
  }, [value, editor])

  return <EditorContent editor={editor} />
}

export default Editor