import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../../../../../components";
const Quiz = () => {
  const [data, setData] = useState([
    {
      question_id: 0,
      question_body: "",
      question_order: 1,
    },
  ]);
  const json = [
    {
      question_id: 1,
      question_body: "Test1",
      question_order: 1,
    },
    {
      question_id: 2,
      question_body: "Test2",
      question_order: 2,
    },
  ];

  useEffect(() => {
    const sortedData = json.sort((a, b) => a.question_order - b.question_order);
    setData(sortedData);
  }, []);
  return (
    <div className="space-y-1 bg-white p-2">
      {data.map((question) => (
        <div className="flex items-center justify-between">
          <p>{question.question_body}</p>
          <div className="flex items-center gap-2">
            <Button variant="soft" size="sm" color="error">
              <Icon icon="mdi:trash-can-outline" />
            </Button>
            <Button variant="soft" size="sm" color="accent">
              <Icon icon="mdi:pencil" />
            </Button>
            <Icon icon="mdi:reorder-horizontal" fontSize={24} />
          </div>
        </div>
      ))}
      <Button variant="soft" size="sm" color="accent">
        <Icon icon="mdi:plus" />
        New question
      </Button>
    </div>
  );
};

export default Quiz;
