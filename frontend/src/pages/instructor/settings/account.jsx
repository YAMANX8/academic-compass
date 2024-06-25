import { Helmet } from "react-helmet-async";
import { Card, Button, TextField, Select } from "../../../components";
import { Icon } from "@iconify/react";
import { useSettingsContext } from "../../../context/hooks/use-settings-context";
import { countries } from "../../../constants/data";


const Account = () => {
  const {
    handleSubmit,
    handleChange,
    first_name,
    last_name,
    education,
    email,
    country,
    city,
    birth_date,
  } = useSettingsContext();
  return (
    <>
      <Helmet>
        <title>Settings: Account</title>
      </Helmet>

      <div className="flex flex-col gap-4">
        <h2>My Account Settings</h2>
        <Card className="flex justify-center !py-12">
          <div className="max-w-3xl flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                <h3>Profile</h3>
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    name="first_name"
                    onChange={handleChange}
                    value={first_name}
                    placeholder="John"
                    label="first name"
                  />
                  <TextField
                    name="last_name"
                    onChange={handleChange}
                    value={last_name}
                    placeholder="Dow"
                    label="last name"
                  />
                  <TextField
                    name="education"
                    onChange={handleChange}
                    value={education}
                    placeholder="Information Technology"
                    label="education"
                  />
                  <TextField
                    name="email"
                    onChange={handleChange}
                    value={email}
                    label="email"
                    placeholder="something@something.com"
                  />
                  <Select
                    name="country"
                    onChange={handleChange}
                    value={country}
                    label="country"
                    placeholder="Syria"
                  >
                    <option value="">-- SELECT YOUR COUNTRY --</option>
                    {countries.map((country) => (
                      <option key={country.alpha3Code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                  <TextField
                    name="city"
                    onChange={handleChange}
                    value={city}
                    label="city"
                    placeholder="Damascus"
                  />
                  <TextField
                    name="birth_date"
                    onChange={handleChange}
                    value={birth_date}
                    label="birth date"
                    placeholder="2001-10-05"
                    type="date"
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

export default Account;
