import { ChevronsLeft, Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";

const Edit = () => {
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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      {/* Form or content for creating a new note goes here */}
      <Form note={note}/>
    </div>
  );
};

export default Edit;
