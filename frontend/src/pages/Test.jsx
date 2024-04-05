import React from "react";
import { useRefreshToken } from "../auth/hooks";
const Test = () => {
  const refresh = useRefreshToken();

  return <button onClick={() => refresh()}>Refresh</button>;
};

export default Test;
