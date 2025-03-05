"use client";
import React, { useState } from "react";
import { Link, Send } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { backend_url } from "../../config";
const PromptInterface = () => {
  const [inputValue, setInputValue] = useState("");
  const { getToken } = useAuth();

  const handleSubmit = async () => {
    const token = await getToken();
    console.log("here")
    const response = await axios.post(
      `${backend_url}/project`,
      {
        prompt: inputValue,
      },
      {
        headers: {
          authorization:`Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-16">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-black text-3xl font-bold mb-4">
          What do you want to build?
        </h1>
        <p className="text-black text-lg">
          Prompt, run, edit, and deploy full-stack{" "}
          <span className="text-black">web</span> and{" "}
          <span className="text-black">mobile</span> apps.
        </p>
      </div>

      {/* Input Box */}
      <div className="w-full max-w-3xl relative">
        <div className=" rounded-lg border shadow-xl p-6">
          <textarea
            placeholder="How can Bolt help you today?"
            className="bg-transparent text-gray-600 w-full outline-none resize-none text-lg h-32"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          {/* Action buttons */}
          <div className="flex items-center mt-4 gap-5">
            <button className="text-gray-500 mr-4">
              <Link size={20} />
            </button>
            <button className="text-gray-500">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button className="cursor-pointer" onClick={handleSubmit}>
              <Send className="w-5 h-5 text-gray-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInterface;
