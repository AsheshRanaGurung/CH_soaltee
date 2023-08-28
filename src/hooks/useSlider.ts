import { useState, useEffect } from "react";

interface IProps {
  images: string[];
}

interface ISliderState {
  currentIndex: number;
}

interface ISliderActions {
  goToNext: () => void;
  goToPrev: () => void;
  goToImage: (index: number) => void;
}

type SliderHook = [ISliderState, ISliderActions];

export const useSlider = ({ images }: IProps): SliderHook => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const sliderState: ISliderState = {
    currentIndex,
  };

  const sliderActions: ISliderActions = {
    goToNext,
    goToPrev,
    goToImage,
  };

  return [sliderState, sliderActions];
};
