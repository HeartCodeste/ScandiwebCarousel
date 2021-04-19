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
  infinite?: boolean;
  autoslide?: boolean;
}

interface CarouselState {
  currentSlide: number;
  swipeStartPosition: number;
  swipeMovePosition: number;
}

class Carousel extends PureComponent<CarouselProps, CarouselState> {
  state: CarouselState = {
    currentSlide: 0,
    swipeStartPosition: 0,
    swipeMovePosition: 0,
  };
  carouselContainerRef = React.createRef<HTMLDivElement>();
  slideInterval: NodeJS.Timeout;

  componentDidMount() {
    this.handlePick(0);
    if (this.props.autoslide) {
      this.startAutoslide();
    }
    window.addEventListener("resize", this.handleResize);
  }
  componentDidUpdate(prevProps: CarouselProps) {
    if (this.props.autoslide !== prevProps.autoslide) {
      if (this.props.autoslide) {
        this.startAutoslide();
      } else {
        clearInterval(this.slideInterval);
      }
    }
    if (
      this.props.visibleSlidesCount !== prevProps.visibleSlidesCount ||
      this.props.infinite !== prevProps.infinite
    ) {
      this.handlePick(this.state.currentSlide, true);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    clearInterval(this.slideInterval);
  }
  handleResize = () => {
    this.handlePick(this.state.currentSlide, true);
  };
  startAutoslide = () => {
    this.slideInterval = setInterval(() => {
      this.handlePick(this.state.currentSlide + 1);
    }, 3000);
  };

  handleLeft = () => {
    this.handlePick(this.state.currentSlide - 1);
  };

  handleRight = () => {
    this.handlePick(this.state.currentSlide + 1);
  };

  handlePick = (currentIndex: number, instantScroll?: boolean) => {
    const currentSlide = currentIndex;
    const { visibleSlidesCount, items, infinite } = this.props;
    const slideWidth =
      visibleSlidesCount > 0
        ? this.carouselContainerRef.current.clientWidth / visibleSlidesCount
        : this.carouselContainerRef.current.clientWidth;
    this.setState({ currentSlide }, () => {
      this.carouselContainerRef.current.scrollTo({
        top: 0,
        left: infinite
          ? (this.state.currentSlide + 1) * slideWidth
          : this.state.currentSlide * slideWidth,
        behavior: instantScroll ? "auto" : "smooth",
      });
      if (infinite) {
        if (currentSlide > items.length - 1) {
          setTimeout(() => {
            this.setState({ currentSlide: 0 });
            this.carouselContainerRef.current.scrollTo({
              top: 0,
              left: slideWidth,
            });
          }, 500);
        } else if (currentSlide === -1) {
          setTimeout(() => {
            this.setState({ currentSlide: items.length - 1 });
            this.carouselContainerRef.current.scrollTo({
              top: 0,
              left: slideWidth * items.length,
            });
          }, 500);
        }
      }
    });
  };
  handleSwipe = () => {
    const { swipeStartPosition, swipeMovePosition, currentSlide } = this.state;
    const { visibleSlidesCount, items, infinite } = this.props;
    const realVisibleSlidesCount =
      visibleSlidesCount > 0 ? visibleSlidesCount : 1;
    if (swipeMovePosition < swipeStartPosition) {
      if (currentSlide < items.length - realVisibleSlidesCount || infinite) {
        this.handleRight();
      }
    } else if (swipeMovePosition > swipeStartPosition) {
      if (currentSlide > 0 || infinite) {
        this.handleLeft();
      }
    }
  };
  render() {
    const { items, visibleSlidesCount, infinite } = this.props;
    const { currentSlide } = this.state;
    const realVisibleSlidesCount =
      visibleSlidesCount > 0 ? visibleSlidesCount : 1;
    const slideWidth = 100 / realVisibleSlidesCount;
    const selectedItems = infinite
      ? items
      : items.slice(0, items.length - realVisibleSlidesCount + 1);
    return (
      <div className="carousel">
        {(currentSlide > 0 || infinite) && (
          <button
            onClick={this.handleLeft}
            className="carousel__navigation-arrow carousel__navigation-arrow--left"
          >
            <i className="fas fa-angle-left"></i>
          </button>
        )}
        <div
          onTouchStart={(ev) =>
            this.setState({ swipeStartPosition: ev.targetTouches[0].clientX })
          }
          onTouchMove={(ev) =>
            this.setState({ swipeMovePosition: ev.targetTouches[0].clientX })
          }
          onTouchEnd={this.handleSwipe}
          onMouseDown={(ev) =>
            this.setState({ swipeStartPosition: ev.clientX })
          }
          onMouseMove={(ev) => this.setState({ swipeMovePosition: ev.clientX })}
          onMouseUp={this.handleSwipe}
          className="carousel__content"
          ref={this.carouselContainerRef}
        >
          {infinite && (
            <Slide
              content={items[items.length - 1].content}
              slideWidth={slideWidth}
            />
          )}
          {items.map((item) => (
            <Slide
              key={item.id}
              content={item.content}
              slideWidth={slideWidth}
            />
          ))}
          {infinite &&
            items
              .slice(0, realVisibleSlidesCount)
              .map((item) => (
                <Slide
                  key={item.id}
                  content={item.content}
                  slideWidth={slideWidth}
                />
              ))}
        </div>
        <div className="carousel__dot-container">
          {selectedItems.map((item, i) => (
            <Dot
              key={item.id}
              handlePick={this.handlePick}
              currentIndex={i}
              currentSlide={currentSlide}
            />
          ))}
        </div>
        {(currentSlide < items.length - realVisibleSlidesCount || infinite) && (
          <button
            onClick={this.handleRight}
            className="carousel__navigation-arrow carousel__navigation-arrow--right"
          >
            <i className="fas fa-angle-right"></i>
          </button>
        )}
      </div>
    );
  }
}

export default Carousel;
