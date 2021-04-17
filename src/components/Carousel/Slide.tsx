import React from "react";

interface SlideProps {
  content: JSX.Element;
}

const Slide = ({ content }: SlideProps) => {
  return <div className="carousel__slide">{content}</div>;
};

export default Slide;
