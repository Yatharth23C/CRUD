import React, { useState, useEffect } from 'react';

const fetchTopicData = async (topicId) => {
  try {
    const response = await fetch('/api/saveData', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    const data = await response.json();
    return data.data.find(t => t._id === topicId);
  } catch (error) {
    console.error('Error fetching topic data:', error);
    return null;
  }
};

const TopicFetcher = ({ topicId, children }) => {
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const topicData = await fetchTopicData(topicId);
      setTopic(topicData);
    };
    loadData();
  }, [topicId]);

  if (!topic) return <div>Loading...</div>;

  return children(topic);
};

export default TopicFetcher;
