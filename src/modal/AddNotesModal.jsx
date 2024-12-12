import { useContext, useEffect, useState } from "react";
import { instance } from "../axios";
import Select from "react-select";
import NotesContext from "../context/NotesContext";
export default function AddNotesModal() {
  const [formFields, setFormFeilds] = useState({
    title: "",
    content: "",
    shared_with: [],
  });

  const { setNotes, setShowAddNoteModal, showAddNoteModal } =
    useContext(NotesContext);

  const AddNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await instance.post("/notes", formFields, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prev) => [...prev, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-[0.5] z-10"
        onClick={() => setShowAddNoteModal(false)}
      ></div>
      <form
        onSubmit={(e) => AddNote(e)}
        className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <div className="mb-6 bg-[#353535] p-6 rounded-md">
          <div>
            <label
              htmlFor="Note Title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Note Title
            </label>
            <input
              type="text"
              onChange={(e) =>
                setFormFeilds((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              name="title"
              id="Note Title"
              className="mb-4 rounded px-3 h-10  bg-[#1a1a1a] outline-none border-transparent border-[1px] hover:border-[#646cff] hover:border-[1px] hover:border-solid transition"
              placeholder="Note Title"
              value={formFields.title}
              required
            />
          </div>
          <div>
            <label
              htmlFor={"Note Content"}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Note Content
            </label>
            <input
              type="text"
              value={formFields.content}
              onChange={(e) =>
                setFormFeilds((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              id="Note Content"
              name="content"
              className="mb-4 rounded px-3 h-10  bg-[#1a1a1a] outline-none border-transparent border-[1px] hover:border-[#646cff] hover:border-[1px] hover:border-solid transition"
              placeholder="Note Content"
              required
            />
          </div>

          <button className="w-full" onClick={() => setShowAddNoteModal(!showAddNoteModal)}>Add</button>
        </div>
      </form>
    </div>
  );
}
