import { Helmet } from "react-helmet-async";
import { Card, Button, ProfileAvatar } from "../../../components";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import { useSettingsContext } from "../../../context/hooks/use-settings-context";
import { paths } from "../../../routes/paths";
const General = () => {
  const photo = useRef();

  const {
    handleChange,
    first_name,
    last_name,
    image,
    handleRemove,
    country,
    city,
  } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Settings: General</title>
      </Helmet>

      <div className="flex flex-col gap-4">
        <h2>My General Information Settings</h2>
        <Card className="flex justify-center !py-12">
          <div className="max-w-3xl flex-1 space-y-4">
            {/* Profile Image */}
            <div className="flex items-center justify-between">
              <ProfileAvatar
                className="w-32"
                imagePath={
                  typeof image == "string" ? image : URL.createObjectURL(image)
                }
                firstName={first_name}
                lastName={last_name}
              />
              <div className="flex gap-4">
                <Button
                  variant="outlined"
                  color="error"
                  size="md"
                  onClick={handleRemove}
                >
                  <Icon fontSize={24} icon="mdi:trash-can-outline" />
                  Remove
                </Button>
                <Button
                  size="md"
                  type="button"
                  onClick={() => photo.current.click()}
                >
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    hidden
                    ref={photo}
                  />
                  <Icon fontSize={24} icon="mdi:cloud-upload" />
                  Upload
                </Button>
              </div>
            </div>
            {/* divider */}
            <div className="h-px bg-gray-300" />
            {/* Full Name */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3>Full Name</h3>
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  {`${first_name} ${last_name}`}
                </p>
              </div>
              <Button size="md" page={paths.instructor.settings.account}>
                <Icon fontSize={24} icon="mdi:pencil" />
                Edit
              </Button>
            </div>
            {/* divider */}
            <div className="h-px bg-gray-300" />
            {/* Address */}
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-2">
                <h3>Address</h3>
                <div className="flex flex-1 items-center gap-2">
                  <p className="flex-1 text-xl font-medium">
                    Country
                    <br />
                    <span className="font-normal text-gray-500 dark:text-gray-400">
                      {country || "unknown"}
                    </span>
                  </p>
                  <p className="flex-1 text-xl font-medium">
                    City
                    <br />
                    <span className="font-normal text-gray-500 dark:text-gray-400">
                      {city || "unknown"}
                    </span>
                  </p>
                  <Button size="md" page={paths.instructor.settings.account}>
                    <Icon fontSize={24} icon="mdi:pencil" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default General;
