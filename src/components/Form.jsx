import { useForm } from "react-hook-form";

const Form = () => {
    const defaultValues = {
        title: "",
        content: ""
    };
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({defaultValues});
  const contentValue = watch('content', '');

  const onSubmit = (data) => {
    console.log(data);
    const formData = {
        title: data.title,
        content: data.content,
        createdAt: new Date(),
        updateAt: new Date()
    }
    localStorage.setItem('note_' + Date.now(), JSON.stringify(formData));
    reset();
  };

  return (
    <div
      className="space-y-4"
    >
      <div>
        <label className="block text-md font-medium mb-1">
          Title
        </label>
        <input
          className={`w-full text-lg border border-gray-300 bg-white p-2 rounded ${errors.title ? 'outline-red-400' : 'outline-green-300'}`}
          placeholder="Enter note title"
          {...register("title", {
            required: "タイトルは必須です",
          })}
        />
        {errors.title && <p className="text-red-400">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block text-md font-medium mb-1">
          Content
        </label>
        <textarea
          className={`w-full text-lg border border-gray-300 bg-white p-2 rounded ${errors.content ? 'outline-red-400' : 'outline-green-300'}`}
          rows="10"
          cols="80" maxLength="800" placeholder="ここに800字以内で入力してください。"
          {...register("content", {
            required: "内容は必須です",
          })}
        ></textarea>
        {errors.content && <p className="text-red-400">{errors.content.message}</p>}
      </div>
      <div>
        {/* 文字数カウンター */}
        {/* 入力された文字数を表示 */}
        <p className="text-sm text-gray-500 text-right">{(contentValue || '').length} / 800</p>
      </div>
      <div className="submit-button">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          保存
        </button>
      </div>
    </div>
  );
};

export default Form;
