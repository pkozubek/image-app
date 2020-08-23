import React, { useReducer } from "react";

import {
  AuthProviderInterface,
  ReducerState,
  ReducerAction,
  ContextInterface,
} from "./contextInterface";

const initialState: ReducerState = {
  userData: null,
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
