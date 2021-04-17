import React, { PureComponent } from "react";
import Slide from "./Slide";
import Dot from "./Dot";

export interface CarouselItem {
  id: number;
  content: JSX.Element;
}

interface CarouselProps {
  items: CarouselItem[];
  visibleSlidesCount?: number;
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
    const { visibleSlidesCount } = this.props;
    const slideWidth =
      visibleSlidesCount > 0
        ? this.carouselContainerRef.current.clientWidth / visibleSlidesCount
        : this.carouselContainerRef.current.clientWidth;
    this.setState({ currentSlide }, () => {
      this.carouselContainerRef.current.scrollTo({
        top: 0,
        left: this.state.currentSlide * slideWidth,
        behavior: "smooth",
      });
    });
  };

  render() {
    const { items, visibleSlidesCount } = this.props;
    const { currentSlide } = this.state;
    const realVisibleSlidesCount =
      visibleSlidesCount > 0 ? visibleSlidesCount : 1;
    const slideWidth = 100 / realVisibleSlidesCount;
    const selectedItems = items.slice(
      0,
      items.length - realVisibleSlidesCount + 1
    );
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
            <Slide
              key={item.id}
              content={item.content}
              slideWidth={slideWidth}
            />
          ))}
        </div>
        {selectedItems.map((item, i) => (
          <Dot
            key={item.id}
            handlePick={this.handlePick}
            currentIndex={i}
            currentSlide={currentSlide}
          />
        ))}
        {currentSlide < items.length - realVisibleSlidesCount && (
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
