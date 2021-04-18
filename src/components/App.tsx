import React from "react";
import Carousel from "./Carousel";
import { dataPicture } from "./dataPicture";
import { dataHero } from "./dataHero";
import { dataText } from "./dataText";

const App = () => {
  return (
    <div className="wrapper">
      <Carousel items={dataPicture} visibleSlidesCount={3} />
      <Carousel items={dataPicture} />
      <Carousel items={dataHero} />
      <Carousel items={dataText} />
    </div>
  );
};

export default App;
