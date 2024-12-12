/* eslint-disable react/prop-types */
import { useState } from "react";
import { instance } from "../../axios";
import { CircularProgress } from "@mui/material";

export default function Login({ setIsConnected }) {
  const [formValues, setFormValues] = useState({ cin: "", password: "" });
  const [isLoading, setIsLoading] = useState("idle");
  const [error, setError] = useState("");

  const handleFormInputs = async (e) => {
    e.preventDefault();

    if (formValues.cin && formValues.password) {
      setError("");
      setIsLoading("pending");
      try {
        const response = await instance.post(`/login`, formValues);
        const token = response.data?.token;
        const user = response.data?.user;
        setIsLoading("fulfield");
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user",JSON.stringify(user) );
          return setIsConnected(true);
        }
        return setIsConnected(false);
      } catch (error) {
        console.log(error);
        setIsLoading("rejected");
      }
    } else {
      setError("cin and password not valid");
    }
  };

  return (
    <>
      {isLoading !== "pending" ? (
        <div className=" h-screen flex items-center justify-center">
          <div className="bg-[#353535] p-6 rounded-md  min-w-[300px] ">
          <h2 className="mb-4 text-[1.7rem]">login </h2>
            <form
              action=""
              className="flex flex-col"
              onSubmit={handleFormInputs}
            >
              <input
                type="text"
                placeholder="CIN"
                className="mb-4 rounded px-3 h-10  bg-[#1a1a1a] outline-none border-transparent border-[1px] hover:border-[#646cff] hover:border-[1px] hover:border-solid transition"
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, cin: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Password"
                className="rounded px-3 h-10 bg-[#1a1a1a] outline-none border-transparent border-[1px] hover:border-[#646cff] hover:border-[1px] hover:border-solid transition"
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <button style={{ width: "100%", marginTop: "10px" }}>
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={30} />
        </div>
      )}
    </>
  );
}
