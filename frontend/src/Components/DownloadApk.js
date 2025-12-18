import React from "react";

export default function DownLoadApk() {
  const handleDownload = () => {
    // Create a temporary link and trigger click
    const link = document.createElement("a");
    link.href = "/matkamela.apk"; // Path to your APK in public folder
    link.download = "matkamela.apk"; // Optional: set the download filename
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="btn border-white border-dotted border-2 btn-primary px-1 w-full mt-2 py-1 rounded bg-gradient-to-l from-[#c31432] to-[#240b36] text-lg text-white hover:bg-blue-700 transition duration-300"
    >
      Install Application 2
    </button>
  );
}
