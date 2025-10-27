import React from "react";
import { Plus, Leaf } from "lucide-react";
import CreateButton from "../components/CreateButton";
import MarkdownViewer from "../components/MarkdownViewer";

const Home = () => {
  const handleCreateNote = () => {
    // Logic to create a new note
    console.log("Create Note button clicked");
  };
  const markdown = `
  # 見出し1
## 見出し2

これは **太字** で、これは *斜体* です。

- リスト項目1
- リスト項目2
- リスト項目3

\`inline code\` の例です。

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> これは引用文です。
> 複数行にわたることもできます。

[リンクの例](https://example.com)
![画像の例](https://images.unsplash.com/photo-1755616491504-04cb286c09c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1168)

---

| 見出しA | 見出しB |
|---------|---------|
| データ1  | データ2  |
| データ3  | データ4  |


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
      <MarkdownViewer content={markdown} />
    </div>
  );
};

export default Home;
