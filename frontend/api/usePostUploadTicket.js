import { useMutation } from "@tanstack/react-query";

const { postApi } = require("./utils/postApi");

const uploadTicket = async (data) => {
  const response = await postApi(`api/admin/get_json`, data);
  return response;
};

export default function usePostUploadTicket() {
  return useMutation((data) => uploadTicket(data));
}