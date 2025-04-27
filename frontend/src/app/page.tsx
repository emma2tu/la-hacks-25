'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [showSearching, setShowSearching] = useState(false);
  const router = useRouter();

  const handleSend = () => {
    if (userInput.trim() === '') return; // prevent empty sends
    localStorage.setItem('userInput', userInput);
    setShowSearching(true); // Show success message
    // Wait a short moment then navigate
    setTimeout(() => {
      router.push('/litsearch');
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      {/* Window Background */}
      <div className="w-[1440px] h-[917px] relative bg-white overflow-hidden">
        {/* Logo */}
        <div className="flex justify-center items-center mt-40">
          <img
            src="/research_copilot_logo.png"
            alt="Research Copilot"
            width={150}
            height={150}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Title and Subtitle */}  
        <div className="w-[810.41px] h-20 left-[315.59px] top-[284.34px] absolute text-center justify-start text-black text-6xl font-semibold font-['Inter']">
          Research Copilot
        </div>
  
        <div className="w-[810.41px] h-20 left-[314px] top-[361.41px] absolute text-center justify-start">
          <span className="text-black text-2xl font-semibold font-['Inter']">
            Literature reviews made easy. <br />Built by researchers,
          </span>
          <span className="text-black text-2xl font-semibold font-['Inter']"> </span>
          <span className="text-blue-900 text-2xl font-semibold font-['Inter']">
            for researchers
          </span>
          <span className="text-slate-600 text-2xl font-semibold font-['Inter']">.</span>
        </div>
  
        <div className="w-52 h-9 left-[1230px] top-[33px] absolute text-center justify-start text-black text-xl font-semibold font-['Inter']">
          Learn more
        </div>
  
        {/* Gradient backgrounds */}
        <div className="w-[1293px] h-[1236px] left-[766px] top-[299px] absolute bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(104,_159.77,_220.86,_0.68)_0%,_rgba(255,_255,_255,_0)_100%)] rounded-full"></div>
        <div className="w-[1293px] h-[1236px] left-[-630px] top-[-687px] absolute bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(104,_159.77,_220.86,_0.68)_0%,_rgba(255,_255,_255,_0)_100%)] rounded-full"></div>
  
        {/* Input box container */}
        <div className="w-[500px] min-h-24 left-[470px] top-[447.22px] absolute bg-white rounded-xl border-[0.79px] border-zinc-500 flex flex-col items-start p-4">
          <textarea
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // prevent new line
                handleSend();
              }
            }}
            placeholder="Find me papers about..."
            className="w-full min-h-8 text-black text-lg font-normal font-['Inter'] bg-transparent resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={1}
          />
  
          {/* Small confirmation text */}
          {showSearching && (
            <div className="mt-2 text-[#31639B] font-semibold text-left text-sm w-full flex flex-col items-start">
              Searching for papers...
            </div>
          )}
        </div>
        
      </div>
    </div>
  );  
}
