import api from ".."
import { path } from "../endpoint"



export const postcountry=async(details)=>{
    const url = await api.post(path.PostCountry,details)
    return url?.data
}
export const deletecountry=async(id)=>{
    const url = await api.delete(path.DeleteCountry+"?id="+id)
    return url?.data
}
export const Updatecountry=async(id,detail)=>{
    const url = await api.put(path.PutCountry+"?id="+id,detail)
    return url?.data
}