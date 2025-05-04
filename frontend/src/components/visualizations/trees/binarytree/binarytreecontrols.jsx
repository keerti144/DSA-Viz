import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function BinaryTreeControls({ onInsert, onTraverse, onReset }) {
  const [value, setValue] = useState("");
  const [traversalType, setTraversalType] = useState("inorder");

  const handleInsert = () => {
    if (!isNaN(parseInt(value))) {
      onInsert(parseInt(value));
      setValue("");
    }
  };

  const handleTraversal = () => {
    onTraverse(traversalType);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={handleInsert}>Insert</Button>
        <Button variant="destructive" onClick={onReset}>
          Reset
        </Button>
      </div>
      <div className="flex gap-2">
        {["inorder", "preorder", "postorder"].map((type) => (
          <Button
            key={type}
            variant={traversalType === type ? "default" : "outline"}
            onClick={() => setTraversalType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
        <Button onClick={handleTraversal}>Traverse</Button>
      </div>
    </div>
  );
}

export default BinaryTreeControls;
