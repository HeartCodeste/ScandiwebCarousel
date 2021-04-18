import React from "react";
import Carousel from "./Carousel";
import { dataPicture } from "./dataPicture";
import { dataHero } from "./dataHero";
import { dataText } from "./dataText";

const App = () => {
  return (
    <div className="wrapper">
      <Carousel items={dataPicture} visibleSlidesCount={3} infinite/>
      <Carousel items={dataPicture} infinite/>
      <Carousel items={dataHero} />
      <Carousel items={dataText} />
    </div>
  );
};

export default App;
