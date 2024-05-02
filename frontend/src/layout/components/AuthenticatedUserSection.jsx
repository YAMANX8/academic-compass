import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";
import { Button } from "../../components";
import { useAuthContext } from "../../auth/hooks";
import { MdOutlineSettings as Settings } from "react-icons/md";

const AuthenticatedUserSection = ({}) => {
  const { logout, user } = useAuthContext();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userInfo = {
    firstName: user?.first_name || "user",
    lastName: user?.last_name || "",
    imagePath:
      user?.picture && user?.picture !== "http://localhost:5000/image/null"
        ? user?.picture
        : "",
  };
  const menuItemStyle =
    "cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 active:bg-accent active:text-light";

  const handleLogout = () => {
    logout();
    setConfirmLogout(false);
    setIsUserMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="w-[1px] self-stretch rounded-full bg-dark transition-all duration-1000 ease-in-out-back dark:bg-light"></div>
      <Link
        to={user?.role_id == 2 ? paths.student.root : paths.instructor.root}
        className="flex aspect-square w-[45px] items-center justify-center overflow-clip rounded-full bg-primary text-light"
      >
        {userInfo.imagePath ? (
          <img src={userInfo.imagePath} alt="profile" />
        ) : (
          `${userInfo.firstName.charAt(0)} ${userInfo.lastName.charAt(0)}`
        )}
      </Link>
      <p className="font-semibold tracking-tight text-primary transition-all duration-1000 ease-in-out-back dark:text-accent-dark">
        {userInfo.firstName} {userInfo.lastName}
      </p>

      {/* menu */}
      <div className="relative text-center">
        <div>
          <Button
            type="button"
            size="sm"
            variant="text"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <Settings
              size={24}
              className={` text-dark ${isUserMenuOpen ? "" : "animate-spin-slow"} `}
            />
          </Button>
        </div>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md bg-secondary text-dark shadow-lg ring-1 ring-dark/20 transition-all duration-1000 ease-in-out-back  focus:outline-none dark:bg-secondary-dark dark:text-light dark:ring-light/20">
            <ul className="py-1">
              <li
                className={menuItemStyle}
                onClick={() => {
                  navigate(
                    user?.role_id === 2
                      ? paths.student.settings
                      : paths.instructor.settings,
                  );
                  setIsUserMenuOpen(false);
                }}
              >
                Settings
              </li>

              <li
                className={menuItemStyle}
                onClick={() => setConfirmLogout(true)}
              >
                Log Out
              </li>

              {confirmLogout && (
                <ul className="mt-2 border-t border-dark/20 pt-2">
                  <li
                    className={`${menuItemStyle} text-error`}
                    onClick={handleLogout}
                  >
                    Yes, Log Out
                  </li>

                  <li
                    className={`${menuItemStyle}`}
                    onClick={() => setConfirmLogout(false)}
                  >
                    No, Stay Logged In
                  </li>
                </ul>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticatedUserSection;
