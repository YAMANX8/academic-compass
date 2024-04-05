import { useState, useEffect, useCallback } from "react";

import { paths } from "../../routes/paths";
import { useRouter } from "../../routes/hooks";

import { SplashScreen } from "../../components";

import { useAuthContext } from "../hooks";

// ----------------------------------------------------------------------

const loginPaths = {
  student: paths.auth.student.login,
  instructor: paths.auth.instructor.login,
};

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();

  const { authenticated, role } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = loginPaths[role];

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, role, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
