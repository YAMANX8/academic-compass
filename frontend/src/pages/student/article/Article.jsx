import { useState, useEffect } from "react";
import axios from "src/apis/axios";

import { CourseContent } from "src/components";
import { useParams } from "react-router-dom";
import { useAuthContext } from "src/auth/hooks";
import { Helmet } from "react-helmet-async";
import { Button } from "../../../components";
const ARTICLE_URL = "/article";

function Article() {
  const { user } = useAuthContext();
  const { id, itemId } = useParams();
  const [data, setData] = useState({
    article: ``,
    courseContent: [
      {
        id: 1,
        topicTitle: "",
        subTopics: [
          {
            id: 1,
            title: "",
            items: [
              {
                id: 1,
                title: "",
                order: 1,
                type: "",
                complete: true,
              },
            ],
          },
        ],
      },
    ],
  });
  const getData = async () => {
    try {
      const response = await axios.post(
        `${ARTICLE_URL}`,
        { itemId: itemId, courseId: id },
        {
          headers: {
            token: user?.accessToken,
          },
        },
      );

      setData(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleCompletion = async () => {
    try {
      const response = await axios.post(
        `${ARTICLE_URL}/Completed`,
        { itemId: itemId },
        {
          headers: {
            token: user?.accessToken,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Helmet>
        <title>Item title</title>
      </Helmet>
      <section className="w-full ">
        <div className=" flex  ">
          <div className="flex flex-1 justify-center ">
            <div>
              <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-lg bg-white p-[24px] shadow-lg">
                <div className="custom-scrollbar mb-6 h-96 overflow-y-auto">
                  <p className="text-lg leading-relaxed text-gray-700  transition  duration-300 hover:text-blue-800">
                    {data.article}
                  </p>
                </div>
              </div>
              <div className="ml-[510px] py-[20px]">
                <Button size="lg" onClick={handleCompletion}>
                  Completion Flag
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="h-full w-[400px] bg-secondary transition-all duration-1000 ease-in-out-back dark:bg-secondary-dark">
              <CourseContent courseContent={data.courseContent} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Article;
