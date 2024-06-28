import { useContext } from "react";

import { CmsContext } from "../cms/cms-context";

// ----------------------------------------------------------------------

export const useCmsContext = () => {
  const context = useContext(CmsContext);

  if (!context)
    throw new Error("useCmsContext context must be use inside CmsProvider");

  return context;
};
