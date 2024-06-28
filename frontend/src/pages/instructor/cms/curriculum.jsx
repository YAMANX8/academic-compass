import { Fragment } from "react";
import { useState, useEffect } from "react";
import { Card, Button, Modal2 as Modal } from "../../../components";
import { Helmet } from "react-helmet-async";
import { Icon } from "@iconify/react";
import TopicList from "./components/topic-list";
import NewTopicModal from "./modals/new-topic-modal";
import { useCmsContext } from "../../../context/hooks/use-cms-context";
const Curriculum = () => {
  const { curriculum } = useCmsContext();
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
        <h2>{curriculum.courseTitle}</h2>
        <Card className="flex flex-col gap-2 !py-4">
          {curriculum.topics.length !== 0 ? (
            curriculum.topics.map((topic, index) => (
              <Fragment key={topic.topic_level1_id}>
                <TopicList
                  id={topic.topic_level1_id}
                  title={topic.parent_topic_title}
                  lessons={topic.lessons}
                  setModalContent={setModalContent}
                  toggleModal={toggleModal}
                />
                {index < curriculum.topics.length - 1 && (
                  <hr key={index} className="bg-gray-500" />
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
              </Fragment>
            ))
          ) : (
            <div className="space-y-2 py-40 text-center">
              <p className="text-gray-600">
                You don’t have any lesson published your course
              </p>
              <Button className="m-auto" onClick={toggleNewTopicModal}>
                <Icon icon="mdi:plus" fontSize={20} />
                New topic
              </Button>
            </div>
          )}
        </Card>
      </div>
      <Modal title="test" isOpen={isModalOpen} onClose={toggleModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default Curriculum;
