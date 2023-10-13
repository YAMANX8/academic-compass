import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "../../../apis/axios";
import { BsPlayCircleFill as Library } from "react-icons/bs";
import { CourseContent } from "../../../components";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";

const VIDEO_URL = "/video";

function Video() {
  const { auth } = useAuth();
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
            token: auth.accessToken,
          },
        }
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
      <section className="w-full">
        <div className="flex">
          <div className="flex-1 flex justify-center">
            <div>
              <div>
                <span className="font-semibold text-[48px]">Item title</span>
              </div>
              <div className="mt-[48px] mb-[32px]">
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
                  <button onClick={handleCompletion} className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent">Completion Flag</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-secondary dark:bg-secondary-dark h-full w-[400px] transition-all duration-1000 ease-in-out-back">
              <CourseContent courseContent={courseContent.courseContent} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Video;
