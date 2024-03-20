import { NotAuthorized } from "src/pages";

// ----------------------------------------------------------------------

export default function RoleBasedGuard({ hasContent, roles, children, sx }) {
  // Logic here to get current user role
  const user = { role: "student" };

  // const currentRole = 'user';
  const currentRole = user?.role; // admin;

  if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
    return hasContent ? <NotAuthorized /> : null;
  }

  return <> {children} </>;
}
