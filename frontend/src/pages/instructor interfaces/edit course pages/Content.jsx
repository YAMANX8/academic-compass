import { useState } from "react";

const Content = () => {
  const [data, setData] = useState([
    {
      id: 1,
      topicTitle: "string",
      subTopics: [
        {
          id: 1,
          title: "string",
          items: [
            {
              id: 1,
              title: "string",
              order: "number",
              type: "string",
            },
            {
              id: 2,
              title: "string",
              order: "number",
              type: "string",
            },
          ],
        },
        {
          id: 2,
          title: "string",
          items: [
            {
              id: 1,
              title: "string",
              order: "number",
              type: "string",
            },
            {
              id: 2,
              title: "string",
              order: "number",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      topicTitle: "string",
      subTopics: [
        {
          id: 1,
          title: "string",
          items: [
            {
              id: 1,
              title: "string",
              order: "number",
              type: "string",
            },
            {
              id: 2,
              title: "string",
              order: "number",
              type: "string",
            },
          ],
        },
        {
          id: 2,
          title: "string",
          items: [
            {
              id: 1,
              title: "string",
              order: "number",
              type: "string",
            },
            {
              id: 2,
              title: "string",
              order: "number",
              type: "string",
            },
          ],
        },
      ],
    },
  ]);
  console.table(data)
  return <div>Content</div>;
};

export default Content;
