import React from "react";
import { useRefreshToken } from "../auth/hooks";
import { Logo, SplashScreen } from "../components";
const Test = () => {
  const refresh = useRefreshToken();

  return <Logo className="w-[500px]" />;
};

export default Test;
