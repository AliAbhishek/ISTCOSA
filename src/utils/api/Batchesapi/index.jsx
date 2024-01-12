import api from ".."
import { path } from "../endpoint"




export const getbatches = async () => {
    let url = await api.get(path.Batch)
    return url?.data
}
export const postbatches = async (details) => {
    let url = await api.post(path.Batch,details)
    return url?.data
}
export const updatebatch = async (id,details) => {
    let url = await api.post(path.Batch + "/" + id, details)
    return url?.data
}
export const deletebatch = async (id) => {
    let url = await api.delete(path.Batch + "/" + id)
    return url?.data
}