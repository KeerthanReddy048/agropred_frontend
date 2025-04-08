import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const SpikeDetection = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [developmentStage, setDevelopmentStage] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState({ width: 1, height: 1 });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return <Navigate to="/LoginPage" />;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setBoxes([]);
    setDevelopmentStage(null);  // Reset development stage on new file

    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setOriginalSize({ width: img.width, height: img.height });
      };
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://keerthan048-agropredbackend.hf.space/spike-detection", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      setOutputImage(data.processed_image || null);
      setBoxes(data.boxes || []);
      setDevelopmentStage(data.development_stage || null);

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Wheat Spike Detection</h1>

      <div className="flex justify-center items-center gap-4 mb-8">
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Process Image
        </button>
      </div>

      {imageURL && (
        <div className="flex gap-8 items-start justify-center">
          {/* Image with bounding boxes */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              ref={imageRef}
              src={imageURL}
              alt="Uploaded"
              width="350px"
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                setOriginalSize({ width: target.naturalWidth, height: target.naturalHeight });
              }}
            />
            {boxes.map((box, index) => {
              const imgElement = imageRef.current;
              const displayWidth = imgElement ? imgElement.width : originalSize.width;
              const displayHeight = imgElement ? imgElement.height : originalSize.height;

              const scaleX = displayWidth / originalSize.width;
              const scaleY = displayHeight / originalSize.height;

              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    top: box.y1 * scaleY,
                    left: box.x1 * scaleX,
                    width: (box.x2 - box.x1) * scaleX,
                    height: (box.y2 - box.y1) * scaleY,
                    border: "2px solid red",
                    boxSizing: "border-box",
                  }}
                ></div>
              );
            })}
          </div>

          {/* Development Stage Display */}
          {developmentStage && (
            <div className="bg-gray-100 p-4 rounded shadow-md w-80">
              <h2 className="text-xl font-bold mb-2">Development Stage</h2>
              <p className="text-lg font-bold text-gray-700">{developmentStage}</p>

              {/* Conditional Description */}
              {developmentStage === "Filling - Ripening" && (
                <p className="text-lg text-gray-700 mt-2">
                  The grains are maturing and starting to dry.<br />
                  The color changes from greenish to golden.<br />
                  Kernels are reaching their final size and weight.
                </p>
              )}
              {developmentStage === "Post-flowering" && (
                <p className="text-lg text-gray-700 mt-2">
                  This stage occurs after pollination.<br />
                  The wheat spikes have visible florets, and grain formation begins.<br />
                  Leaves and stems are still mostly green.
                </p>
              )}
              {developmentStage === "Filling" && (
                <p className="text-lg text-gray-700 mt-2">
                  The grains are increasing in size due to starch accumulation.<br />
                  The spikes appear fuller and greener.<br />
                  The plant is still actively growing and photosynthesizing.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {outputImage && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Processed Image</h2>
          <img src={`data:image/jpeg;base64,${outputImage}`} alt="Processed" width="500px" />
        </div>
      )}
    </div>
  );
};

export default SpikeDetection;
