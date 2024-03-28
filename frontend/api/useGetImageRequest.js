import { useQuery } from "@tanstack/react-query";
import { getApi } from "./utils/getApi";


const imageRequest = async (ticket_id) => {
    const response = await getApi(`api/admin/ticket_image/${ticket_id}`);
    return response;
};
  
export default function useGetImageRequest(ticket_id) {
    return useQuery(["imageRequest", ticket_id], () => imageRequest(ticket_id), {
      enabled: !!ticket_id,
    });
}



