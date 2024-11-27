import { useContext } from "react";
import NotesContext from "../context/NotesContext";

export default function ShareWithModal() {
  const { setShareModal, users } = useContext(NotesContext);

  console.log(users);
  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-[0.5] z-10"
        onClick={() => setShareModal(false)}
      />
      <select
        name="user"
        id=""
        className="w-[200px] absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#353535] p-2 rounded-md"
      >
        {users.map((user) => {
          return (
            <option key={user.id} value={`${user.id}`}>
              {user.first_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
