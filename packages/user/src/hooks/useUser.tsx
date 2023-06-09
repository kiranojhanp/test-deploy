import { useContext } from "react";

import { userContext } from "../context/UserProvider";

const useUser = () => {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("UserProvider is required!");
  }

  return context;
};

export default useUser;
