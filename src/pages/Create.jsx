import { use, useState } from "react";
import Form from "../components/Form";

const Create = () => {

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    createdAt: new Date(),
    updateAt: new Date()
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      [name]: value,
    });
    console.log(formData);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const isValid = validateForm();
    if (!isValid) {
      console.log("Form validation failed");
      return;
    }
    console.log("Form submitted");
  }

  const validateForm = () => {
    // Implement form validation logic here

    return true;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Note</h1>
      {/* Form or content for creating a new note goes here */}
      <Form />
    </div>
  );
}
export default Create;