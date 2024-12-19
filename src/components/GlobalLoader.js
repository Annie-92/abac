import React from "react";
import { useLoader } from "../context/LoaderContext";
import { PulseLoader } from "react-spinners";
import "./GlobalLoader.css";

const GlobalLoader = () => {
  const { isLoading } = useLoader();

  return (
    isLoading && (
      <div className="loader-overlay">
        <PulseLoader color="#FD673A" size={15} />
      </div>
    )
  );
};

export default GlobalLoader;
