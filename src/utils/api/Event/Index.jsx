import api from ".."
import { path } from "../endpoint"




export const getevents=async()=>{
  const url = await api.get(path.GetEvent)
  return url?.data
}
export const postevents=async(details)=>{
  const url = await api.post(path.Postevent,details)
  return url?.data
}
export const deleteevents=async(id)=>{
  const url = await api.delete(path.Deleteevent+"?id="+id)
  return url?.data
}
export const updateevents=async(id,details)=>{
  const url = await api.put(path.Updateevents+"?id="+id,details)
  return url?.data
}
export const eventvideolist=async()=>{
  const url = await api.get(path.EventVideo)
  return url?.data
}
export const posteventvideo=async(details)=>{
  const url = await api.post(path.postEventVideo,details)
  return url?.data
}
