import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import NewItem from "./components/new-item";
import NewTopic from "./components/new-topic";
import Lesson from "./components/lesson";

const Curriculum = () => {
  const [courseTitle, setCourseTitle] = useState("[COURSE_TITLE_PLACED_HERE]");
  const [topics, setTopics] = useState([]);
  const [openIndexes, setOpenIndexes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null); 

  const data = [
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
    setTopics(data);
  }, []);

  const handleVisibilityToggle = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const sortLessons = (lessons) => {
    const order = {
      video: 1,
      quiz: 2,
      article: 3,
      code: 4,
    };

    return lessons.sort((a, b) => {
      const aType =
        Object.keys(order).find((key) =>
          a.item_type.toLowerCase().includes(key),
        ) || 5;
      const bType =
        Object.keys(order).find((key) =>
          b.item_type.toLowerCase().includes(key),
        ) || 5;
      return order[aType] - order[bType];
    });
  };

  const getIconForLesson = (lessonType) => {
    if (lessonType.toLowerCase().includes("video"))
      return "mdi:file-video-outline";
    if (lessonType.toLowerCase().includes("quiz"))
      return "mdi:help-circle-outline";
    if (lessonType.toLowerCase().includes("article"))
      return "mdi:file-document-outline";
    if (lessonType.toLowerCase().includes("code"))
      return "mdi:file-code-outline";
    return "mdi:file-document-outline";
  };

  const handleSaveTopic = () => {
    if (selectedTopic) {
      const topicToAdd = {
        topic_level1_id: Math.random(),
        parent_topic_title: selectedTopic,
        lessons: [],
      };
      setTopics((prevTopics) => [...prevTopics, topicToAdd]);
      setIsModalOpen(false);
      setSelectedTopic("");
    }
  };

  const handleDeleteItem = (topicIndex, itemIndex) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].lessons.splice(itemIndex, 1);
    setTopics(updatedTopics);
  };

  const handleAddNewItem = (lessonName, selectedTopic) => {
    if (selectedItemType && selectedTopicIndex !== null) {
      const newItem = {
        item_id: Math.random(),
        topics_sequence: selectedTopic,
        item_title: `${selectedItemType.toLowerCase()} ${lessonName}`,
        item_no: topics[selectedTopicIndex].lessons.length + 1,
        item_type: selectedItemType.toLowerCase(),
      };
      const updatedTopics = [...topics];
      updatedTopics[selectedTopicIndex].lessons = sortLessons([
        ...updatedTopics[selectedTopicIndex].lessons,
        newItem,
      ]);
      setTopics(updatedTopics);
      setIsNewItemModalOpen(false);
      setSelectedItemType(null);
      setSelectedTopicIndex(null); // Reset the selected topic index after saving
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-primary-main mb-4 text-[30px] text-xl font-bold">
        {courseTitle}
      </h1>
      <div className="rounded-lg bg-white p-4 shadow text-center">
        {topics.length === 0 ? (
          <div className="py-10">
            <p className="mb-4 text-gray-600">
              You don’t have any lesson published your course
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center rounded border border-primary p-2 text-primary mx-auto"
            >
              <Icon icon="mdi:plus-box" className="mr-2 h-[20px] w-[20px]" />
              New topic
            </button>
          </div>
        ) : (
          topics.map((topic, index) => (
            <div key={index}>
              <div className="flex items-center justify-between border-b border-gray-200 py-2 text-primary">
                <span className="font-bold">{topic.parent_topic_title}</span>
                <button
                  className="text-primary-main"
                  onClick={() => handleVisibilityToggle(index)}
                >
                  <Icon
                    icon={
                      openIndexes.includes(index)
                        ? "mdi:chevron-down-box-outline"
                        : "mdi:chevron-up-box-outline"
                    }
                    className="w-[20px] h-[20px]"
                  />
                </button>
              </div>
              {openIndexes.includes(index) && (
                <>
                  {topic.lessons.length > 0 &&
                    sortLessons(topic.lessons).map((lesson, lessonIndex) => (
                      <Lesson
                        key={lessonIndex}
                        lesson={lesson}
                        onDelete={() => handleDeleteItem(index, lessonIndex)}
                        getIconForLesson={getIconForLesson}
                      />
                    ))}
                  <div className="ml-6 mt-2">
                    <button
                      className="flex items-center justify-center rounded border border-accent p-2 text-accent"
                      onClick={() => {
                        setSelectedTopicIndex(index);
                        setIsNewItemModalOpen(true);
                      }}
                    >
                      <Icon icon="mdi:plus-box" className="mr-2 h-4 w-4" />
                      New item
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
        {topics.length !== 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 flex items-center justify-center rounded border border-primary p-2 text-primary"
          >
            <Icon icon="mdi:plus-box" className=" mr-2 h-[20px] w-[20px]" />
            New topic
          </button>
        )}
      </div>

      <NewItem
        isOpen={isNewItemModalOpen}
        onClose={() => setIsNewItemModalOpen(false)}
        onAddItem={handleAddNewItem}
        setSelectedItemType={setSelectedItemType}
      />

      <NewTopic
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTopic}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />
    </div>
  );
};

export default Curriculum;
