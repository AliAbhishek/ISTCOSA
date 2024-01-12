import api from ".."
import { path } from "../endpoint"




export const poststate =async (details)=>{
    const url = await api.post(path.PostState,details)
    return url?.data
}
export const deletestate =async (id)=>{
    const url = await api.delete(path.DeleteState + "?id="+id)
    return url?.data
}
export const updatestate =async (id,details)=>{
    const url = await api.put(path.PutState + "?id="+id,details)
    return url?.data
}