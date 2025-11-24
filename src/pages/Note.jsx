import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDate } from "../utils/date";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import MarkdownViewer from "../components/MarkdownViewer";

const Note = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [editLink, setEditLink] = useState("");

  useEffect(() => {
    const key = `note_${id}`;
    const noteItem = localStorage.getItem(key);
    if (noteItem) {
      try {
        const parsed = JSON.parse(noteItem);
        parsed.id = id;
        setNote(parsed);
        setEditLink(`/edit/${id}`);
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
      <div className="flex justify-between items-center">
        <Link
          to="/list"
          className="text-sm mb-3 w-fit flex items-center text-gray-500 hover:text-gray-700"
        >
          <ChevronsLeft />
          Back
        </Link>
        <Link
          to={editLink}
          className="text-sm mb-3 w-fit flex items-center text-gray-500 hover:text-gray-700"
        >
          Edit
          <ChevronsRight />
        </Link>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{note.title || "Untitled"}</h1>

        <div className="mt-6 text-sm text-gray-500">
          { (note.updatedAt || note.updateAt) ? (
            <div>{formatDate(note.updatedAt || note.updateAt)}</div>
          ) : (
            <div>{formatDate(note.createdAt)}</div>
          )}
        </div>
      </div>

      <div className="prose max-w-none">
        {/* Prefer markdown (md) saved with the note; fall back to string content if present */}
        <MarkdownViewer content={note.content } />
      </div>
    </div>
  );
};

export default Note;
