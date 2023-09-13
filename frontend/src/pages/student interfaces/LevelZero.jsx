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
} from "../../components";
import { Link, useOutletContext } from "react-router-dom";

const LevelZero = () => {
  const [roadmap, setRoadmap] = useState([
    {
      id: 1,
      topicTitle: "internet",
      topicDescription:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
      topicOrder: 1,
      topicStatus: "Trending",
      topicCategory: "essential",
    },
    {
      id: 2,
      topicTitle: "react.js",
      topicDescription:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
      topicOrder: 2,
      topicStatus: "Trending",
      topicCategory: "intermediate",
    },
    {
      id: 3,
      topicTitle: "jquery",
      topicDescription:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
      topicOrder: 3,
      topicStatus: "Deprecated",
      topicCategory: "intermediate",
    },
    {
      id: 4,
      topicTitle: "typescript",
      topicDescription:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos impedit distinctio ut, dolores ratione libero sint reprehenderit dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi? Alias reprehenderit nam ipsum placeat.",
      topicOrder: 3,
      topicStatus: "Cutting-edge",
      topicCategory: "additional",
    },
  ]);
  //some styles
  const style = "p-4 rounded-md text-dark border-2";
  const important = "bg-gradient-to-r from-primary to-accent text-light";
  
  //for the title of the page
  const [title, setTitle] = useOutletContext();
  // setTitle("FE") : I put it in a useEffect because of the warning in the console.
  useEffect(() => setTitle("fronTEnd"[0].toUpperCase() + "fronTEnd".slice(1).toLowerCase()), []);

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
          <Link to={modalLinks.search} className={`${style} ${important}`}>
            Search for a course that cover this topic
          </Link>
          <Link to={modalLinks.deeper} className={`${style} ${important}`}>
            Go Deeper!
          </Link>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {roadmap.map((topic, index) => {
        //the first topic rendering
        if (index == 0) {
          return (
            <div key={topic.id} className="w-full">
              <StartLine />
              <Topic
                topicId={topic.id}
                setIsOpen={setIsOpen}
                modalTitle={setModalTitle}
                topicTitle={topic.topicTitle}
                topicDescription={topic.topicDescription}
                modalLinks={setModalLinks}
                topicStatus={topic.topicStatus}
                category={topic.topicCategory}
              />
              <RightLine />
            </div>
          );
          //the last topic rendering
        } else if (index == roadmap.length - 1) {
          //checking if the last topic is even (Means that the topic is in the right side)
          if (index % 2 == 0)
            return (
              <div key={topic.id} className="w-full">
                <Topic
                  topicId={topic.id}
                  setIsOpen={setIsOpen}
                  modalTitle={setModalTitle}
                  topicTitle={topic.topicTitle}
                  topicDescription={topic.topicDescription}
                  modalLinks={setModalLinks}
                  topicStatus={topic.topicStatus}
                  category={topic.topicCategory}
                />{" "}
                <EndLineRight />
              </div>
            );
          //if its not, so it is in left side
          else
            return (
              <div key={topic.id} className="w-full">
                <Topic
                  topicId={topic.id}
                  setIsOpen={setIsOpen}
                  modalTitle={setModalTitle}
                  topicTitle={topic.topicTitle}
                  topicDescription={topic.topicDescription}
                  modalLinks={setModalLinks}
                  topicStatus={topic.topicStatus}
                  category={topic.topicCategory}
                  isRight={false}
                />
                <EndLineLeft />
              </div>
            );
          //the even topic rendering (right side)
        } else if (index % 2 == 0) {
          return (
            <div key={topic.id} className="w-full">
              <Topic
                topicId={topic.id}
                setIsOpen={setIsOpen}
                modalTitle={setModalTitle}
                topicTitle={topic.topicTitle}
                topicDescription={topic.topicDescription}
                modalLinks={setModalLinks}
                topicStatus={topic.topicStatus}
                category={topic.topicCategory}
              />{" "}
              <RightLine />
            </div>
          );
          //the final case is the left side topic rendering
        } else {
          return (
            <div key={topic.id} className="w-full">
              <Topic
                topicId={topic.id}
                setIsOpen={setIsOpen}
                modalTitle={setModalTitle}
                topicTitle={topic.topicTitle}
                topicDescription={topic.topicDescription}
                modalLinks={setModalLinks}
                topicStatus={topic.topicStatus}
                category={topic.topicCategory}
                isRight={false}
              />
              <LeftLine />
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

export default LevelZero;
