import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="p-5 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-5">Loading...</h1>
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
};

export default Loading;
