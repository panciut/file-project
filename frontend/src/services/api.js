import axios from "axios";

const backendPort = process.env.REACT_APP_BACKEND_PORT || 3002;
const api = axios.create({
  baseURL: `http://localhost:${backendPort}`,
});

export const createProject = (data) => api.post("/api/createProject", data);
export const loadProject = (data) => api.post("/api/loadProject", data);
export const addFiles = (data) => api.post("/api/addFiles", data);
export const listConfigs = () => api.get("/api/configs");
