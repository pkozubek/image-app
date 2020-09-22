import Axios from "axios";

export const API_IMAGES = "http://localhost:4000/api/images";

interface ImageData {
  name: string;
  description: string;
}

export const updateImageData = (id: string, imageData: ImageData) => {
  Axios.patch(`${API_IMAGES}/${id}`, imageData);
};
