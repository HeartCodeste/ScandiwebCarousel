import React from "react";

interface DotProps {
  currentIndex: number;
  currentSlide: number;
  handlePick: (currentIndex: number) => void;
}

const Dot = (props: DotProps) => {
  const { currentIndex, currentSlide, handlePick } = props;
  const dotClass = currentIndex === currentSlide ? "carousel__dot--active" : "";
  return (
    <button
      onClick={() => handlePick(currentIndex)}
      className={`carousel__dot ${dotClass}`}
    ></button>
  );
};

export default Dot;
