import React, { useState } from "react";
import LinkedListControls from "../LinkedListControls";
import LinkedListDisplay from "../LinkedListDisplay";

const SinglyLinkedListVisualizer = () => {
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
    <div className="visualizer">
      <h2>Singly Linked List</h2>

      <LinkedListControls
        onInsertFront={insertFront}
        onInsertBack={insertBack}
        onDeleteFront={deleteFront}
        onDeleteBack={deleteBack}
        onReverse={reverseList}
        isAnimating={false}
        isEmpty={list.length === 0}
      />

      <LinkedListDisplay list={list} highlightedNodes={[]} />
    </div>
  );
};

export default SinglyLinkedListVisualizer;
