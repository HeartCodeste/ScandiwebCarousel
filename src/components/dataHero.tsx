import React from "react";
import { CarouselItem } from "./Carousel";

const createBackground = (backgroundImage: string) => {
  return {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${backgroundImage}")`,
  };
};

export const dataHero: CarouselItem[] = [
  {
    id: 1,
    content: (
      <div
        className="hero"
        style={createBackground(
          "https://images.pexels.com/photos/567540/pexels-photo-567540.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        )}
      >
        <div className="hero__content">
          <h1 className="hero__title">Chameleon</h1>
          <p className="hero__description">
            Chameleons can change color for camouflage.
          </p>
          <button className="hero__read-more">Read more</button>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div
        className="hero"
        style={createBackground(
          "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        )}
      >
        <div className="hero__content">
          <h1 className="hero__title">Lion</h1>
          <p className="hero__description">Lions are kings of the jungle.</p>
          <button className="hero__read-more">Read more</button>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div
        className="hero"
        style={createBackground(
          "https://images.pexels.com/photos/52509/penguins-emperor-antarctic-life-52509.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        )}
      >
        <div className="hero__content">
          <h1 className="hero__title">Penguin</h1>
          <p className="hero__description">
            Penguins evolved to fly underwater.
          </p>
          <button className="hero__read-more">Read more</button>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div
        className="hero"
        style={createBackground(
          "https://images.pexels.com/photos/4577792/pexels-photo-4577792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        )}
      >
        <div className="hero__content">
          <h1 className="hero__title">Giraffe</h1>
          <p className="hero__description">
            Giraffes are the tallest mammals on Earth.
          </p>
          <button className="hero__read-more">Read more</button>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    content: (
      <div
        className="hero"
        style={createBackground(
          "https://images.pexels.com/photos/2570524/pexels-photo-2570524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        )}
      >
        <div className="hero__content">
          <h1 className="hero__title">Turtle</h1>
          <p className="hero__description">
            Turtles are some of the oldest animals around.
          </p>
          <button className="hero__read-more">Read more</button>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    content: (
      <div
        className="hero"
        style={createBackground(
          "https://images.pexels.com/photos/2289411/pexels-photo-2289411.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        )}
      >
        <div className="hero__content">
          <h1 className="hero__title">Starfish</h1>
          <p className="hero__description">
            Starfish have no brain and no blood.
          </p>
          <button className="hero__read-more">Read more</button>
        </div>
      </div>
    ),
  },
];
