import { useTabsConfig } from "./config/tabs-config";
import TabsMapper from "../components/tabs-mapper";
import { Button } from "../../components";
import { Icon } from "@iconify/react";
import { paths } from "../../routes/paths";
const NavVertical = ({ role, option }) => {
  const tabsData = useTabsConfig();
  return (
    <nav className="flex top-0 w-64 flex-col gap-4 border-r border-dashed border-gray-300 p-4">
      <TabsMapper data={tabsData[role][option]} />
      <div className="flex flex-grow flex-col-reverse">
        <Button page={paths.course.manage.create}>
          <Icon icon="mdi:plus" fontSize={24} />
          Create New Course
        </Button>
      </div>
    </nav>
  );
};

export default NavVertical;
