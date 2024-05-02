import React from "react";
import { useRefreshToken } from "../auth/hooks";
import { Logo, SplashScreen, Button } from "../components";
const Test = () => {
  const refresh = useRefreshToken();

  return (
    <>
      <Button color="primary">Hello world!</Button>
      <Button color="secondary">Hello world!</Button>
      <Button color="accent">Hello world!</Button>
      <Button color="success">Hello world!</Button>
      <Button color="info">Hello world!</Button>
      <Button color="warning">Hello world!</Button>
    </>
  );
};

export default Test;
