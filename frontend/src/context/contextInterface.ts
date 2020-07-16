export interface ContextInterface {
  isLogged: boolean;
  setLogged: (willBeLogged: boolean) => void;
}

export interface AuthProviderInterface {
  children: JSX.Element;
}

export interface ReducerState {
  isLogged: boolean;
}

interface IActionInterface {
  type: string;
}

export interface ReducerAction extends IActionInterface {
  willBeLogged: boolean;
}

type ActionTypes = ReducerAction;
