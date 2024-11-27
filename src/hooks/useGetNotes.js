import { instance } from "../axios";

import{ useEffect, useState } from "react";

export default function useGetNotes() {
  const [notesLoding, setNotesLoadin] = useState("idle");
  const [notes, setNotes] = useState([]);
  const GetNotes = async () => {
    setNotesLoadin("pending");
    try {
      const token = localStorage.getItem("token");
      const response = await instance.get(`/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotesLoadin("fulfield");
      setNotes(response.data);
    } catch (error) {
      console.log(error);
      setNotesLoadin("rejected");
    }
  };

  useEffect(() => {
    GetNotes();
  }, [setNotes]);

  return {notesLoding, notes , setNotes};
}
