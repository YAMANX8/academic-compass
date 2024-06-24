import { useContext } from "react";

import { SettingsContext } from "../settings/settings-context";

// ----------------------------------------------------------------------

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context)
    throw new Error(
      "useSettingsContext context must be use inside SettingsProvider",
    );

  return context;
};
