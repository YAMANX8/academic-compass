import { useState, useEffect } from "react";
import axios from "../../../apis/axios";

import { CourseContent } from "../../../components";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const ARTICLE_URL = "/article";

function Article() {
  const { auth } = useAuth();
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
            token: auth.accessToken,
          },
        }
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
            token: auth.accessToken,
          },
        }
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
          <div className="flex-1 flex justify-center ">
            <div>
              <div className="max-w-3xl w-full mx-auto p-[24px] bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="mb-6 overflow-y-auto custom-scrollbar h-96">
                  <p className="text-gray-700 hover:text-blue-800 text-lg  leading-relaxed  transition duration-300">
                    {data.article}
                  </p>
                </div>
              </div>
              <div className="ml-[510px] py-[20px]">
                <button
                  onClick={handleCompletion}
                  className="flex justify-center items-center gap-[10px] px-[70px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
                >
                  Completion Flag
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-secondary dark:bg-secondary-dark h-full w-[400px] transition-all duration-1000 ease-in-out-back">
              <CourseContent courseContent={data.courseContent} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Article;
