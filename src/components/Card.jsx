import React from "react";
import { Link } from "react-router";
import { Calendar, FileText } from "lucide-react";

const Card = ({note}) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <Link
      to={`/note/${note.id}`}
      className="block bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-green-200 transition-all duration-200 group"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors flex-1 mr-4">
            {note.title || "Untitled"}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500 whitespace-nowrap">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(note.updatedAt ?? note.createdAt)}</span>
            </div>
          </div>
        </div>

        {note.content && (
          <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed truncate">
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
  );
};

export default Card;
