import React, { useState } from "react";
import Note from "../components/Note";
import { IoIosAddCircle } from "react-icons/io";

const Board = () => {
  const [notes, setNotes] = useState([]);

  const handleAdd = (text) => {
    setNotes((pre) => [
      ...pre,
      {
        id: pre.length + 1,
        content: text,
        position: {
          right: `${Math.ceil(Math.random() * (window.innerWidth - 200))}px`,
          top: `${Math.ceil(Math.random() * (window.innerHeight - 200))}px`,
        },
        pinned: false,
      },
    ]);
  };

  const togglePin = (index) => {
    const toggled = notes.map((el, i) =>
      index === i ? { ...el, pinned: !el.pinned } : el
    );
    setNotes(toggled);
  };

  const handleEdit = (text, index) => {
    const edited = notes.map((el, i) =>
      i === index ? { ...el, content: text } : el
    );
    setNotes(edited);
  };

  const handleDelete = (i) => {
    setNotes((pre) => {
      const deleted = [...pre];
      deleted.splice(i, 1);
      return deleted;
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#DAB63E",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {notes.length == 0 ? (
        <h1
          style={{
            textAlign: "center",
            width: "50%",
            margin: "200px auto",
            fontSize: "60px",
          }}
        >
          Start adding notes by clicking top-right "+" button
        </h1>
      ) : (
        notes.map((note, i) => (
          <Note
            key={note.id}
            index={i}
            {...note}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            togglePin={togglePin}
          />
        ))
      )}

      <IoIosAddCircle
        style={{
          position: "fixed",
          top: "30px",
          right: "30px",
        }}
        onClick={() => handleAdd("New Note")}
        fontSize={40}
      />
    </div>
  );
};

export default Board;
