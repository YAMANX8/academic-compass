import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "src/apis/axios";
import { BsPlayCircleFill as Library } from "react-icons/bs";
import { CourseContent, Button } from "../../../components";
import { useAuthContext } from "src/auth/hooks";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const VIDEO_URL = "/video";

function Video() {
  const { user } = useAuthContext();
  const { id, itemId } = useParams();

  const [courseContent, setCourseContent] = useState({
    video: "",
    courseContent: [
      {
        id: 1,
        topicTitle: "وهي لعيونك",
        subTopics: [
          {
            id: 1,
            title: "webpack",
            items: [
              {
                id: 1,
                title: "video intro",
                order: 1,
                type: "video",
                complete: true,
              },
              {
                id: 2,
                title: "An Article",
                order: 2,
                type: "article",
                complete: true,
              },
              {
                id: 3,
                title: "An Quiz",
                order: 3,
                type: "quiz",
                complete: false,
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
        `${VIDEO_URL}`,
        { itemId: itemId, courseId: id },
        {
          headers: {
            token: user?.accessToken,
          },
        },
      );

      setCourseContent(response.data.response);
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
        `${VIDEO_URL}/Completed`,
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
      <section className="w-full">
        <div className="flex">
          <div className="flex flex-1 justify-center">
            <div>
              <div>
                <span className="text-[48px] font-semibold">Item title</span>
              </div>
              <div className="mb-[32px] mt-[48px]">
                <ReactPlayer
                  url={courseContent.video}
                  style={{
                    backgroundColor: "#0D1832",
                    borderRadius: "15px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
                    cursor: "pointer",
                  }}
                  width="800px"
                  height="450px"
                  controls={true}
                  playing
                  playIcon={<Library size={100} className="text-light" />}
                  light={true}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                  }}
                />
                <div className="ml-[500px] py-[20px]">
                  <Button size="lg" onClick={handleCompletion}>
                    Completion Flag
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="h-full w-[400px] bg-secondary transition-all duration-1000 ease-in-out-back dark:bg-secondary-dark">
              <CourseContent courseContent={courseContent.courseContent} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Video;
