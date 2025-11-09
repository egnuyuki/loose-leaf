import React, { useState } from "react";
import { Save } from "lucide-react";
import Editor from "./Editor";
import TurndownService from "turndown";

const Form = ({ note }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  if (note && !isEditing) {
    setTitle(note.title || "Untitled");
    setContent(note.content || "");
    setIsEditing(true);
  }

  // helper: extract plain text from tiptap JSON format or from our value shape
  const extractText = (node) => {
    if (!node) return "";
    // if value is an object with text/html/json fields
    if (node.text && typeof node.text === "string") return node.text;
    if (node.html && typeof node.html === "string")
      return node.html.replace(/<[^>]+>/g, "");
    const target = node.json ?? node;
    if (typeof target === "string") return target;
    if (Array.isArray(target)) return target.map(extractText).join("");
    let text = "";
    if (target.text) text += target.text;
    if (target.content) text += target.content.map(extractText).join("");
    return text;
  };

  const contentTextLength = React.useMemo(() => {
    try {
      return extractText(content).length;
    } catch (e) {
      return 0;
    }
  }, [content]);

  const onSubmit = () => {
    const newErrors = {};
    // if (!title.trim()) {
    //   newErrors.title = "タイトルは必須です";
    // }
    const contentLength = extractText(content).length;
    if (contentLength > 800) {
      newErrors.content = "800文字以内で入力してください";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convert content.html to Markdown for storage/display
    const turndownService = new TurndownService();
    let markdown = "";
    if (content && content.html) {
      markdown = turndownService.turndown(content.html);
      console.log("markdown", markdown);
    } else if (typeof content === "string") {
      markdown = content;
    } else {
      // fallback: extract text
      markdown = extractText(content);
    }

    const contentObj = {};
    if (content && typeof content === "object") {
      contentObj.json = content.json ?? content;
      contentObj.html = content.html ?? null;
    } else if (typeof content === "string") {
      contentObj.json = null;
      contentObj.html = null;
    }
    contentObj.md = markdown;

    const formData = {
      title: title || "Untitled",
      content: contentObj,
      createdAt: note.createdAt || new Date(),
      updateAt: new Date(),
    };

    // Save to localStorage
    // 編集モードなら既存のノートを更新、新規作成モードなら新しいIDで保存
    if (isEditing && note.id) {
      const noteId = `note_${note.id}`;
      localStorage.setItem(noteId, JSON.stringify(formData));
      location.href = `/note/${note.id}`;
      return;
    }
    const noteId = `note_${Date.now()}`;
    localStorage.setItem(noteId, JSON.stringify(formData));
    location.href = `/note/${noteId.replace("note_", "")}`;
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="flex items-center space-x-2 mb-2">
          <Save className="text-gray-500" />
          <button
            type="button"
            onClick={onSubmit}
            className="cursor-pointe text-gray-500 py-1 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            保存
          </button>
        </div>
      </div>
      <div className="space-y-4 rounded-lg p-6 shadow-sm border border-gray-200 bg-white">
        <div>
          <input
            className={`w-full text-lg border-b border-gray-300 bg-white py-2 outline-none`}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-red-400">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Editor
            value={content.json ?? content ?? ""}
            onChange={(payload) => setContent(payload)}
            placeholder="ここに800字以内で入力してください。"
            maxLength={800}
          />
          {errors.content && (
            <p className="text-red-400">{errors.content.message}</p>
          )}
        </div>
        <div>
          {/* 文字数カウンター */}
          {/* 入力された文字数を表示 */}
          <p className="text-sm text-gray-500 text-right">
            {contentTextLength} / 800
          </p>
        </div>
      </div>
    </>
  );
};

export default Form;
