import React, { useState } from "react";
import Carousel from "./Carousel";
import Slide from "./Carousel/Slide";
import { dataPicture } from "./dataPicture";
import { dataHero } from "./dataHero";
import { dataText } from "./dataText";
import Navbar from "./Navbar";

const App = () => {
  const [visibleSlidesCount, setVisibleSlidesCount] = useState<number>(1);
  const [infinite, setInfinite] = useState<boolean>(true);
  const [autoslide, setAutoslide] = useState<boolean>(true);
  return (
    <div className="wrapper">
      <h1 className="heading">Carousel component project</h1>
      <h2 className="heading">Configurable carousel</h2>
      <div className="configurable-carousel">
        <Navbar
          visibleSlidesCount={visibleSlidesCount}
          infinite={infinite}
          autoslide={autoslide}
          onVisibleSlidesCountChange={setVisibleSlidesCount}
          onInfiniteChange={setInfinite}
          onAutoslideChange={setAutoslide}
        />
        <Carousel
          visibleSlidesCount={visibleSlidesCount}
          infinite={infinite}
          autoslide={autoslide}
        >
          {dataPicture.map((item) => (
            <Slide key={item.id}>{item.content}</Slide>
          ))}
        </Carousel>
      </div>
      <h2 className="heading">Hero image carousel</h2>
      <Carousel>
        {dataHero.map((item) => (
          <Slide key={item.id}>{item.content}</Slide>
        ))}
      </Carousel>
      <h2 className="heading">Text carousel</h2>
      <Carousel>
        {dataText.map((item) => (
          <Slide key={item.id}>{item.content}</Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default App;
