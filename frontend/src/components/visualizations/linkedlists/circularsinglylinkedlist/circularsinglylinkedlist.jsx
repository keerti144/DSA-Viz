import React, { useState } from "react";
import LinkedListControls from "../LinkedListControls";
import LinkedListDisplay from "../LinkedListDisplay";

const CircularSinglyLinkedListVisualizer = () => {
  const [list, setList] = useState([]);

  const insertFront = (value) => {
    setList([value, ...list]);
  };

  const insertBack = (value) => {
    setList([...list, value]);
  };

  const deleteFront = () => {
    setList(list.slice(1));
  };

  const deleteBack = () => {
    setList(list.slice(0, -1));
  };

  const reverseList = () => {
    setList([...list].reverse());
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#0f172a", minHeight: "100vh" }}>
      <h2 style={{ color: "#f8fafc", fontSize: "2rem", marginBottom: "1rem" }}>
        Circular Singly Linked List
      </h2>

      <LinkedListControls
        onInsertFront={insertFront}
        onInsertBack={insertBack}
        onDeleteFront={deleteFront}
        onDeleteBack={deleteBack}
        onReverse={reverseList}
        isAnimating={false}
        isEmpty={list.length === 0}
      />

      <LinkedListDisplay list={list} highlightedNodes={[]} isCircular />
    </div>
  );
};

export default CircularSinglyLinkedListVisualizer;
