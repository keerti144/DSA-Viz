// src/components/visualizations/trees/AvlTreeControls.jsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AvlTreeControls = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const handleInsert = () => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      onInsert(num);
      setValue('');
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleInsert}>Insert</Button>
    </div>
  );
};

export default AvlTreeControls;
