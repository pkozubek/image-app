import React, { useReducer } from "react";

import {
  AuthProviderInterface,
  ReducerState,
  ReducerAction,
  ContextInterface,
} from "./contextInterface";

const initialState: ReducerState = {
  isLogged: true,
};

function reducer(state: ReducerState, action: ReducerAction) {
  switch (action.type) {
    case "SET_LOGGED":
      return { ...state, isLogged: action.willBeLogged };
    default:
      return state;
  }
}

export const AuthContext = React.createContext<Partial<ContextInterface>>({});

export const AuthProvider: React.FC<AuthProviderInterface> = (
  props
): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLogged = (willBeLogged: boolean) => {
    dispatch({
      type: "SET_LOGGED",
      willBeLogged,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, setLogged }}>
      {props.children}
    </AuthContext.Provider>
  );
};
