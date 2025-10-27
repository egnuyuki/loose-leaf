import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownViewer({ content }) {
  const markdownComponents = {
    h1: ({ node, ...props }) => <h1 className="text-3xl" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl" {...props} />,
    li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
    a: ({ node, ...props }) => (
      <a
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="italic text-gray-600 bg-gray-100 py-1"
        {...props}
      />
    ),
    img: ({ node, ...props }) => (
      <img className="rounded-lg shadow-md my-4 max-w-full h-auto" {...props} />
    ),
    hr: ({ node, ...props }) => (
      <hr className="my-8 border-gray-300" {...props} />
    ),
  };
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
