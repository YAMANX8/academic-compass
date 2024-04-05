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
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../auth/hooks";
import { paths } from "../../../routes/paths";
import { useMapContext } from "../../../context/hooks/use-roadmap-context.js";

const LevelN = () => {
  const { getTopicsN, topicsN, handleState, handleReset } = useMapContext();
  const { authenticated } = useAuthContext();
  const { roadmapId, topicL1Id, topicLnId } = useParams();
  const navigate = useNavigate();
  const style =
    "p-4 rounded-md text-dark border-2 disabled:from-primary/50 disabled:to-accent/50";
  const important = "bg-gradient-to-r from-primary to-accent text-light";
  const [isLast, setIsLast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    id: "",
    level: "",
    title: "",
    deeper: "/",
    search: "/",
  });

  useEffect(() => {
    getTopicsN(topicLnId);
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
            onClick={() => {
              navigate(
                `${paths.roadmaps}/${roadmapId}/${topicL1Id}/${modalData.deeper}`
              );
              setIsOpen(false);
            }}
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
      {topicsN.map((topic, index) => {
        if (topicsN.length == 1) {
          return (
            <div key={topic.topic_id} className="w-full">
              <StartLine />
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
        } else if (index == 0) {
          return (
            <div key={topic.topic_id} className="w-full">
              <StartLine />
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
        } else if (index == topicsN.length - 1) {
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
                  modalData={setModalData}
                  progressState={topic.state_name}
                  topicLevel={topic.topic_level}
                />{" "}
                <EndLineRight />
              </div>
            );
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
                  isRight={false}
                  modalData={setModalData}
                  progressState={topic.state_name}
                  topicLevel={topic.topic_level}
                />
                <EndLineLeft />
              </div>
            );
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
                modalData={setModalData}
                progressState={topic.state_name}
                topicLevel={topic.topic_level}
              />{" "}
              <RightLine />
            </div>
          );
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
                isRight={false}
                modalData={setModalData}
                progressState={topic.state_name}
                topicLevel={topic.topic_level}
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

export default LevelN;
