/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { instance } from "../../axios";
// components
import NotesList from "./NotesList";
import Loader from "../../components/Loader";
//style
import "./Skeleton.css";
import NotesContext from "../../context/NotesContext";
import gsap from "gsap";

export default function GetNotes({ setIsConnected }) {
  const [showOption, setShowOption] = useState({ isActive: false, id: null });
  const {
    notes,
    notesLoding,
    setNotes,
    setShowAddNoteModal,
    showAddNoteModal,
  } = useContext(NotesContext);
  const tableBodyRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsConnected(false);
  };

  useEffect(() => {
    if (notes.length > 0) {
      gsap.fromTo(
        tableBodyRef.current.children, // target all table rows
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          position: "relative",
          zIndex: 2,
          y: 0,
          duration: 0.5,
        }
      );
    }
  }, [notes]);

  const handleRemoveNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setNotes((prev) => prev.filter((el) => el.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const { first_name, last_name } = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="container m-auto">
      <h2 className=" p-6 text-[2rem]">
        Welcom{" "}
        <strong>
          {" "}
          {first_name.toLowerCase() + " " + last_name.toLowerCase()}
        </strong>
      </h2>
      <div className="flex justify-between p-6">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => setShowAddNoteModal(!showAddNoteModal)}>
          Add Note
        </button>
      </div>
      <table
        ref={tableBodyRef}
        className="w-[80%] m-auto max-w-[1000px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#1a1a1a] dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              title
            </th>
            <th>note</th>
            <th>is Owner</th>
            <th>Shared with</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notes && (
            <Loader loading={notesLoding} type="notes">
              {notes.map((el) => (
                <>
                  {console.log("render")}

                  <NotesList
                    key={el.id}
                    el={el}
                    handleRemoveNote={handleRemoveNote}
                    setShowOption={setShowOption}
                    showOption={showOption}
                  />
                </>
              ))}
            </Loader>
          )}
        </tbody>
      </table>
    </div>
  );
}
