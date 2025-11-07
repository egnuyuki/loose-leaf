import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { Save } from 'lucide-react';
import Editor from "./Editor";
import TurndownService from 'turndown';

const Form = () => {
  const defaultValues = {
    title: "Untitled",
    content: "",
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues });
  const contentValue = watch("content", "");

  // helper: extract plain text from tiptap JSON format or from our value shape
  const extractText = (node) => {
    if (!node) return ''
    // if value is an object with text/html/json fields
    if (node.text && typeof node.text === 'string') return node.text
    if (node.html && typeof node.html === 'string') return node.html.replace(/<[^>]+>/g, '')
    const target = node.json ?? node
    if (typeof target === 'string') return target
    if (Array.isArray(target)) return target.map(extractText).join('')
    let text = ''
    if (target.text) text += target.text
    if (target.content) text += target.content.map(extractText).join('')
    return text
  }

  const contentTextLength = React.useMemo(() => {
    try {
      return extractText(contentValue).length
    } catch (e) {
      return 0
    }
  }, [contentValue])

  const onSubmit = (data) => {
    console.log(data);
    // Convert content.html to Markdown for storage/display
    const turndownService = new TurndownService();
    let markdown = ''
    if (data.content && data.content.html) {
      markdown = turndownService.turndown(data.content.html)
      console.log("markdown", markdown);
    } else if (typeof data.content === 'string') {
      markdown = data.content
    } else {
      // fallback: extract text
      markdown = extractText(data.content)
    }

    const contentObj = {}
    if (data.content && typeof data.content === 'object') {
      contentObj.json = data.content.json ?? data.content
      contentObj.html = data.content.html ?? null
    } else if (typeof data.content === 'string') {
      contentObj.json = null
      contentObj.html = null
    }
    contentObj.md = markdown

    const formData = {
      title: data.title || "Untitled",
      content: contentObj,
      createdAt: new Date(),
      updateAt: new Date(),
    };
    localStorage.setItem("note_" + Date.now(), JSON.stringify(formData));
    reset();
  };

  return (
    <>
    <div className="flex justify-end">
      <div className="flex items-center space-x-2 mb-2">
        <Save className="text-gray-500"/>
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
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
            {...register("title", {
              required: "タイトルは必須です",
            })}
          />
          {errors.title && (
            <p className="text-red-400">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="content"
            control={control}
            defaultValue={defaultValues.content}
            rules={{
              validate: (v) => {
                const len = extractText(v).length
                return len <= 800 || '800文字以内で入力してください'
              },
            }}
            render={({ field }) => (
              <Editor
                value={field.value?.json ?? field.value ?? ''}
                onChange={(payload) => field.onChange(payload)}
                placeholder="ここに800字以内で入力してください。"
                maxLength={800}
              />
            )}
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
