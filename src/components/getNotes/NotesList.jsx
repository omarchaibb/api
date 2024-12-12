import { useContext, useState } from "react";
import NotesContext from "../../context/NotesContext";

/* eslint-disable react/prop-types */
export default function NotesList({
  el,
  setShowOption,
  handleRemoveNote,
  showOption,
}) {
  const { setShowUpdateModal, setShareModal } = useContext(NotesContext);

  return (
    <tr className="bg-white border-b dark:bg-[#353535] dark:border-gray-700 hover:bg-[#5b5b5b]">
      <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
        {el.title}
      </td>
      <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
        {el.content}
      </td>
      <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
        {el.is_owner ? "true" : "false"}
      </td>
      <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
        {el.shared_with?.length > 0
          ? el.shared_with.map((e, index) => (
              <div key={index}>{e.first_name}</div>
            ))
          : "no one"}
      </td>

      {/* options td  */}
      <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white ">
        <div
          onClick={() => {
            setShowOption({
              isActive: el.id !== showOption.id ? true : !showOption.isActive,
              id: el.id,
            });
            console.log(showOption.id, el.id);
          }}
          className="w-fit cursor-pointer h-full relative "
        >
          {
            <div
              className={`options  flex flex-col gap-2 absolute z-40 right-[-97px] bottom-[-160px] bg-[#464646] p-[10px] rounded-[10px] transition-all duration-300 ${
                showOption.id == el.id && showOption.isActive
                  ? "transition-y-[0px] scale-1 opacity-1"
                  : "translate-y-[-10px] scale-0 opacity-0"
              }`}
            >
              {/* edite button  */}
              <button
                className="flex gap-[10px] items-center justify-between w-[102px] "
                onClick={() =>
                  setShowUpdateModal((prev) => ({
                    ...prev,
                    id: el.id,
                    isShow: true,
                  }))
                }
              >
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <span>Edit</span>
              </button>
              {/*  delete button  */}

              <button
                onClick={() => handleRemoveNote(el.id)}
                className="flex gap-[10px] items-center justify-between w-[102px] text-[#f93a37] "
              >
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <span>delete</span>
              </button>
              {/* share button  */}

              <button
                className="flex gap-[10px] items-center justify-between w-[102px] "
                onClick={() => {
                  setShareModal((prev) => ({
                    ...prev,
                    id: el.id,
                    isShow: !prev.isShow,
                  }));
                }}
              >
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289L16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711C16.3166 9.09763 15.6834 9.09763 15.2929 8.70711L13 6.41421V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V6.41421L8.70711 8.70711C8.31658 9.09763 7.68342 9.09763 7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289L11.2929 3.29289ZM4 14C4.55228 14 5 14.4477 5 15V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V15C19 14.4477 19.4477 14 20 14C20.5523 14 21 14.4477 21 15V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V15C3 14.4477 3.44772 14 4 14Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <span>Share</span>
              </button>
            </div>
          }
          <span>. . .</span>
        </div>
      </td>
    </tr>
  );
}
