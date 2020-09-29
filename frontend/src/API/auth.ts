import axios from "axios";
import { IUserDataDTO } from "../interfaces/IUserDataDTO";

export const API_USER_REGISTER = "http://localhost:4000/api/users/register";
export const API_USER_LOGIN = "http://localhost:4000/api/users/login";

interface IFormDateInterface {
  name: string;
  password: string;
  email?: string;
}

export const sendLoginRequest = async (
  formData: IFormDateInterface,
  setErrorCallback: (error) => void
): Promise<IUserDataDTO> => {
  const response = await axios.post(API_USER_LOGIN, formData);
  return response.data;
};

interface IRegisterForm {
  nickname: string;
  password: string;
  email: string;
  avatar: string;
}

export const sendRegisterRequest = async (
  newUser: IRegisterForm,
  setErrorCallback: (error) => void
): Promise<IUserDataDTO> => {
  const formData = new FormData();
  formData.append("name", newUser.nickname);
  formData.append("password", newUser.password);
  formData.append("email", newUser.email);
  formData.append("avatar", newUser.avatar);

  const response: IUserDataDTO = await axios.post(API_USER_REGISTER, formData);
  return response;
};
