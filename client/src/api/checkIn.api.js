import api from "./axios";

// Create Check-In (Mobile App)
export const createCheckIn = async (data) => {
  return await api.post("/check-ins", data);
};

// Get All Check-Ins By App
export const getCheckInsByApp = async (appId) => {
  return await api.get(`/check-ins/${appId}`);
};

// Filter Check-Ins By Date
export const filterCheckIns = async (appId, from, to) => {
  return await api.get(
    `/check-ins/${appId}?from=${from}&to=${to}`
  );
};