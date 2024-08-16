// 'use client';

// import { useState, useEffect, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Title from "../components/Title";

// export default function Page() {
//     const router = useRouter();
//     const [topic, setTopic] = useState([]);
//     const [currentTitle, setCurrentTitle] = useState('');
//     const [currentDesc, setCurrentDesc] = useState('');
//     const searchParams = useSearchParams();
//     const topicId = searchParams.get('id');

//     useEffect(() => {
//         const fetchTopic = async () => {
//             try {
//                 const response = await fetch('/api/saveData', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//                 const data = await response.json();
//                 setTopic(data.data);

//                 const topicToUpdate = data.data.find(t => t._id === topicId);
//                 if (topicToUpdate) {
//                     setCurrentTitle(topicToUpdate.TopicTitle);
//                     setCurrentDesc(topicToUpdate.Topicdesc);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchTopic();
//     }, [topicId]);

//     const updateTopic = async () => {
//         const topicToUpdate = topic.find(t => t._id === topicId);
//         if (topicToUpdate) {
//             try {
//                 const response = await fetch('/api/saveData', {
//                     method: 'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         id: topicToUpdate._id,
//                         TopicTitle: currentTitle,
//                         Topicdesc: currentDesc
//                     })
//                 });

//                 const data = await response.json();
//                 if (data.success) {
//                     console.log('Topic updated successfully');
//                 } else {
//                     console.error('Failed to update topic', data.message);
//                 }
//             } catch (error) {
//                 console.error('Error updating topic', error);
//             } finally {
//                 router.push('/');
//             }
//         } else {
//             console.error('No topic available to update');
//         }
//     };

//     if (!topicId) {
//         return <div>Loading...</div>; // Render this while waiting for topicId
//     }

//     return (
//        <Suspense fallback={<div>Loading...</div>}><div className="flex flex-col">
//             <Title />
//             <input
//                 value={currentTitle}
//                 onChange={(e) => setCurrentTitle(e.target.value)}
//                 className="text-black ml-auto mr-auto max-w-fit min-w-[700px] outline-none mt-2 p-2"
//                 placeholder="Enter topic title"
//             />
//             <input
//                 value={currentDesc}
//                 onChange={(e) => setCurrentDesc(e.target.value)}
//                 className="text-black ml-auto mr-auto max-w-fit min-w-[700px] outline-none m-2 p-2"
//                 placeholder="Enter topic description"
//             />
//             <button
//                 onClick={updateTopic}
//                 className="text-black ml-auto mr-auto max-w-fit outline-none m-2 p-2 text-left bg-white"
//             >
//                 Update Topic
//             </button>
//         </div>
//         </Suspense> 
//     );
// }
export default function page(){
    return(<>Piss off</>)
}