'use client'; // Add this line
import React, { useState } from 'react';
import { TbRobotFace } from 'react-icons/tb';
import { TbRobot } from 'react-icons/tb';
import { HiOutlineMicrophone } from 'react-icons/hi';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import InfoCard from '../component';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');

    const toggleWindow = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* Main content */}
            <div className="p-4 h-178">
                {/* You can add content here */}
                {/* <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded" 
                    onClick={toggleWindow}
                >
                    {isOpen ? 'Close Chat' : 'Open Chat'}
                </button> */}
            </div>

            {/* Sliding window on the right */}
            <div
                className={`absolute top-0 right-0 h-full transition-all duration-300 ${isOpen ? 'w-100' : 'w-16' // 1/5 width when open, small width when closed
                    } bg-white text-gray-800`}
            >

                {/* <button
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded"
                    onClick={toggleWindow}
                >
                    X
                </button> */}
                {/* Conditional rendering for the chat window content */}
                {isOpen && (
                    <>
                        <div className="max-w-4xl max-h-135 overflow-auto m-4 ">
                            <div className="m-4 rounded-lg ">
                                <InfoCard
                                    title="Research on AI"
                                    images={[
                                        'https://clevertap.com/wp-content/uploads/2019/04/Neural_Network_Brain_Mimic.jpeg',
                              
                                    ]}
                                    findings="Our research suggests that AI could improve automation in many industries."
                                    readMore="https://example.com/research"
                    
                                />
                            </div>

                            <div className="m-4 rounded-lg ">
                                <InfoCard
                                    title="Research on AI"
                                    images={[
                                        'https://miro.medium.com/v2/resize:fit:1024/0*lyVC9DDkDSbWyC71.jpg',
                                   
                                    ]}
                                    findings="Our research suggests that AI could improve automation in many industries."
                                    readMore="https://example.com/research"
                              
                                />
                            </div>

                            <div className="m-4 rounded-lg ">
                                <InfoCard
                                    title="Research on AI"
                                    images={[
                                        'https://www.aamc.org/sites/default/files/medical-research-lab.jpg',
                                
                                    ]}
                                    findings="Our research suggests that AI could improve automation in many industries."
                                    readMore="https://example.com/research"
                            
                                />
                            </div>
                        </div>


                        {/* Close button in the window */}


                        {/* Textarea and icons */}
                        <div className="rounded-xl w-8/9 h-35 absolute bottom-10 left-5 mx-auto mt-50">
                            {/* <TbRobot size={35} /> */}
                            <button
                                // onClick={handleSpeechToText}
                                className="absolute top-[125px] left-3 text-2xl text-gray-600 cursor-pointer"
                            >
                                <HiOutlineMicrophone />
                            </button>
                            <button
                                // onClick={handleSpeechToText}
                                className="absolute top-[120px] right-3 text-2xl text-gray-600 cursor-pointer"
                            >
                                <IoArrowUpCircleOutline size={30} />
                            </button>

                            <textarea
                                id="message"
                                className="w-full h-30 mt-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Find me papers about..."
                                rows={4}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </div>
                    </>
                )}
            </div>

            {/* Button to toggle chat window */}
            {/* <button
                className="absolute top-80 ${isOpen ? 'right-94' : 'right-94'} p-4 bg-gray-200 text-gray-800 rounded-full"
                onClick={toggleWindow}
            >
                {isOpen ? <IoIosArrowForward size={20} /> : <IoIosArrowBack size={20} />}
            </button> */}

            <button
                className={`absolute top-80 ${isOpen ? 'right-94' : 'right-9'} p-4 bg-gray-200 text-gray-800 rounded-full transition-all duration-300`}
                onClick={toggleWindow}
            >
                {isOpen ? <IoIosArrowForward size={20} /> : <IoIosArrowBack size={20} />}
            </button>
        </div>
    );
};

export default Chat;
