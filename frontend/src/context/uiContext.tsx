import React from "react";
import { useReducer } from "react";
import { IImageData } from "../interfaces/IImageData";

interface ReducerState {
  imageData: IImageData;
  isActive: boolean;
}

const initialState: ReducerState = {
  imageData: null,
  isActive: false,
};

function reducer(state: ReducerState, action) {
  switch (action.type) {
    case "UPDATE_IMAGE":
      return { isActive: true, imageData: action.imageData };
    case "CREATE_IMAGE":
      return { imageData: null, isActive: true };
    case "CLOSE_IMAGE_MODAL":
      return { imageData: null, isActive: false };
    default:
      return state;
  }
}

export const ImageModalContext = React.createContext({});
export const IsMobileContext = React.createContext(false);

export const ImageModalProvider = (props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openImageEdit = (imageData: IImageData) => {
    dispatch({
      type: "UPDATE_IMAGE",
      imageData,
    });
  };

  const openImageCreate = () => {
    dispatch({
      type: "CREATE_IMAGE",
    });
  };

  const closeImageModal = () => {
    dispatch({
      type: "CLOSE_IMAGE_MODAL",
    });
  };

  return (
    <ImageModalContext.Provider
      value={{ ...state, openImageCreate, closeImageModal, openImageEdit }}
    >
      {props.children}
    </ImageModalContext.Provider>
  );
};
