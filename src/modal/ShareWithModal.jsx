import { useContext, useState } from "react";
import NotesContext from "../context/NotesContext";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { instance } from "../axios";

const animatedComponents = makeAnimated();

export default function ShareWithModal({ showShareModal }) {
  console.log("this is the modal " + showShareModal.id);
  const [selectedValues, setSelectedValues] = useState([]);

  console.log(selectedValues);
  const { setShareModal, users, setNotes } = useContext(NotesContext);

  const handleSelectedOptions = (option) => {
    setSelectedValues(option.map((el) => el.id));
  };

  const updateShatedWith = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await instance.put(
        `/notes/${showShareModal.id}`,
        { shared_with: selectedValues },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === showShareModal.id ? { ...note, ...response.data } : note
        )
      );
      setShareModal((prev) => ({ ...prev, isShow: false }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-[0.5] z-10"
        onClick={() => setShareModal(false)}
      />
      <div className=" flex gap-7 absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#353535] p-2 rounded-md">
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={users.map((el) => ({
            id: el.id,
            value: el.id,
            label: el.first_name,
          }))}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "#353535",
              minWidth: "200px",
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: "#353535",
              color: "white",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused && "rgb(72 72 72)",
              padding: "10px",
              cursor: "pointer",
            }),
          }}
          onChange={handleSelectedOptions}
        />

        <button onClick={() => updateShatedWith()}>Share</button>
      </div>
    </div>
  );
}
