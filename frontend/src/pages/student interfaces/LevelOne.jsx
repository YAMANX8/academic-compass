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
} from "../../components";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import axios from "../../apis/axios";
import useAuth from "../../hooks/useAuth";
const LevelOne = () => {
  const { isAuth } = useAuth();
  const { topicL1Id } = useParams();
  const navigate = useNavigate();
  //getting the data
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `/roadmap/${
          !isAuth ? `topic/${topicL1Id}` : `student/topic/${topicL1Id}`
        }`,
        {
          headers: {
            token: localStorage.token,
          },
        }
      );
      setLevelOne(response.data.topics);
    };
    getData();
  }, []);
  //to know if the topic is in the last level
  const [isLast, setIsLast] = useState(false);
  const [levelOne, setLevelOne] = useState([
    {
      topic_id: 1,
      topic_title: "topic title",
      topic_description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
      topic_order: 1,
      topic_status: "Trending",
      isItLast: false,
    },
    {
      topic_id: 2,
      topic_title: "topic title",
      topic_description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
      topic_order: 2,
      topic_status: "Stable",
      isItLast: true,
    },
    {
      topic_id: 3,
      topic_title: "topic title",
      topic_description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
      topic_order: 3,
      topic_status: "Stable",
      isItLast: true,
    },
    {
      topic_id: 4,
      topic_title: "topic title",
      topic_description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
      topic_order: 3,
      topic_status: "deprecated",
      isItLast: true,
    },
  ]);
  //for the title of the page
  const [title, setTitle] = useOutletContext();
  // setTitle("FE") : I put it in a useEffect because of the warning in the console.
  useEffect(
    () =>
      setTitle(
        "topiC Level 1"[0].toUpperCase() +
          "topiC Level 1".slice(1).toLowerCase()
      ),
    []
  );
  //some styles
  const style =
    "p-4 rounded-md text-dark border-2 disabled:from-primary/50 disabled:to-accent/50";
  const important = "bg-gradient-to-r from-primary to-accent text-light";

  //for the modal:
  //the first is for the opening state of the modal
  const [isOpen, setIsOpen] = useState(false);
  //the second is for the title of the modal
  const [modalTitle, setModalTitle] = useState("");
  //this state is for the links that the modal is going to deliver us to
  const [modalLinks, setModalLinks] = useState({
    deeper: "/",
    search: "/",
  });
  //and this variable is for the markup inside the modal
  let modalTemplate = (
    <div className="flex flex-col text-[20px] gap-6">
      <div>
        <h3>Change the state:</h3>
        <div className="flex justify-evenly mt-4">
          <button className={`${style} border-primary`}>Reset</button>
          <button className={`${style} border-accent`}>Done</button>
          <button className={`${style} border-green`}>Inprogress</button>
          <button className={`${style} border-advance`}>Skip it</button>
        </div>
      </div>
      <div className="border-t-2 border-dark/20 pt-4">
        <h3>Or make another action:</h3>
        <div className="flex justify-evenly mt-4">
          {/* here we use the links state that we declare before */}
          <button
            onClick={() => navigate(modalLinks.search, {state:{byText: false, level1: false}})}
            className={`${style} ${important}`}
          >
            Search for a course that cover this topic
          </button>
          <button
            onClick={() => navigate(modalLinks.deeper)}
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
      {levelOne.map((topic, index) => {
         //if there is just one topic
         if(levelOne.length == 1) {
          return (
            <div key={topic.topic_id} className="w-full">
              <StartLineLeft />
              <Topic
                topicId={topic.topic_id}
                setIsOpen={setIsOpen}
                modalTitle={setModalTitle}
                topicTitle={topic.topic_title}
                topicDescription={topic.topic_description}
                modalLinks={setModalLinks}
                topicStatus={topic.topic_status}
                last={topic.isItLast}
                setIsLast={setIsLast}
                isRight={false}
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
                modalTitle={setModalTitle}
                topicTitle={topic.topic_title}
                topicDescription={topic.topic_description}
                modalLinks={setModalLinks}
                topicStatus={topic.topic_status}
                last={topic.isItLast}
                setIsLast={setIsLast}
                isRight={false}
              />
              <LeftLine />
            </div>
          );
          //the last topic rendering
        } else if (index == levelOne.length - 1) {
          //checking if the last topic is even (Means that the topic is in the right side)
          if (index % 2 == 0)
            return (
              <div key={topic.topic_id} className="w-full">
                <Topic
                  topicId={topic.topic_id}
                  setIsOpen={setIsOpen}
                  modalTitle={setModalTitle}
                  topicTitle={topic.topic_title}
                  topicDescription={topic.topic_description}
                  modalLinks={setModalLinks}
                  topicStatus={topic.topic_status}
                  last={topic.isItLast}
                  setIsLast={setIsLast}
                  isRight={false}
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
                  modalTitle={setModalTitle}
                  topicTitle={topic.topic_title}
                  topicDescription={topic.topic_description}
                  modalLinks={setModalLinks}
                  topicStatus={topic.topic_status}
                  last={topic.isItLast}
                  setIsLast={setIsLast}
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
                modalTitle={setModalTitle}
                topicTitle={topic.topic_title}
                topicDescription={topic.topic_description}
                modalLinks={setModalLinks}
                topicStatus={topic.topic_status}
                last={topic.isItLast}
                setIsLast={setIsLast}
                isRight={false}
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
                modalTitle={setModalTitle}
                topicTitle={topic.topic_title}
                topicDescription={topic.topic_description}
                modalLinks={setModalLinks}
                topicStatus={topic.topic_status}
                last={topic.isItLast}
                setIsLast={setIsLast}
              />
              <RightLine />
            </div>
          );
        }
      })}

      <Modal
        isOpen={isOpen}
        content={modalTemplate}
        title={modalTitle}
        close={() => setIsOpen(false)}
      />
    </>
  );
};

export default LevelOne;
