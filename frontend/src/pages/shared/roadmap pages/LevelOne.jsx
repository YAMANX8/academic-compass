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
  Button,
} from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../auth/hooks";
import { useMapContext } from "../../../context/hooks/use-roadmap-context.js";
import { MdSearch, MdOutlineZoomInMap } from "react-icons/md";

// ___________________________________________________________________________
const LevelOne = () => {
  const { getTopics1, topics1, handleState, handleReset } = useMapContext();
  const { authenticated } = useAuthContext();
  const { topicL1Id } = useParams();
  const navigate = useNavigate();
  //some styles
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
    getTopics1(topicL1Id);
  }, [authenticated]);

  let modalTemplate = (
    <div className="flex flex-col gap-6 text-[20px]">
      <div>
        <h3>Change the state:</h3>
        <div className="mt-4 flex justify-evenly">
          <Button
            color="error"
            variant="soft"
            size="lg"
            onClick={() =>
              handleReset(modalData.id, modalData.level, setIsOpen)
            }
          >
            Reset
          </Button>
          <Button
            variant="soft"
            size="lg"
            onClick={() =>
              handleState(3, modalData.id, modalData.level, setIsOpen)
            }
          >
            Done
          </Button>
          <Button
            color="accent"
            variant="soft"
            size="lg"
            onClick={() =>
              handleState(2, modalData.id, modalData.level, setIsOpen)
            }
          >
            Inprogress
          </Button>
          <Button
            color="warning"
            variant="soft"
            size="lg"
            onClick={() =>
              handleState(1, modalData.id, modalData.level, setIsOpen)
            }
          >
            Skip it
          </Button>
        </div>
      </div>
      <div className="border-t-2 border-dark/20 pt-4">
        <h3>Or make another action:</h3>
        <div className="mt-4 flex justify-evenly">
          <Button
            variant="outlined"
            size="lg"
            onClick={() =>
              navigate(modalData.search, {
                state: { byText: false, level1: false },
              })
            }
          >
            <MdSearch size={24} />
            Search for a course that cover this topic
          </Button>
          <Button
            size="lg"
            onClick={() => navigate(modalData.deeper)}
            disabled={isLast}
          >
            <MdOutlineZoomInMap size={24} />
            Go Deeper!
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {topics1.map((topic, index) => {
        //if there is just one topic
        if (topics1.length == 1) {
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
        } else if (index == topics1.length - 1) {
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
