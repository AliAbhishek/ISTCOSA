import api from "..";
import { path } from "../endpoint";

export const getalluser = async () => {
  const url = await api.get(path.GetUserList);
  return url?.data;
};

export const getuserdetails = async (id) => {
  const url = await api.get(path.UserProfessionaldetails + id);
  return url?.data;
};

export const postmembershipdetails = async (details) => {
  const url = await api.post(path.InsertMemembership, details);
  return url?.data;
};

export const getdetailsforedit = async (id) => {
  const url = await api.get(path.UserPersonalEdit + id);
  return url?.data;
};
export const postnewuser = async (details) => {
  const url = await api.post(path.NewUserRegister, details);
  return url?.data;
};
export const updateuserdetails = async (id, details) => {
  const url = await api.post(path.UserPutPersonalInfo + "/" + id, details);
  return url?.data;
};
export const updateprofessionaldetails = async (id, details) => {
  const url = await api.put(path.PutProfessionalInfo + "/" + id, details);
  return url?.data;
};
export const deleteprofessionaldetails = async (id) => {
  const url = await api.delete(path.DeleteProfessionalInfo + "/" + id);
  return url?.data;
};
export const searchuser = async (userType, page, filter) => {
  const url = await api.get(
    path.GetManageUserByFilter +
      "?userType=" +
      userType +
      "&page=" +
      page +
      "&filter=" +
      filter
  );
  return url?.data;
};
export const activateDeactivate = async (id,status) => {
  const url = await api.get(path.GETActive + "?status="+status + "&id=" +id);
  return url?.data;
};
export const activateDeactivateMembership = async (id,status) => {
  const url = await api.get(path.GETMemberType + "?status="+status + "&id=" +id);
  return url?.data;
};
export const activateDeactivateObituary = async (id,status) => {
  const url = await api.get(path.GETObituary + "?status="+status + "&id=" +id);
  return url?.data;
};


