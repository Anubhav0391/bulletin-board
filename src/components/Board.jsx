import React, { useState } from "react";
import Note from "./Note";
import { IoIosAddCircle } from "react-icons/io";

const Board = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'This is initial note-1',
      position: {
        right: `${Math.ceil(Math.random() * (window.innerWidth - 200))}px`,
        top: `${Math.ceil(Math.random() * (window.innerHeight - 200))}px`,
      },
      pinned:false
    },
    {
      id: 2,
      content: 'This is initial note-2',
      position: {
        right: `${Math.ceil(Math.random() * (window.innerWidth - 200))}px`,
        top: `${Math.ceil(Math.random() * (window.innerHeight - 200))}px`,
      },
      pinned:false
    },
    {
      id: 3,
      content: 'This is initial note-3',
      position: {
        right: `${Math.ceil(Math.random() * (window.innerWidth - 200))}px`,
        top: `${Math.ceil(Math.random() * (window.innerHeight - 200))}px`,
      },
      pinned:false
    },
  ]);

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
        pinned:false
      },
    ]);
  };

  const togglePin = (index) => {
    const toggled = notes.map((el,i) =>
      index === i ? { ...el, pinned: !el.pinned } : el
    );
    setNotes(toggled);
  };

  const handleEdit = (text, index) => {
    const edited = notes.map((el,i) =>
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
      {notes.map((note, i) => (
        <Note
          key={note.id}
          index={i}
          {...note}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          togglePin={togglePin}
        />
      ))}

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
