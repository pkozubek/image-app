import Axios from "axios";

export const API_IMAGES = "http://localhost:4000/api/images";
const API_IMAGES_VIEW = API_IMAGES + "/add_view";

interface ImageData {
  name?: string;
  description?: string;
}

export const updateImageData = (id: string, imageData: ImageData) => {
  Axios.patch(`${API_IMAGES}/${id}`, imageData);
};

export const addViewToImage = (id: string) => {
  Axios.post(`${API_IMAGES_VIEW}/${id}`);
};
