'use client'
import { useState } from 'react';
import { useRouter, useSearchParams} from 'next/navigation';
import React, {Suspense} from 'react';

// Import your TopicFetcher component
import TopicFetcher from '../components/TopicFetcher';
import Title from '../components/Title';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicId = searchParams.get('id');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDesc, setCurrentDesc] = useState('');

  const updateTopic = async () => {
    try {
      const response = await fetch('/api/saveData', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: topicId,
          TopicTitle: currentTitle,
          Topicdesc: currentDesc
        })
      });
      const data = await response.json();
      if (data.success) {
        console.log('Topic updated successfully');
      } else {
        console.error('Failed to update topic', data.message);
      }
    } catch (error) {
      console.error('Error updating topic', error);
    } finally {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col">
      <Title />
      <Suspense fallback={<div>Loading topic data...</div>}>
        <TopicFetcher topicId={topicId}>
          {(topic) => (
            <>
              <input
                value={currentTitle || topic.TopicTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                className="text-black ml-auto mr-auto max-w-fit min-w-[700px] outline-none mt-2 p-2"
                placeholder="Enter topic title"
              />
              <input
                value={currentDesc || topic.Topicdesc}
                onChange={(e) => setCurrentDesc(e.target.value)}
                className="text-black ml-auto mr-auto max-w-fit min-w-[700px] outline-none m-2 p-2"
                placeholder="Enter topic description"
              />
              <button
                onClick={updateTopic}
                className="text-black ml-auto mr-auto max-w-fit outline-none m-2 p-2 text-left bg-white"
              >
                Update Topic
              </button>
            </>
          )}
        </TopicFetcher>
      </Suspense>
    </div>
  );
};

export default Page;
