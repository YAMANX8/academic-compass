import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { Icon } from "@iconify/react";
import { Button } from "../../components";
const TabsMapper = ({ data }) => {
  const location = useLocation();

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <ul key={item.subheader} className="space-y-2">
          <h2 className="text-base font-bold capitalize text-primary-light">
            {item.subheader}
          </h2>
          {item.items.map((i) => (
            <li key={i.title} className="flex-grow">
              <Button
                variant={location.pathname === i.path ? "soft" : "text"}
                className={`!w-full capitalize ${location.pathname === i.path ? "!text-primary-dark" : "!text-dark"}`}
                page={i.path}
              >
                <Icon icon={i.icon} />
                <span className="w-full">{i.title}</span>
              </Button>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default TabsMapper;
