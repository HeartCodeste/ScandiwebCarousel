import React, { PureComponent } from "react";
import Slide from "./Slide";
import Dot from "./Dot";

export interface CarouselItem {
  id: number;
  content: JSX.Element;
}

interface CarouselProps {
  items: CarouselItem[];
}

interface CarouselState {
  currentSlide: number;
}

class Carousel extends PureComponent<CarouselProps, CarouselState> {
  state: CarouselState = {
    currentSlide: 0,
  };
  carouselContainerRef = React.createRef<HTMLDivElement>();

  handleLeft = () => {
    this.handlePick(this.state.currentSlide - 1);
  };

  handleRight = () => {
    this.handlePick(this.state.currentSlide + 1);
  };

  handlePick = (currentIndex: number) => {
    const currentSlide = currentIndex;
    this.setState({ currentSlide }, () => {
      this.carouselContainerRef.current.scrollTo({
        top: 0,
        left:
          this.state.currentSlide *
          this.carouselContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    });
  };

  render() {
    const { items } = this.props;
    const { currentSlide } = this.state;
    return (
      <div className="carousel">
        {currentSlide > 0 && (
          <button
            onClick={this.handleLeft}
            className="carousel__navigation-arrow carousel__navigation-arrow--left"
          >
            &lt;
          </button>
        )}
        <div className="carousel__content" ref={this.carouselContainerRef}>
          {items.map((item) => (
            <Slide key={item.id} content={item.content} />
          ))}
        </div>
        {items.map((item, i) => (
          <Dot
            key={item.id}
            handlePick={this.handlePick}
            currentIndex={i}
            currentSlide={currentSlide}
          />
        ))}
        {currentSlide < items.length - 1 && (
          <button
            onClick={this.handleRight}
            className="carousel__navigation-arrow carousel__navigation-arrow--right"
          >
            &gt;
          </button>
        )}
      </div>
    );
  }
}

export default Carousel;
