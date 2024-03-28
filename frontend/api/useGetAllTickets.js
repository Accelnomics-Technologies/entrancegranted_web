import { useQuery } from "@tanstack/react-query";
import { getApi } from "./utils/getApi";

const getAllTickets = async () => {
  const response = await getApi(`api/admin/all_Ticket`);
  return response;
};

export default function useGetAllTickets() {
  return useQuery(["getAllTickets"], getAllTickets);
}