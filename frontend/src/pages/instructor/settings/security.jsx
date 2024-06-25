import { Helmet } from "react-helmet-async";
import { Card, Button, TextField } from "../../../components";
import { Icon } from "@iconify/react";
import { useSettingsContext } from "../../../context/hooks/use-settings-context";
const Security = () => {
  const {
    handleChange,
    currentPassword,
    newPassword,
    verifyNewPassword,
    handleSubmit,
  } = useSettingsContext();
  return (
    <>
      <Helmet>
        <title>Settings: Security</title>
      </Helmet>

      <div className="flex flex-col gap-4">
        <h2>My Security Settings</h2>
        <Card className="flex justify-center !py-12">
          <div className="max-w-3xl flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                <h3>Password</h3>
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    name="currentPassword"
                    onChange={handleChange}
                    value={currentPassword}
                    placeholder="**********"
                    label="current password"
                    showPasswordToggle
                    type="password"
                  />
                  <TextField
                    name="newPassword"
                    onChange={handleChange}
                    value={newPassword}
                    placeholder="**********"
                    label="new password"
                    showPasswordToggle
                    type="password"
                  />
                  <TextField
                    name="verifyNewPassword"
                    onChange={handleChange}
                    value={verifyNewPassword}
                    label="verify new password"
                    type="password"
                    placeholder="**********"
                    showPasswordToggle
                  />
                </div>
                <div className="h-px bg-gray-300" />
                <Button variant="soft" size="lg" className="ml-auto">
                  <Icon fontSize={24} icon="mdi:content-save-outline" />
                  Save
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Security;
