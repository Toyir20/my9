import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const FileRenderer = ({ file }) => {
  const [show, setShow] = useState(false);

  const isAnswer = file.name?.toLowerCase().includes("javob") || file.name?.toLowerCase().includes("answer");
  const isTranscript = file.name?.toLowerCase().includes("transcript");

  const toggleShow = () => setShow((prev) => !prev);
  const shouldHaveButton = isAnswer || isTranscript;

  return (
    <div className='all-files-map mb-4'>
      {shouldHaveButton && (
        <button
          onClick={toggleShow}
          className='px-4 py-2 mb-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200'
        >
          {show
            ? isAnswer
              ? "Hide Answer"
              : "Hide Transcript"
            : isAnswer
              ? "Show Answer"
              : "Show Transcript"}
        </button>
      )}

      <AnimatePresence>
        {(show || !shouldHaveButton) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className='mb-3'
          >
            {/* Rasmni chiqarish */}
            {file.type === "image" && (
              <img
                src={file.file}
                alt={file.name}
                className='w-1/2 object-cover rounded-xl mb-2'
              />
            )}

            {/* Audio chiqishi */}
            {file.type === "audio" && (
              <audio
                controls
                src={file.file}
                className='w-1/2 my-2'
              ></audio>
            )}

            {/* PDF chiqishi */}
            {file.type === "pdf" && (
              <div className='border border-gray-300 rounded-xl overflow-hidden w-full my-2' style={{ height: 'auto' }}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                  <Viewer fileUrl={file.file} />
                </Worker>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileRenderer;
