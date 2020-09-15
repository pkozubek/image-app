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
