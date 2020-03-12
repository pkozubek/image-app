import { useState } from "react";
import axios from "axios";

export const useHttp = () => {
  const [isLoading, setLoading] = useState(false);
  const [erorr, setError] = useState(null);
  const [data, setData] = useState(null);

  /*TO-DO*/
};
