import React from "react";
import { Calendar, FileText } from "lucide-react";
import { Link } from "react-router";
import CreateButton from "../components/CreateButton";

const List = () => {
  // 仮のデータ
  const Notes = [
    {
      id: 1,
      title: "First Note",
      content: "This is the content of the first note.",
      updatedAt: "2024-10-01T10:00:00Z",
    },
    {
      id: 2,
      title: "Second Note",
      content: "This is the content of the second note.",
      updatedAt: "2024-10-02T12:30:00Z",
    },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="space-y-8">
        <CreateButton onClick={() => {console.log("create")}} />
      <div className="space-y-3">
        {Notes.map((note) => (
          <Link
            key={note.id}
            to={`/note/${note.id}`}
            className="block bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-green-200 transition-all duration-200 group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors flex-1 mr-4">
                  {note.title || "Untitled"}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(note.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {note.content && (
                <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                  {note.content}
                </p>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <FileText className="h-3 w-3" />
                    <span>{note.content.length} characters</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;
