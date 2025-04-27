"use client";
import React from 'react';

import { CgProfile } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation'; // Import useRouter



export default function Navbar() {
    const router = useRouter(); // Initialize the router

    const goHome = () => {
        router.push('/'); // Navigate to the root '/' page
        console.log('clicked');
    };

    return (
        <div className="fixed top-0 left-0 h-full w-25 bg-white text-black p-4">
            <img className="w-25 mb-5" src="./research_copilot_logo.png" />

            <div className="mt-10 ml-3">
        {/* Wrapping GoHome icon inside a button */}
        <button
          onClick={goHome} // Trigger the navigation on click
          className="cursor-pointer hover:text-blue-500 z-10"
          aria-label="Go to Home"
        >
          <GoHome size={35} />
        </button>
      </div>

            <div className="mt-105 ml-3">
                <IoSettingsOutline size={35} />
            </div>
            <div className="mt-10 ml-3">
                <CgProfile size={35} />
            </div>

        </div>
    );
}