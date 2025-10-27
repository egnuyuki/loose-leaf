import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate } from "../utils/date";
import { ChevronsLeft } from "lucide-react";
import MarkdownViewer from "../components/MarkdownViewer";

const Note = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const key = `note_${id}`;
    const noteItem = localStorage.getItem(key);
    if (noteItem) {
      try {
        const parsed = JSON.parse(noteItem);
        parsed.id = id;
        setNote(parsed);
      } catch (e) {
        console.error("Failed to parse note from localStorage", e);
        setNote(null);
      }
    } else {
      setNote(null);
    }
  }, [id]);

  if (note === null) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-gray-500">Note not found.</p>
        <Link
          to="/list"
          className="text-sm mb-3 flex items-center text-gray-500 hover:text-gray-700"
        >
          <ChevronsLeft />
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/list"
        className="text-sm mb-3 w-fit flex items-center text-gray-500 hover:text-gray-700"
      >
        <ChevronsLeft />
        Back
      </Link>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{note.title || "Untitled"}</h1>

        <div className="mt-6 text-sm text-gray-500">
          {note.updatedAt ? (
            <div>{formatDate(note.updatedAt)}</div>
          ) : (
            <div>{formatDate(note.createdAt)}</div>
          )}
        </div>
      </div>

      <div className="prose max-w-none">
        <MarkdownViewer content={note.content || ""} />
      </div>
    </div>
  );
};

export default Note;
