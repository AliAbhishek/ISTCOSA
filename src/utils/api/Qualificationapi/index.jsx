import api from ".."
import { path } from "../endpoint"


export const getqualifications=async()=>{
    const url = await api.get(path.Qualification)
    return url?.data
}
export const postqualifications=async(details)=>{
    const url = await api.post(path.Qualification,details)
    return url?.data
}
export const editqualifications=async(id,details)=>{
    const url = await api.put(path.Qualification + "/" + id , details)
    return url?.data
}
export const deletequalifications=async(id)=>{
    const url = await api.delete(path.Qualification + "/" + id)
    return url?.data
}