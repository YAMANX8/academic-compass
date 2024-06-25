import { useRouter } from "../routes/hooks/use-router";
import { paths } from "../routes/paths.js";
import { roles } from "../config-global.js";
export const useRedirectToDashboard = () => {
  const router = useRouter();
  const redirectToDashboard = (role) => {
    if (roles.instructor.includes(role)) {
      router.push(paths.instructor.root);
    } else if (roles.student.includes(role)) {
      router.push(paths.student.root);
    } else {
      router.push("/");
    }
  };
  return redirectToDashboard;
};
