import api from ".."
import { path } from "../endpoint"

export const getdashboard=async()=>{
    const url = await api.get(path.Home)
    return url?.data
}