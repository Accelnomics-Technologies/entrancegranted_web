import { postApi } from "./utils/postApi"
import { useMutation } from "@tanstack/react-query";

const signin=async(data)=>{
    const response=await postApi(`api/auth/signin`,data)
    return response
}


export default function usePostSignIn(){
    return useMutation(data=>signin(data))
}