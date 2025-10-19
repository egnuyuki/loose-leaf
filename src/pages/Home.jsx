import React from "react";
import { Plus, Leaf } from "lucide-react";
import CreateButton from "../components/CreateButton";

const Home = () => {
  const handleCreateNote = () => {
    // Logic to create a new note
    console.log("Create Note button clicked");
    
  };
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
    </div>
  );
};

export default Home;
