import Axios from "axios";

export const API_IMAGES = "http://localhost:4000/api/images";
const API_IMAGES_VIEW = API_IMAGES + "/add_view";

interface IUpdateImageData {
  name?: string;
  description?: string;
}

export const updateImageData = (
  id: string,
  imageData: IUpdateImageData,
  token: string
) => {
  Axios.patch(`${API_IMAGES}/${id}`, imageData, {
    headers: {
      authorization: token,
    },
  });
};

export const addViewToImage = (id: string) => {
  Axios.post(`${API_IMAGES_VIEW}/${id}`);
};

interface IImageData {
  name: string;
  description: string;
  autorId: string;
  image: string;
}

export const addImage = async (imageData: IImageData, token: string) => {
  const formData = new FormData();
  formData.append("name", imageData.name);
  formData.append("description", imageData.description);
  formData.append("author", imageData.autorId);
  formData.append("image", imageData.image);

  const response = await Axios.post(API_IMAGES, formData, {
    headers: {
      authorization: token,
    },
  });

  return response;
};

export const deleteImage = async (imageId: string, token: string) => {
  const response = await Axios.delete(`${API_IMAGES}/${imageId}`, {
    headers: {
      authorization: token,
    },
  });
  return response;
};
