import React, { useReducer } from "react";
import { IUserDataDTO } from "../interfaces/IUserDataDTO";

interface ReducerState {
  userData: IUserDataDTO;
}

export interface ContextInterface {
  userData: IUserDataDTO;
  setLogged: (userData: IUserDataDTO, expirationDate?: number) => void;
  setLoggedOut: () => void;
}

export interface AuthProviderInterface {
  children: JSX.Element;
}

interface IActionInterface {
  type: string;
}

export interface ReducerAction extends IActionInterface {
  userData?: IUserDataDTO;
}

const initialState: ReducerState = null;

function reducer(state: ReducerState, action: ReducerAction) {
  switch (action.type) {
    case "SET_LOGGED":
      return { ...state, userData: action.userData };
    case "SET_LOGOUT":
      return initialState;
    default:
      return state;
  }
}

let logTimer = null;

export const AuthContext = React.createContext<Partial<ContextInterface>>({});

export const AuthProvider: React.FC<AuthProviderInterface> = (
  props
): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLogged = (userData: IUserDataDTO, expirationDate?: number) => {
    const defaultExpiration = 60 * 60 * 1000;
    logTimer = setTimeout(setLoggedOut, expirationDate || defaultExpiration);

    dispatch({
      type: "SET_LOGGED",
      userData,
    });
  };

  const setLoggedOut = () => {
    clearTimeout(logTimer);
    dispatch({ type: "SET_LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, setLogged, setLoggedOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};
