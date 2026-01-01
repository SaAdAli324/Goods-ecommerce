import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 transition-all duration-200 ease-in-out flex items-center justify-center">
   
      <img src="public/logo/com-video-to-gif-converter-unscreen.gif" alt="Loading..." className="w-24 h-24" />


    </div>
  );
};

export default LoadingOverlay;
