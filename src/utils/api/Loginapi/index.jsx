import api from ".."
import { path } from "../endpoint"


export const postlogindetails=async(details)=>{
    const url = await api.post(path.Account,details)
    return url?.data
}