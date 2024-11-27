import axios from "axios";

export const instance = axios.create({
  baseURL: "https://notes.devlop.tech/api",
});
