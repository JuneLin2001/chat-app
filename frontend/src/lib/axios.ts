import axio from "axios";

export const axiosInstance = axio.create({
  baseURL:
    import.meta.env.MODE === "development" ? "http://localhost:5001" : "/api",
  withCredentials: true,
});
