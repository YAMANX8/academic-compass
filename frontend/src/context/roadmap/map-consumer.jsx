import { SplashScreen } from "../../components";

import { MapContext } from "./map-context";

// ----------------------------------------------------------------------

export function MapConsumer({ children }) {
  return (
    <MapContext.Consumer>
      {(roadmap) => (roadmap.loading ? <SplashScreen /> : children)}
    </MapContext.Consumer>
  );
}
