import React from "react";
import Carousel from "./Carousel";
import { data } from "./data";

const App = () => {
  return (
    <div className="wrapper">
      <Carousel items={data} />
    </div>
  );
};

export default App;
