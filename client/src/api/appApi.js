import api from "./axios";

export const createApp = (data) => api.post("/apps", data);

export const getApps = () => api.get("/apps");

export const getAppById = (id) => api.get(`/apps/${id}`);

export const updateApp = (id, data) =>
  api.put(`/apps/${id}`, data);

export const deleteApp = (id) =>
  api.delete(`/apps/${id}`);