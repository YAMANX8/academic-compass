import { SplashScreen } from "../../components";

import { SettingsContext } from "./settings-context";

// ----------------------------------------------------------------------

export function SettingsConsumer({ children }) {
  return (
    <SettingsContext.Consumer>
      {(settings) => (settings.loading ? <SplashScreen /> : children)}
    </SettingsContext.Consumer>
  );
}
