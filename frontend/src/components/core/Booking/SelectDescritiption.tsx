"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks"; // Custom hook for dispatch
import { setDescription, setDescriptionType } from "@/lib/store/slices/bookingSlice";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Image from "next/image";

const SelectDescription: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(""); // Track selected option
  const [inputValue, setInputValue] = useState<string>(""); // For text input
  const [file, setFile] = useState<File | null>(null); // For image/video upload
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility
  const dispatch = useAppDispatch();

  // Speech recognition setup
  const { transcript, resetTranscript } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("Speech-to-text is not supported in your browser. Please use a modern browser.");
  }

  // Handle description submission
  const handleSubmit = () => {
    if (selectedOption === "text" && inputValue.trim()) {
      dispatch(setDescription(inputValue));
      dispatch(setDescriptionType("text"));
    } else if (selectedOption === "upload" && file) {
      dispatch(setDescription(file.name)); // You can upload and store URLs in a real implementation
      dispatch(setDescriptionType("upload"));
    } else if (selectedOption === "voice" && transcript.trim()) {
      dispatch(setDescription(transcript));
      dispatch(setDescriptionType("voice"));
    }
  };

  // Remove file
  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className="w-11/12 mx-auto mt-8 p-6 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
        Select Description Method
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-4 mb-6">
        <button
          onClick={() => setSelectedOption("text")}
          className={`w-full px-4 py-3 text-lg font-medium text-left rounded-lg border ${
            selectedOption === "text"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 text-gray-700 border-gray-300"
          } hover:bg-blue-100 focus:outline-none`}
        >
          Write Description
        </button>
        <button
          onClick={() => setSelectedOption("upload")}
          className={`w-full px-4 py-3 text-lg font-medium text-left rounded-lg border ${
            selectedOption === "upload"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 text-gray-700 border-gray-300"
          } hover:bg-blue-100 focus:outline-none`}
        >
          Upload Photo/Video
        </button>
        <button
          onClick={() => setSelectedOption("voice")}
          className={`w-full px-4 py-3 text-lg font-medium text-left rounded-lg border ${
            selectedOption === "voice"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 text-gray-700 border-gray-300"
          } hover:bg-blue-100 focus:outline-none`}
        >
          Speak (Voice to Text)
        </button>
      </div>

      {/* Input Fields */}
      <div className="mb-6">
        {selectedOption === "text" && (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Write your description here..."
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          ></textarea>
        )}

        {selectedOption === "upload" && (
          <div className="flex flex-col items-center">
            {file ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
                <div className="absolute top-0 right-0 flex space-x-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-2 py-1 text-xs text-white bg-blue-500 rounded-full"
                  >
                    View
                  </button>
                  <button
                    onClick={handleRemoveFile}
                    className="px-2 py-1 text-xs text-white bg-red-500 rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
            )}
          </div>
        )}

        {selectedOption === "voice" && (
          <div className="flex flex-col items-center gap-4">
            <textarea
              value={transcript}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Start speaking, and we'll transcribe your words..."
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              readOnly
            ></textarea>
            <div className="flex gap-4">
              <button
                onClick={startListening}
                className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
              >
                Start Speaking
              </button>
              <button
                onClick={SpeechRecognition.stopListening}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
              >
                Stop
              </button>
              <button
                onClick={resetTranscript}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        Submit Description
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-2/3 h-2/3 p-4 rounded-lg shadow-lg max-w-md">
            <Image src={URL.createObjectURL(file!)} alt="Preview" className="w-full h-full rounded-lg" width={100} height={100} />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full  px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectDescription;
