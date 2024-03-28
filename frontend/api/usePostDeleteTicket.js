import { useMutation } from "@tanstack/react-query";

const { postApi } = require("./utils/postApi");

const deleteTicket = async (ticket_id) => {
  const response = await postApi(`api/admin/del_tickets?ticket_id=${ticket_id}`);
  return response;
};

export default function usePostDeleteTicket() {
  return useMutation((ticket_id) => deleteTicket(ticket_id));
}