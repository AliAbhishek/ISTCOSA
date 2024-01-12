import api from ".."
import { path } from "../endpoint"



export const getcompnies = async() => {
   const url=await api.get(path.Company)
   return url?.data
}
export const getcountries = async() => {
   const url=await api.get(path.GetByCountry)
   return url?.data
}
export const getstate = async(id) => {
   const url=await api.get(path.GetByState + id)
   return url?.data
}
export const getcity = async(id) => {
   const url=await api.get(path.GetByCity +id)
   return url?.data
}
export const postcompanies = async(details) => {
   const url=await api.post(path.Company,details)
   return url?.data
}
export const updatecompanies = async(id,details) => {
   const url=await api.put(path.Company + "/" + id,details)
   return url?.data
}

export const deletecompanydetails = async(id) => {
   const url=await api.delete(path.Company + "/" + id)
   return url?.data
}
