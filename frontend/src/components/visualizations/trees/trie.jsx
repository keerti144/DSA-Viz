import React, { useState } from "react";
import Button from "../../ui/Button";
import { BackButton } from "../../ui/BackButton";
import classes from "../Trees.module.css";

const Trie = () => {
  const [trieRoot, setTrieRoot] = useState(new TrieNode(""));
  const [word, setWord] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  class TrieNode {
    constructor(char) {
      this.char = char;
      this.children = {};
      this.isEndOfWord = false;
    }
  }

  const insert = (root, word) => {
    let node = root;
    for (let ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode(ch);
      }
      node = node.children[ch];
    }
    node.isEndOfWord = true;
  };

  const search = (root, word) => {
    let node = root;
    for (let ch of word) {
      if (!node.children[ch]) {
        return false;
      }
      node = node.children[ch];
    }
    return node.isEndOfWord;
  };

  const handleInsert = () => {
    if (word.trim() === "") return;
    insert(trieRoot, word.trim().toLowerCase());
    setWord("");
  };

  const handleSearch = () => {
    if (searchWord.trim() === "") return;
    const found = search(trieRoot, searchWord.trim().toLowerCase());
    setSearchResult(found);
    setSearchWord("");
  };

  const displayTrie = (node) => {
    if (!node) return null;

    return (
      <div className={classes.node}>
        {node.char}
        <div className={classes.children}>
          {Object.values(node.children).map((child, index) => (
            <div key={index}>
              {displayTrie(child)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <h2 className={classes.heading}>Trie (Prefix Tree)</h2>

      <div className={classes.controls}>
        <input
          type="text"
          placeholder="Enter word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <Button onClick={handleInsert}>Insert Word</Button>
      </div>

      <div className={classes.controls}>
        <input
          type="text"
          placeholder="Search word"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <Button onClick={handleSearch}>Search Word</Button>
      </div>

      {searchResult !== null && (
        <div className={classes.result}>
          {searchResult ? "Word Found ✅" : "Word Not Found ❌"}
        </div>
      )}

      <div className={classes.treeContainer}>
        {displayTrie(trieRoot)}
      </div>
    </div>
  );
};

export default Trie;
