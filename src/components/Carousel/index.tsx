import React, { PureComponent } from "react";
import Dot from "./Dot";

interface CarouselProps {
  visibleSlidesCount?: number;
  infinite?: boolean;
  autoslide?: boolean;
}

interface CarouselState {
  currentSlide: number;
  swipeStartPosition: number;
  swipeMovePosition: number;
  isSwiping: boolean;
}

class Carousel extends PureComponent<CarouselProps, CarouselState> {
  state: CarouselState = {
    currentSlide: 0,
    swipeStartPosition: 0,
    swipeMovePosition: 0,
    isSwiping: false,
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
    const { visibleSlidesCount, infinite, children } = this.props;
    const items = React.Children.toArray(children);
    if (
      !infinite &&
      (currentIndex < 0 || currentIndex > items.length - visibleSlidesCount)
    ) {
      return;
    }

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
          setTimeout(
            () => {
              this.setState({ currentSlide: 0 });
              this.carouselContainerRef.current.scrollTo({
                top: 0,
                left: slideWidth,
              });
            },
            instantScroll ? 0 : 500
          );
        } else if (currentSlide === -1) {
          setTimeout(
            () => {
              this.setState({ currentSlide: items.length - 1 });
              this.carouselContainerRef.current.scrollTo({
                top: 0,
                left: slideWidth * items.length,
              });
            },
            instantScroll ? 0 : 500
          );
        }
      }
    });
  };
  handleSwipe = () => {
    const { swipeStartPosition, swipeMovePosition, currentSlide } = this.state;
    const { visibleSlidesCount, infinite, children } = this.props;
    const items = React.Children.toArray(children);
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
    this.setState({ isSwiping: false });
  };
  handleSwipeFollowing = (position: number) => {
    if (this.state.isSwiping) {
      const newSwipePosition = this.state.swipeMovePosition - position;
      this.carouselContainerRef.current.scrollTo({
        top: 0,
        left: this.carouselContainerRef.current.scrollLeft + newSwipePosition,
      });
      const swipeLength = this.state.swipeStartPosition - position;
      const slideWidth =
        this.props.visibleSlidesCount > 0
          ? this.carouselContainerRef.current.clientWidth /
            this.props.visibleSlidesCount
          : this.carouselContainerRef.current.clientWidth;
      if (Math.abs(swipeLength) >= slideWidth) {
        const slideMoveCount = Math.floor(Math.abs(swipeLength) / slideWidth);
        if (swipeLength > 0) {
          this.handlePick(this.state.currentSlide + slideMoveCount, true);
          this.setState({ swipeStartPosition: position });
        } else if (swipeLength < 0) {
          this.handlePick(this.state.currentSlide - slideMoveCount, true);
          this.setState({ swipeStartPosition: position });
        }
      }
      this.setState({ swipeMovePosition: position });
    }
  };
  render() {
    const { visibleSlidesCount, infinite, children } = this.props;
    const { currentSlide } = this.state;
    const realVisibleSlidesCount =
      visibleSlidesCount > 0 ? visibleSlidesCount : 1;
    const slideWidth = 100 / realVisibleSlidesCount;
    const items = React.Children.toArray(children);
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
            this.setState({
              swipeStartPosition: ev.targetTouches[0].clientX,
              swipeMovePosition: ev.targetTouches[0].clientX,
              isSwiping: true,
            })
          }
          onTouchMove={(ev) =>
            this.handleSwipeFollowing(ev.targetTouches[0].clientX)
          }
          onTouchEnd={this.handleSwipe}
          onMouseDown={(ev) =>
            this.setState({
              swipeStartPosition: ev.clientX,
              swipeMovePosition: ev.clientX,
              isSwiping: true,
            })
          }
          onMouseMove={(ev) => this.handleSwipeFollowing(ev.clientX)}
          onMouseUp={this.handleSwipe}
          className="carousel__content"
          ref={this.carouselContainerRef}
        >
          {infinite &&
            (React.isValidElement(items[items.length - 1])
              ? React.cloneElement(items[items.length - 1] as any, {
                  slideWidth,
                })
              : null)}
          {items.map((item) =>
            React.isValidElement(item)
              ? React.cloneElement(item, { slideWidth })
              : null
          )}
          {infinite &&
            items
              .slice(0, realVisibleSlidesCount)
              .map((item) =>
                React.isValidElement(item)
                  ? React.cloneElement(item, { slideWidth })
                  : null
              )}
        </div>
        <div className="carousel__dot-container">
          {selectedItems.map((item, i) => (
            <Dot
              key={i}
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
