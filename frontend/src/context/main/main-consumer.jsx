import { SplashScreen } from "../../components";

import { MainContext } from "./main-context";

// ----------------------------------------------------------------------

export function MainConsumer({ children }) {
  return (
    <MainContext.Consumer>
      {(roadmap) => (roadmap.loading ? <SplashScreen /> : children)}
    </MainContext.Consumer>
  );
}
