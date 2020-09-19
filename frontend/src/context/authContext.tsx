import React, { useReducer } from "react";

interface ReducerState {
  userData: {
    id: string;
    name: string;
  };
}

export interface ContextInterface {
  userData: {
    id: string;
    name: string;
  };
  setLogged: (willBeLogged: boolean) => void;
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

  const setLogged = (userData) => {
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
