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

instance.interceptors.response.use((error) => {
  if (error?.response && error?.response?.status === 401) {
    typeof window !== "undefined" && localStorage?.clear();
    useAppStore.getState().logout();
  }
  return error;
});

export const postApi = async (url, payLoad) => {
  try {
    const { data, status } = await instance.post(`/${url}`, payLoad, {
      withCredentials: true,
    });
    return {
      data: data?.data,
      message: data?.message,
      success: status === 200,
    };
  } catch (error) {
    console.log(">>",error);
    return {
      data: null,
      message: error?.response?.data?.error || "Server Error",
      success: false,
      status: error?.response?.status,
    };
  }
};

