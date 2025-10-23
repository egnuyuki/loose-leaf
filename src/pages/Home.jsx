import React from "react";
import { Plus, Leaf } from "lucide-react";
import CreateButton from "../components/CreateButton";
import ReactMarkdown  from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Home = () => {
  const handleCreateNote = () => {
    // Logic to create a new note
    console.log("Create Note button clicked");
  };
  const markdown = `
  # Welcome to Loose Leaf!

  This is a simple note-taking application where you can create, edit, and manage your notes efficiently.
  
  ## Features
  - Create new notes
  - Edit existing notes
  - View a list of all your notes
  - Markdown support for rich text formatting
  
  ## Getting Started
  To create a new note, click on the "Create Note" button below. You can then enter your note title and content.

  Happy note-taking!
  `
  return (
    <div className="space-y-8">
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4 space-x-2">
            <h1 className="text-2xl font-bold">Welcome to the Loose Leaf</h1>
            <Leaf/>
        </div>
        <p>This is the home page of the application.</p>
      </div>
      <CreateButton onClick={handleCreateNote}/>
      <ReactMarkdown  remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default Home;
