import React from "react";
import { Link } from "react-router-dom";
import { usePath } from "../contexts/PathContext";
import { Home, List, FileText } from "lucide-react";

const Navigation = () => {
  const { currentPath } = usePath();
  const isActive = (path) => currentPath === path;
  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-gray-600 transition-colors"
              >
                <FileText className="h-6 w-6" />
                <span>Loose Leaf</span>
              </Link>

              <div className="hidden sm:flex space-x-1">
                <Link
                  to="/"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive("/")
                      ? "bg-green-50 text-green-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>

                <Link
                  to="/list"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive("/list")
                      ? "bg-green-50 text-green-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span>All Notes</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* モバイルナビ */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-2 h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive("/") ? "text-green-600" : "text-gray-600"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </Link>

          <Link
            to="/list"
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive("/list") ? "text-green-600" : "text-gray-600"
            }`}
          >
            <List className="h-5 w-5" />
            <span className="text-xs font-medium">Notes</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
