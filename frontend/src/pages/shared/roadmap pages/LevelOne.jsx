//here we use topic level 1 to get the data
import { useEffect, useState } from "react";
import {
  RightLine,
  LeftLine,
  StartLineLeft,
  EndLineRight,
  EndLineLeft,
  Topic,
  Modal,
} from "../../../components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "../../../apis/axios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { paths } from "../../../routes/paths";
const LevelOne = () => {
  const location = useLocation();
  const { auth, isAuth } = useAuth();
  const { topicL1Id } = useParams();
  const navigate = useNavigate();
  //a state for holding the response message when changing the topics state!
  const [countUpdate, setCountUpdate] = useState(1);
  //the actual roadmap data
  const [mergedData, setMergedData] = useState([]);
  //getting the data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `/roadmap/${
            !isAuth ? `topic/${topicL1Id}` : `student/topic/${topicL1Id}`
          }`,
          {
            headers: {
              token: auth.accessToken,
            },
          }
        );
        // setLevelOne(response.data.topics);
        //consider if the user is not loged in so, I put "|| []"
        const progress = (await response.data.progress) || [];

        const mergedData = await response.data.topics.map((topic) => {
          const matchingProgress = progress.find(
            (item) => item.topic_id === topic.topic_id
          );
          return {
            topic_id: topic.topic_id,
            topic_title: topic.topic_title,
            topic_description: topic.topic_description,
            topic_status: topic.topic_status,
            topic_order: topic.topic_order,
            topic_category: topic.topic_category,
            isItLast: topic.isItLast,
            topic_level: topic.topic_level,
            state_name: matchingProgress ? matchingProgress.state_name : "",
          };
        });
        setMergedData(mergedData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [countUpdate]);
  //to know if the topic is in the last level
  const [isLast, setIsLast] = useState(false);
  // const [levelOne, setLevelOne] = useState([
  //   {
  //     topic_id: 1,
  //     topic_title: "topic title",
  //     topic_description:
  //       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
  //     topic_order: 1,
  //     topic_status: "Trending",
  //     isItLast: false,
  //   },
  //   {
  //     topic_id: 2,
  //     topic_title: "topic title",
  //     topic_description:
  //       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
  //     topic_order: 2,
  //     topic_status: "Stable",
  //     isItLast: true,
  //   },
  //   {
  //     topic_id: 3,
  //     topic_title: "topic title",
  //     topic_description:
  //       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
  //     topic_order: 3,
  //     topic_status: "Stable",
  //     isItLast: true,
  //   },
  //   {
  //     topic_id: 4,
  //     topic_title: "topic title",
  //     topic_description:
  //       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
  //     topic_order: 3,
  //     topic_status: "deprecated",
  //     isItLast: true,
  //   },
  // ]);
  //some styles
  const style =
    "p-4 rounded-md text-dark border-2 disabled:from-primary/50 disabled:to-accent/50";
  const important = "bg-gradient-to-r from-primary to-accent text-light";

  //for the modal:
  //the first is for the opening state of the modal
  const [isOpen, setIsOpen] = useState(false);
  //modal data
  const [modalData, setModalData] = useState({
    id: "",
    level: "",
    title: "",
    deeper: "/",
    search: "/",
  });
  //handling the states of the topics
  const handleState = async (state) => {
    try {
      const res = await axios.post(
        "/roadmap/addState/student/state",
        JSON.stringify({
          topic_id: modalData.id,
          topic_level: modalData.level,
          state_id: state,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            token: auth.accessToken,
          },
        }
      );
      setCountUpdate((prev) => prev + 1);
      setIsOpen(false);
      toast.success(`topic state is updated successfully (${countUpdate})`);
    } catch (err) {
      if (err.response.status === 403) {
        toast.error("Your need to login first!!");
        navigate(paths.auth.student.login, { state: { from: location } });
      }
    }
  };
  const handleReset = async () => {
    try {
      const res = await axios.delete(
        `/roadmap/addState/student/reset/${modalData.id}/${modalData.level}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: auth.accessToken,
          },
        }
      );
      setCountUpdate((prev) => prev + 1);
      setIsOpen(false);
      toast.success(`topic state is updated successfully (${countUpdate})`);
    } catch (err) {
      if (err.response.status === 403)
        navigate("/student/login", { state: { from: location } });
    }
  };

  //and this variable is for the markup inside the modal
  let modalTemplate = (
    <div className="flex flex-col text-[20px] gap-6">
      <div>
        <h3>Change the state:</h3>
        <div className="flex justify-evenly mt-4">
          <button
            className={`${style} border-primary`}
            onClick={() => handleReset()}
          >
            Reset
          </button>
          <button
            className={`${style} border-accent`}
            onClick={() => handleState(3)}
          >
            Done
          </button>
          <button
            className={`${style} border-green`}
            onClick={() => handleState(2)}
          >
            Inprogress
          </button>
          <button
            className={`${style} border-advance`}
            onClick={() => handleState(1)}
          >
            Skip it
          </button>
        </div>
      </div>
      <div className="border-t-2 border-dark/20 pt-4">
        <h3>Or make another action:</h3>
        <div className="flex justify-evenly mt-4">
          {/* here we use the links state that we declare before */}
          <button
            onClick={() =>
              navigate(modalData.search, {
                state: { byText: false, level1: false },
              })
            }
            className={`${style} ${important}`}
          >
            Search for a course that cover this topic
          </button>
          <button
            onClick={() => navigate(modalData.deeper)}
            className={`${style} ${important}`}
            disabled={isLast}
          >
            Go Deeper!
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {mergedData.map((topic, index) => {
        //if there is just one topic
        if (mergedData.length == 1) {
          return (
            <div key={topic.topic_id} className="w-full">
              <StartLineLeft />
              <Topic
                topicId={topic.topic_id}
                setIsOpen={setIsOpen}
                topicTitle={topic.topic_title}
                topicDescription={topic.topic_description}
                topicStatus={topic.topic_status}
                last={topic.isItLast}
                setIsLast={setIsLast}
                isRight={false}
                modalData={setModalData}
                progressState={topic.state_name}
                topicLevel={topic.topic_level}
              />
              <EndLineLeft />
            </div>
          );
        }
        //the first topic rendering
        else if (index == 0) {
          return (
            <div key={topic.topic_id} className="w-full">
              <StartLineLeft />
              <Topic
                topicId={topic.topic_id}
                setIsOpen={setIsOpen}
                topicTitle={topic.topic_title}
                topicDescription={topic.topic_description}
                topicStatus={topic.topic_status}
                last={topic.isItLast}
                setIsLast={setIsLast}
                isRight={false}
                modalData={setModalData}
                progressState={topic.state_name}
                topicLevel={topic.topic_level}
              />
              <LeftLine />
            </div>
          );
          //the last topic rendering
        } else if (index == mergedData.length - 1) {
          //checking if the last topic is even (Means that the topic is in the right side)
          if (index % 2 == 0)
            return (
              <div key={topic.topic_id} className="w-full">
                <Topic
                  topicId={topic.topic_id}
                  setIsOpen={setIsOpen}
                  topicTitle={topic.topic_title}
                  topicDescription={topic.topic_description}
                  topicStatus={topic.topic_status}
                  last={topic.isItLast}
                  setIsLast={setIsLast}
                  isRight={false}
                  modalData={setModalData}
                  progressState={topic.state_name}
                  topicLevel={topic.topic_level}
                />{" "}
                <EndLineLeft />
              </div>
            );
          //if its not, so it is in left side
          else
            return (
              <div key={topic.topic_id} className="w-full">
                <Topic
                  topicId={topic.topic_id}
                  setIsOpen={setIsOpen}
                  topicTitle={topic.topic_title}
                  topicDescription={topic.topic_description}
                  topicStatus={topic.topic_status}
                  last={topic.isItLast}
                  setIsLast={setIsLast}
                  modalData={setModalData}
                  progressState={topic.state_name}
                  topicLevel={topic.topic_level}
                />
                <EndLineRight />
              </div>
            );
          //the even topic rendering (right side)
        } else if (index % 2 == 0) {
          return (
            <div key={topic.topic_id} className="w-full">
              <Topic
                topicId={topic.topic_id}
                setIsOpen={setIsOpen}
                topicTitle={topic.topic_title}
                topicDescription={topic.topic_description}
                topicStatus={topic.topic_status}
                last={topic.isItLast}
                setIsLast={setIsLast}
                isRight={false}
                modalData={setModalData}
                progressState={topic.state_name}
                topicLevel={topic.topic_level}
              />{" "}
              <LeftLine />
            </div>
          );
          //the final case is the left side topic rendering
        } else {
          return (
            <div key={topic.topic_id} className="w-full">
              <Topic
                topicId={topic.topic_id}
                setIsOpen={setIsOpen}
                topicTitle={topic.topic_title}
                topicDescription={topic.topic_description}
                topicStatus={topic.topic_status}
                last={topic.isItLast}
                setIsLast={setIsLast}
                modalData={setModalData}
                progressState={topic.state_name}
                topicLevel={topic.topic_level}
              />
              <RightLine />
            </div>
          );
        }
      })}

      <Modal
        isOpen={isOpen}
        content={modalTemplate}
        title={modalData.title}
        close={() => setIsOpen(false)}
      />
    </>
  );
};

export default LevelOne;
