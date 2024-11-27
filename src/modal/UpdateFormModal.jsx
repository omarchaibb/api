import { useContext, useEffect, useState } from "react";
import { instance } from "../axios";
import NotesContext from "../context/NotesContext";

export default function UpdateFormModal({ showUpdateModal }) {
  const [formFields, setFormFields] = useState({
    title: "",
    content: "",
    shared_with: [],
  });
  const { setNotes, setShowUpdateModal } = useContext(NotesContext);
  const id = showUpdateModal.id;

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await instance.get(`/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormFields(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNote();
  }, [id]);

  const updateNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await instance.put(`/notes/${id}`, formFields, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, ...response.data } : note
        )
      );
      setShowUpdateModal((prev) => ({ ...prev, isShow: false }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-[0.5] z-10"
        onClick={() =>
          setShowUpdateModal((prev) => ({ ...prev, isShow: false }))
        }
      ></div>
      <form
        onSubmit={updateNote}
        className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#353535] p-6 rounded-md"
      >
        <div>
          <label htmlFor="NoteTitle" className="block mb-2 text-sm font-medium">
            Note Title
          </label>
          <input
            type="text"
            id="NoteTitle"
            name="title"
            value={formFields.title}
            onChange={(e) =>
              setFormFields((prev) => ({ ...prev, title: e.target.value }))
            }
            className="mb-4 rounded px-3 h-10 bg-[#1a1a1a] outline-none border-transparent border-[1px] hover:border-[#646cff] transition"
            placeholder="Note Title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="NoteContent"
            className="block mb-2 text-sm font-medium"
          >
            Note Content
          </label>
          <input
            type="text"
            id="NoteContent"
            name="content"
            value={formFields.content}
            onChange={(e) =>
              setFormFields((prev) => ({ ...prev, content: e.target.value }))
            }
            className="mb-4 rounded px-3 h-10 bg-[#1a1a1a] outline-none border-transparent border-[1px] hover:border-[#646cff] transition"
            placeholder="Note Content"
            required
          />
        </div>

        <button className="w-full ">Update</button>
      </form>
    </div>
  );
}
