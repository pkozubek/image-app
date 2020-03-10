import React, { createContext, useReducer } from "react";

const initialState = {
  isLogged: false,
  isModalVisible: false
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOGGED":
      return { ...state, isLogged: action.willBeLogged };
    case "SET_MODAL_VISIBLE":
      return { ...state, isModalVisible: action.willBeModalVisible };
    default:
      return state;
  }
}

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLogged = willBeLogged => {
    dispatch({
      action: "SET_LOGGED",
      willBeLogged
    });
  };

  const setModalVisible = willBeModalVisible => {
    dispatch({
      action: "SET_MODAL_VISIBLE",
      willBeModalVisible
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, setLogged, setModalVisible }}>
      {children}
    </AuthContext.Provider>
  );
}
