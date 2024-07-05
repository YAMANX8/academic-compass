import { SplashScreen } from "../../components";

import { CmsContext } from "./cms-context";

// ----------------------------------------------------------------------

export function CmsConsumer({ children }) {
  return (
    <CmsContext.Consumer>
      {(cms) => (cms.loading ? <SplashScreen /> : children)}
    </CmsContext.Consumer>
  );
}
