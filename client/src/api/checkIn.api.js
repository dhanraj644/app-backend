import api from "./axios";

// Create Check-In
export const createCheckIn = (data) => {
  return api.post("/check-ins", data);
};

// Get All Check-Ins (with optional query filters: deviceId, appId, from, to)
export const getCheckIns = (params = {}) => {
  return api.get("/check-ins", { params });
};

// Get Check-Ins By App
export const getCheckInsByApp = (appId, params = {}) => {
  return api.get(`/check-ins/app/${appId}`, { params });
};

// Delete Check-In
export const deleteCheckIn = (id) => {
  return api.delete(`/check-ins/${id}`);
};