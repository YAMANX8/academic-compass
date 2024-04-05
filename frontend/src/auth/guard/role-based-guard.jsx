import { NotAuthorized } from "src/pages";
import { useAuthContext } from "../hooks";
// ----------------------------------------------------------------------

export default function RoleBasedGuard({ hasContent = true, roles, children }) {

  const { user } = useAuthContext();
  const currentRole = user?.role_id;

  if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
    return hasContent ? <NotAuthorized /> : null;
  }

  return <> {children} </>;
}
