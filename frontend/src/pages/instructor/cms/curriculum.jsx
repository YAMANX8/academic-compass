import { Fragment } from "react";
import { useState, useEffect } from "react";
import { Card, Button, Modal2 as Modal } from "../../../components";
import { Helmet } from "react-helmet-async";
import { Icon } from "@iconify/react";
import TopicList from "./components/topic-list";
import NewTopicModal from "./modals/new-topic-modal";
const Curriculum = () => {
  const [data, setData] = useState([]);
  const json = [
    {
      topic_level1_id: 5,
      parent_topic_title: "HTML",
      lessons: [
        {
          item_id: 36,
          item_title: "video intro to HTML Advanced Techniques",
          item_no: 1,
          item_type: "video",
          topics_sequence: "HTML Basics",
        },
        {
          item_id: 37,
          item_title: "Article intro to HTML Advanced Techniques",
          item_no: 2,
          item_type: "article",
          topics_sequence: "HTML Basics",
        },
        {
          item_id: 38,
          item_title: "quiz intro to HTML Advanced Techniques",
          item_no: 3,
          item_type: "quiz",
          topics_sequence: "HTML Basics",
        },
      ],
    },
    {
      topic_level1_id: 15,
      parent_topic_title: "Build Tools",
      lessons: [
        {
          item_id: 61,
          item_title: "video",
          item_no: 7,
          item_type: "video",
          topics_sequence: "Webpack",
        },
      ],
    },
  ];
  useEffect(() => {
    const sortedData = json.map((topic) => ({
      ...topic,
      lessons: topic.lessons.sort((a, b) => a.item_no - b.item_no),
    }));
    setData(sortedData);
  }, []);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  // New Topic Modal
  const toggleNewTopicModal = () => {
    toggleModal();
    setModalContent(<NewTopicModal />);
  };
  // ______________________________________________________________________
  return (
    <>
      <Helmet>
        <title>Course manage: Curriculum</title>
      </Helmet>
      <div className="w-full space-y-4">
        <h2>[COURSE_TITLE_PLACED_HERE]</h2>
        <Card className="flex flex-col gap-2 !py-4">
          {data.length !== 0 ? (
            data.map((topic, index) => (
              <Fragment key={topic.topic_level1_id}>
                <TopicList
                  id={topic.topic_level1_id}
                  title={topic.parent_topic_title}
                  lessons={topic.lessons}
                  setModalContent={setModalContent}
                  toggleModal={toggleModal}
                />
                {index < data.length - 1 && (
                  <hr key={index} className="bg-gray-500" />
                )}
              </Fragment>
            ))
          ) : (
            <div className="space-y-2 py-40 text-center">
              <p className="text-gray-600">
                You don’t have any lesson published your course
              </p>
              <Button className="m-auto">
                <Icon icon="mdi:plus" fontSize={20} />
                New topic
              </Button>
            </div>
          )}
          <Button
            size="md"
            variant="outlined"
            className="self-start"
            onClick={toggleNewTopicModal}
          >
            <Icon icon="mdi:plus" />
            New topic
          </Button>
        </Card>
      </div>
      <Modal title="test" isOpen={isModalOpen} onClose={toggleModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default Curriculum;
