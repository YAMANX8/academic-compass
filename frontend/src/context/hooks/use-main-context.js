import { useContext } from "react";

import { MainContext } from "../main/main-context";

// ----------------------------------------------------------------------

export const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context)
    throw new Error("useMainContext context must be use inside MainProvider");

  return context;
};
