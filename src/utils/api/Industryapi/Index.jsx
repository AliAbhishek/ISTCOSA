import api from ".."
import { path } from "../endpoint"



export const getindustry=async()=>{
    const url = await api.get(path.IndustryType)
    return url?.data
}
export const postindustry=async(details)=>{
    const url = await api.post(path.IndustryType,details)
    return url?.data
}
export const geteditindustry=async(id)=>{
    const url = await api.get(path.IndustryType + "/" + id)
    return url?.data
}
export const deleteindustry=async(id)=>{
    const url = await api.delete(path.IndustryType + "/" + id)
    return url?.data
}
export const updateindustry=async(id,details)=>{
    const url = await api.put(path.IndustryType + "/" + id,details)
    return url?.data
}