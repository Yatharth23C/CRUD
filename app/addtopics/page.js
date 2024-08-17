'use client'
import Title from '../components/Title'

import { useState, useEffect } from 'react'

export default function Page() {
    const [obj, setObj] = useState([{ index: 0, TopicTitle: '', Topicdesc: '' }]);
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentDesc, setCurrentDesc] = useState('');

    useEffect(() => {
        if (obj.length > 1) {
            const sendDataToMongoDB = async (obj) => {
                try {
                    const response = await fetch('/api/saveData', { 
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(obj[obj.length - 1]) 
                    });
                    if (!response.ok) {
                        throw new Error(`Network response was not ok ${response.statusText}`);
                    }
                    const data = await response.json();
                    console.log('Data saved successfully:', data);
                } catch (error) {
                    console.log('Error saving data:', error);
                }
            };
            sendDataToMongoDB(obj);
        }  
    }, [obj]);

    const handleClick = () => {
        const newObj = {
            index: obj.length,
            TopicTitle: currentTitle,
            Topicdesc: currentDesc
        };
        setObj([...obj, newObj]);
        console.log('Updated obj:', obj);
        console.log('Current Title:', currentTitle, 'Current Desc:', currentDesc);
    };

    return (
        <div className="flex flex-col">
            <Title />
            <input
                onChange={(e) => setCurrentTitle(e.target.value)}
                className="text-black ml-auto mr-auto max-w-fit min-w-[700px] outline-none mt-2 p-2"
                placeholder="Topic Title"
            />
            <input
                onChange={(e) => setCurrentDesc(e.target.value)}
                className="text-black ml-auto mr-auto max-w-fit min-w-[700px] outline-none m-2 p-2"
                placeholder="Topic description"
            />
            <button
                onClick={handleClick}
                className="text-black ml-auto mr-auto max-w-fit outline-none m-2 p-2 text-left bg-white"
            >
                Add Topic
            </button>
        </div>
    );
}
