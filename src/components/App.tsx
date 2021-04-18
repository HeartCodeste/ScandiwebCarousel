import React, { useState } from "react";
import Carousel from "./Carousel";
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
          items={dataPicture}
          visibleSlidesCount={visibleSlidesCount}
          infinite={infinite}
          autoslide={autoslide}
        />
      </div>
      <Carousel items={dataHero} />
      <Carousel items={dataText} />
    </div>
  );
};

export default App;
