// here we use roadmap id to get the data
import { useEffect, useState } from "react";
import {
  RightLine,
  LeftLine,
  StartLine,
  EndLineRight,
  EndLineLeft,
  Topic,
  Modal,
} from "../../../components";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../../auth/hooks";
import { Helmet } from "react-helmet-async";
import { useMapContext } from "../../../context/hooks/use-roadmap-context.js";
// ___________________________________________________________________________
const LevelZero = () => {
  const { getTopics0, topics0, handleState, handleReset, roadmapName } = useMapContext();
  const { authenticated } = useAuthContext();
  const { roadmapId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const style = "p-4 rounded-md text-dark border-2";
  const important = "bg-gradient-to-r from-primary to-accent text-light";
  const [modalData, setModalData] = useState({
    id: "",
    level: "",
    title: "",
    deeper: "/",
    search: "/",
  });

  useEffect(() => {
    getTopics0(roadmapId);
  }, [authenticated]);

  let modalTemplate = (
    <div className="flex flex-col text-[20px] gap-6">
      <div>
        <h3>Change the state:</h3>
        <div className="flex justify-evenly mt-4">
          <button
            className={`${style} border-primary`}
            onClick={() =>
              handleReset(modalData.id, modalData.level, setIsOpen)
            }
          >
            Reset
          </button>
          <button
            className={`${style} border-accent`}
            onClick={() =>
              handleState(3, modalData.id, modalData.level, setIsOpen)
            }
          >
            Done
          </button>
          <button
            className={`${style} border-green`}
            onClick={() =>
              handleState(2, modalData.id, modalData.level, setIsOpen)
            }
          >
            Inprogress
          </button>
          <button
            className={`${style} border-advance`}
            onClick={() =>
              handleState(1, modalData.id, modalData.level, setIsOpen)
            }
          >
            Skip it
          </button>
        </div>
      </div>
      <div className="border-t-2 border-dark/20 pt-4">
        <h3>Or make another action:</h3>
        <div className="flex justify-evenly mt-4">
          <Link
            to={modalData.search}
            className={`${style} ${important}`}
            state={{ byText: false, level1: true }}
          >
            Search for a course that cover this topic
          </Link>
          <Link to={modalData.deeper} className={`${style} ${important}`}>
            Go Deeper!
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{`${roadmapName}`} roadmap</title>
      </Helmet>
      {topics0.map((topic, index) => {
        //the first topic rendering
        if (index == 0) {
          return (
            <div key={topic.topic_id} className="w-full">
              <StartLine />
              <Topic
                topicId={topic.topic_id}
                setIsOpen={setIsOpen}
                topicTitle={topic.topic_title}
                topicDescription={topic.topic_description}
                topicStatus={topic.topic_status}
                category={topic.topic_category}
                modalData={setModalData}
                progressState={topic.state_name}
              />
              <RightLine />
            </div>
          );
          //the last topic rendering
        } else if (index == topics0.length - 1) {
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
                  category={topic.topic_category}
                  modalData={setModalData}
                  progressState={topic.state_name}
                />{" "}
                <EndLineRight />
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
                  category={topic.topic_category}
                  isRight={false}
                  modalData={setModalData}
                  progressState={topic.state_name}
                />
                <EndLineLeft />
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
                category={topic.topic_category}
                modalData={setModalData}
                progressState={topic.state_name}
              />{" "}
              <RightLine />
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
                category={topic.topic_category}
                isRight={false}
                modalData={setModalData}
                progressState={topic.state_name}
              />
              <LeftLine />
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

export default LevelZero;
