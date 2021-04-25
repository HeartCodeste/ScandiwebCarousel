import React from "react";

interface SlideProps {
  children: React.ReactElement;
  slideWidth?: number;
}

const Slide = ({ children, slideWidth }: SlideProps) => {
  return (
    <div className="carousel__slide" style={{ width: `${slideWidth}%` }}>
      {children}
    </div>
  );
};

export default Slide;
