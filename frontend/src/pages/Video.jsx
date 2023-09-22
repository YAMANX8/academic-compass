import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "../apis/axios";
import { MdVideoLibrary as Library } from "react-icons/md";
import { Button, CourseContent } from "../components";
import useAuth from "../hooks/useAuth.jsx";

const VIDEO_URL = "/course/video";

function Video() {
  const { auth } = useAuth();

  const [videoUrl, setVideoUrl] = useState("");
  const [courseContent, setCourseContent] = useState([]);

  const getData = async () => {
    try {
      const courseId = 12;
      const itemId = 26;

      const response = await axios.get(`${VIDEO_URL}/${courseId}/${itemId}`, {
        headers: {
          token: auth.localstorage
        },
      });

      console.log(response);
      setVideoUrl(response.data.video);
      setCourseContent(response.data.courseContent);
    } catch (error) {
      console.error("يوجد خطأ:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleCompletion = () => {
    console.log("تم انتهاء");
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
                  url={videoUrl}
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
                  <Button onClick={handleCompletion}>Completion Flag</Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-secondary dark:bg-secondary-dark h-full w-[400px] transition-all duration-1000 ease-in-out-back">
              <CourseContent courseContent={courseContent} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Video;
