import { useForm } from "react-hook-form";
import { Save } from 'lucide-react';

const Form = () => {
  const defaultValues = {
    title: "",
    content: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues });
  const contentValue = watch("content", "");

  const onSubmit = (data) => {
    console.log(data);
    const formData = {
      title: data.title,
      content: data.content,
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
          <textarea
            className={`w-full text-lg bg-white rounded outline-none min-h-64 resize-none`}
            maxLength="800"
            placeholder="ここに800字以内で入力してください。"
            {...register("content", {
              required: "内容は必須です",
            })}
          ></textarea>
          {errors.content && (
            <p className="text-red-400">{errors.content.message}</p>
          )}
        </div>
        <div>
          {/* 文字数カウンター */}
          {/* 入力された文字数を表示 */}
          <p className="text-sm text-gray-500 text-right">
            {(contentValue || "").length} / 800
          </p>
        </div>
      </div>
    </>
  );
};

export default Form;
