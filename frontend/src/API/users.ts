import Axios from "axios";

export const USERS_API = "http://localhost:4000/api/users";

export const getUserList = async (token: string) => {
  const response = await Axios.get(USERS_API, {
    headers: {
      authorization: token,
    },
  });

  return response.data;
};

export const getUserData = async (userId: string, token: string) => {
  const response = await Axios.get(`${USERS_API}/${userId}`, {
    headers: {
      authorization: token,
    },
  });
  return response.data ? response.data.user : null;
};
