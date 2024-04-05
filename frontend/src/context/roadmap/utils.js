// This function is for merging the topics array with the progress arrays
export const mergeTopicsWithProgress = (progress, topics) => {
  const mergedData = topics.map((topic) => {
    const matchingProgress = progress.find(
      (item) => item.topic_id === topic.topic_id
    );
    return {
      ...topic,
      state_name: matchingProgress ? matchingProgress.state_name : "",
    };
  });

  return mergedData;
};

export const updateTopicState = (topicId, state, topics) => {
  let updatedTopics = [...topics];
  let stateName =
    state == 1
      ? "skip it"
      : state == 2
      ? "In Progress"
      : state == 3
      ? "Completed"
      : "";

  const index = updatedTopics.findIndex((obj) => obj.topic_id === topicId);
  if (index !== -1) {
    updatedTopics[index] = {
      ...updatedTopics[index],
      state_name: stateName,
    };
  } else {
    console.log("Object with id", topicId, "not found.");
  }

  return updatedTopics;
};
