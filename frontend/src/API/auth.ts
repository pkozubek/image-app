import axios from "axios";

export const API_USER_REGISTER = "http://localhost:4000/api/users/register";
export const API_USER_LOGIN = "http://localhost:4000/api/users/login";

interface IFormDateInterface {
  name: string;
  password: string;
  email?: string;
}

export const sendLoginRequest = async (
  formData: IFormDateInterface,
  setLoggedCallback,
  setErrorCallback
) => {
  await axios
    .post(API_USER_LOGIN, formData)
    .then((response) => {
      if (response.status === 200) {
        setLoggedCallback(response.data);
      }
    })
    .catch((error) => {
      const errorMessage = error.response.data.message;
      setErrorCallback(errorMessage);
    });
};

interface IRegisterForm {
  nickname: string;
  password: string;
  email: string;
  avatar: string;
}

export const sendRegisterRequest = async (
  newUser: IRegisterForm,
  setLoggedCallback,
  setErrorCallback
) => {
  const formData = new FormData();
  formData.append("name", newUser.nickname);
  formData.append("password", newUser.password);
  formData.append("email", newUser.email);
  formData.append("avatar", newUser.avatar);

  await axios
    .post(API_USER_REGISTER, formData)
    .then((response) => {
      if (response.status === 200) {
        setLoggedCallback(response.data);
      }
    })
    .catch((error) => {
      const errorMessage = error.response.data.message;
      setErrorCallback(errorMessage);
    });
};
