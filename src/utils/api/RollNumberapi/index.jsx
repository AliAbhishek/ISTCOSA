import api from ".."
import { path } from "../endpoint"



export const getRollNumberbyBatch = async(id) =>{
    const url = await api.get(path.GetAllRollNoByBatch+id)
    return url?.data
}
export const postRollNumberbyBatch = async(details) =>{
    const url = await api.post(path.PostBatch,details)
    return url?.data
}
export const deleteRollNumber = async(id) =>{
    const url = await api.delete(path.Delete + "?id=" + id)
    return url?.data
}

