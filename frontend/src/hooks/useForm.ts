import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let isFormValid = true;

      for (const inputID in state.inputs) {
        if (!state.inputs[inputID]) {
          continue;
        }
        if (inputID === action.inputID) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputs[inputID].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputID]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: isFormValid,
      };
    case "SET_FORM":
      return { ...state, inputs: action.inputs, isValid: action.isFormValid };
    default:
      return state;
  }
};

export function useForm<T>(initialInputs: T, initialValidity?: boolean) {
  const [formState, dispatchFormChange] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatchFormChange({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputID: id,
    });
  }, []);

  const setForm = useCallback((inputData, formValidity) => {
    dispatchFormChange({
      type: "SET_FORM",
      inputs: inputData,
      isValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setForm];
}
