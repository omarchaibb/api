import { useEffect, useState } from "react";
import GetNotes from "./components/getNotes/GetNotes";
import Login from "./components/login/Login";
import AddNotesModal from "./modal/AddNotesModal";
import NotesContext from "./context/NotesContext";
import useGetNotes from "./hooks/useGetNotes";
import UpdateFormModal from "./modal/UpdateFormModal";
import ShareWithModal from "./modal/ShareWithModal";
import { instance } from "./axios";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    token ? setIsConnected(true) : setIsConnected(false);
  }, [token]);
  const { notesLoding, notes, setNotes } = useGetNotes();
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showShareModal, setShareModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState({
    id: null,
    isShow: false,
  });

  useEffect(() => {
    async function GetUsers() {
      try {
        const response = await instance.get("/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        return error;
      }
    }
    GetUsers();
  }, []);

  return (
    <>
      {isConnected ? (
        <>
          <NotesContext.Provider
            value={{
              showUpdateModal,
              setShowUpdateModal,
              notes,
              setNotes,
              notesLoding,
              setShowAddNoteModal,
              showAddNoteModal,
              showShareModal,
              setShareModal,
              users,
            }}
          >
            <GetNotes setIsConnected={setIsConnected} />
            {showAddNoteModal && <AddNotesModal />}
            {showUpdateModal.isShow && (
              <UpdateFormModal showUpdateModal={showUpdateModal} />
            )}
            {showShareModal && <ShareWithModal />}
          </NotesContext.Provider>
        </>
      ) : (
        <Login setIsConnected={setIsConnected} />
      )}
    </>
  );
}

export default App;
