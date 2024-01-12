import api from ".."
import { path } from "../endpoint"




export const getemployment=async()=>{
    const url = await api.get(path.EmploymentType)
    return url?.data
}
export const postemployment=async(details)=>{
    const url = await api.post(path.EmploymentType,details)
    return url?.data
}
export const geteditemployment=async(id)=>{
    const url = await api.get(path.EmploymentType + "/" + id)
    return url?.data
}
export const deleteemployment=async(id)=>{
    const url = await api.delete(path.EmploymentType + "/" + id)
    return url?.data
}
export const updateemployment=async(id,details)=>{
    const url = await api.put(path.EmploymentType + "/" + id,details)
    return url?.data
}