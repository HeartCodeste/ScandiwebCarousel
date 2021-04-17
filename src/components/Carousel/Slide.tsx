import React from "react";

interface SlideProps {
  content: JSX.Element;
  slideWidth: number;
}

const Slide = ({ content, slideWidth }: SlideProps) => {
  return (
    <div className="carousel__slide" style={{ width: `${slideWidth}%` }}>
      {content}
    </div>
  );
};

export default Slide;
