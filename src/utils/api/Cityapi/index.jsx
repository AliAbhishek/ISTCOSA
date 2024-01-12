import api from ".."
import { path } from "../endpoint"



export const postcity=async (details)=>{
    const url=await api.post(path.PostCity,details)
    return url?.data
}
export const deletecity=async (id)=>{
    const url=await api.delete(path.DeleteCity+"?id=" +id)
    return url?.data
}
export const updatecity=async (id,details)=>{
    const url=await api.put(path.PutCity+"?id=" +id,details)
    return url?.data
}