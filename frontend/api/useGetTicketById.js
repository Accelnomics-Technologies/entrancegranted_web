import { useQuery } from "@tanstack/react-query";
import { getApi } from "./utils/getApi";


const getTicketById = async (ticket_id) => {
    const response = await getApi(`api/admin/tickets/${ticket_id}`);
    return response;
};
  
export default function useGetTicketById(ticket_id) {
    return useQuery(["getTicketById", ticket_id], () => getTicketById(ticket_id), {
      enabled: !!ticket_id,
    });
}



