import axios from "axios";
import { useAppStore } from "store/store";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  const token = useAppStore.getState().user.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response && error?.response?.status === 401) {
      useAppStore.getState().logout();
      typeof window !== "undefined" && localStorage?.clear();
      typeof window !== "undefined"
        ? (window.location.href = "/login/")
        : null;
    }
    return error;
  }
);

export const getApi = async (url) => {
  try {
    const { data } = await instance.get(`/${url}`, { withCredentials: true });
    return {
      data: data?.data,
      message: data?.message,
      success: true,
    };
  } catch (error) {
    console.log(">>", error);
    throw error?.response?.data?.error || "Server Error";
  }
};


