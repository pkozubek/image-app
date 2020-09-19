import React, { useReducer } from "react";
import { IUserDataDTO } from "../interfaces/IUserDataDTO";

interface ReducerState {
  userData: IUserDataDTO;
}

export interface ContextInterface {
  userData: IUserDataDTO;
  setLogged: (userData: IUserDataDTO) => void;
}

export interface AuthProviderInterface {
  children: JSX.Element;
}

interface IActionInterface {
  type: string;
}

export interface ReducerAction extends IActionInterface {
  userData: {
    id: string;
    name: string;
  };
}

const initialState: ReducerState = {
  userData: {
    id: "5e5ec63223439e067c5671fd",
    name: "kozi0892",
  },
};

function reducer(state: ReducerState, action: ReducerAction) {
  switch (action.type) {
    case "SET_LOGGED":
      return { ...state, userData: action.userData };
    default:
      return state;
  }
}

export const AuthContext = React.createContext<Partial<ContextInterface>>({});

export const AuthProvider: React.FC<AuthProviderInterface> = (
  props
): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLogged = (userData: IUserDataDTO) => {
    dispatch({
      type: "SET_LOGGED",
      userData,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, setLogged }}>
      {props.children}
    </AuthContext.Provider>
  );
};
