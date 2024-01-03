import React, { useState, useEffect, useRef } from "react";
import { MdOutlineModeEdit, MdOutlinePushPin, MdPushPin } from "react-icons/md";

const Note = ({
  index,
  handleEdit,
  handleDelete,
  content,
  togglePin,
  position,
  pinned,
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);
  const dragIt = useRef(null);
  const [cursor, setCursor] = useState("grab");

  const handleDrag = (note) => {
    if (!pinned) {
      note.addEventListener("mousedown", (e) => {
        setCursor("grabbing")
        let offsetX = e.clientX - e.target.getBoundingClientRect().left;
        let offsetY = e.clientY - e.target.getBoundingClientRect().top;

        function handleMouseMove(e) {
          note.style.left = e.clientX - offsetX + "px";
          note.style.top = e.clientY - offsetY + "px";
        }

        function handleMouseUp() {
          setCursor("grab")
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      });
    }
  };

  useEffect(() => {
    if (dragIt.current) {
      handleDrag(dragIt.current);
    }
  }, []);

  const handleSave = () => {
    handleEdit(value, index);
    setEditing(false);
  };

  return (
    <div
      ref={dragIt}
      className="note"
      style={{
        ...position,
        height: "200px",
        padding: "5px",
        width: "200px",
        overflow: "hidden",
        backgroundColor: "yellow",
        position: "absolute",
        zIndex:pinned?2:1,
        cursor: cursor,
        boxShadow: "5px 5px 15px 0 rgba(0, 0, 0, .2)",
      }}
    >
      {editing ? (
        <>
          <textarea
            style={{
              backgroundColor: "yellow",
              outline: "none",
              border: "1px solid yellow",
              height: "80%",
              width: "110%",
              fontSize: "25px",
              fontFamily: "Shadows Into Light",
            }}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            autoFocus
          />
          <button
            onClick={handleSave}
            style={{
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p
            style={{
              fontSize: "25px",
              fontFamily: "Shadows Into Light",
            }}
          >
            {content}
          </p>
          <div style={{ fontSize: "20px" }}>
            <MdOutlineModeEdit
              onClick={() => setEditing(true)}
              style={{
                position: "absolute",
                bottom: "8px",
                right: "5px",
                cursor: "pointer",
              }}
            />
            <h3
              style={{
                position: "absolute",
                bottom: "160px",
                right: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(index)}
            >
              ×
            </h3>
            {!pinned ? (
              <MdOutlinePushPin
                onClick={() => togglePin(index)}
                style={{
                  position: "absolute",
                  bottom: "183px",
                  right: "30px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <MdPushPin
                onClick={() => togglePin(index)}
                style={{
                  position: "absolute",
                  bottom: "183px",
                  right: "30px",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
