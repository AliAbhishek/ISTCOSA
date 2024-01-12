import api from "../..";
import { path } from "../../endpoint";

export const getregistereduser = async (userType, page) => {
  const url = await api.get(
    path.GetUserListByFilter + "?userType=" + userType + "&page=" + page
  );
  return url?.data;
};

