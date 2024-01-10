import Slider from "react-slick";

import { ReactChildren, ReactChild } from "react";

interface SlickSliderProps {
  settings: any;
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

const SlickSlider = ({ settings }: SlickSliderProps) => {
  return <Slider {...settings}></Slider>;
};

export default SlickSlider;
