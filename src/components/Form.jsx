import React, { useState } from "react";
import { ChevronsLeft, Save } from "lucide-react";
import Editor from "./Editor";
import { Link } from "react-router-dom";

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

  const contentTextLength = content.length;

  const onSubmit = () => {
    const newErrors = {};
    if (content.length > 800) {
      newErrors.content = "800文字以内で入力してください";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      title: title || "Untitled",
      content: content,
      updateAt: new Date(),
    };

    // Save to localStorage
    // 編集モードなら既存のノートを更新、新規作成モードなら新しいIDで保存
    formData.createdAt = new Date();
    console.log("Form submitted:", formData);
    const noteId = `note_${Date.now()}`;
    console.log("Saving note with ID:", noteId);

    if (isEditing && note.id) {
      formData.createdAt = note.createdAt;
      const noteId = `note_${note.id}`;
      localStorage.setItem(noteId, JSON.stringify(formData));
      location.href = `/note/${note.id}`;
      return;
    } else {
      formData.createdAt = new Date();
      const noteId = `note_${Date.now()}`;
      localStorage.setItem(noteId, JSON.stringify(formData));
      location.href = `/note/${noteId.replace("note_", "")}`;
      return;
    }
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
          <Editor value={content} setValue={setContent} />
          {errors.content && <p className="text-red-400">{errors.content}</p>}
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
