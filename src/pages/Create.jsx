import { use, useState } from "react";
import Form from "../components/Form";

const Create = () => {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Note</h1>
      {/* Form or content for creating a new note goes here */}
      <Form />
    </div>
  );
}
export default Create;