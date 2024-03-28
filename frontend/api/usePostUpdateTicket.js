import { useMutation } from "@tanstack/react-query";

const { postApi } = require("./utils/postApi");

const updateTicket = async (ticket_id, bodyData) => {
  const response = await postApi(`api/admin/update_tickets?ticket_id=${ticket_id}`, bodyData);
  return response;
};

export default function usePostUpdateTicket() {
  return useMutation((data) => updateTicket(data.ticket_id, data.bodyData));
}