'use client'
import Title from './components/Title'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Home() {
  const router = useRouter();
  const [topics, setTopics] = useState([])
  
  const gotoTopic=(topicId)=>{
    
    router.push(`/updatetopic?id=${topicId}`)
  }

  useEffect(() => {
    
    const retrieveDataFromMongoDB = async () => {
      try {
        const response = await fetch('/api/saveData', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        const data = await response.json();
        
        setTopics(data.data); 
      } catch (error) {
        console.error(error);
      }
    }
    retrieveDataFromMongoDB();

     
  }, [])

  const deleteDataFromMongoDB = async (id)=>{
    try{const response = await fetch('/api/saveData',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})})
    const data = await response.json();
    
    if(data.success){
      setTopics(topics.filter(topic=>topic._id !==id));
    }else{
      console.log('failed to delete topic',data.message);
      
    }}catch(error){
      console.error('Error',error)
    }
    
    
  }
 
  return (
    <div className="flex flex-col p-3 ml-auto mr-auto max-w-fit text-black bg-white max-h-fit">
      <Title />
      
      {topics.length > 0 ? (
        <div className="">
          <ul>
            {topics.map((topic, index) => (
              <li className="Title and desc bg-gray-400 p-1 mt-5" key={index}>
                <p className=" m-1 p-1 text-2xl">{topic.TopicTitle}</p>
                <p className=" m-1 p-1">{topic.Topicdesc}</p>
                
                <button onClick={()=>{deleteDataFromMongoDB(topic._id)}} className="p-2 m-1 border-black rounded-lg  bg-black text-white">Delete</button>
                <button onClick={()=>{gotoTopic(topic._id)}} className="p-2 m-1 border-black rounded-lg  bg-black text-white">Update</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>None</p>
      )}
    </div>
  );
}
