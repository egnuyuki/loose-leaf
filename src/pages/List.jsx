import React, { useEffect } from "react";
import { Calendar, FileText } from "lucide-react";
import { Link } from "react-router";
import CreateButton from "../components/CreateButton";
import Card from "../components/Card";

const List = () => {

  const [Notes, setNotes] = React.useState([]);

  useEffect(() => {
    // データ取得
    // データ取得　仮でLocalStorageから取得する形にする
    const fetchNotes = () => {
      const notes = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("note_")) {
          const note = JSON.parse(localStorage.getItem(key));
          note.id = key.replace("note_", "");
          notes.push(note);
        }
      }
      // 更新日時でソート（降順）
      notes.sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt));
      return notes;
    };
    const Note = fetchNotes();
    setNotes(Note);

  }, []);

  return (
    <div className="space-y-8">
        <CreateButton />
      <div className="space-y-3">
        {Notes.length === 0 && (
          <p className="text-gray-500 text-center">No notes available. Create a new note!</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Notes.map((note) => (
          <Card note={note} key={note.id}/>
        ))}
      </div>
    </div>
  );
};

export default List;
