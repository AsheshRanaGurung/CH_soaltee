import { useSlider } from "@soaltee-loyalty/hooks/useSlider";
import styled from "styled-components";
import { colors } from "@soaltee-loyalty/theme/colors";

interface IImageProps {
  image: string;
  title: string;
  text: string;
}

interface IProps {
  images: IImageProps[];
}

const SliderContainer = styled.div`
  img {
    width: 100%;
    height: 100vh;
  }
  position: relative;
  width: 100%;

  .img-content {
    width: 100%;
    background-color: black;
    -webkit-clip-path: polygon(0 0, 85% 0%, 100% 100%, 0% 100%);
    clip-path: polygon(0 0, 85% 0%, 100% 100%, 0% 100%);
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 1;
  }
`;

const SliderImage = styled.img`
  max-width: 100%;
  height: auto;
  transition: transform 0.5s ease-in-out;
`;

const DotsContainer = styled.div`
  display: flex;
  margin-top: 10px;
  position: absolute;
  z-index: 999;
  bottom: 100px;
  left: 70px;
  transition: all 0.5s ease-in-out;
`;

const Dot = styled.div<{ isActive: boolean }>`
  height: 5px;
  border-radius: 5px;
  margin: 0 5px;
  width: ${(props) => (props.isActive ? "40px" : "25px")};
  background-color: ${(props) =>
    props.isActive ? colors.primary : colors.white};
  cursor: pointer;
`;
const DotItems = styled.div`
  position: absolute;
  z-index: 999;
  bottom: 150px;
  left: 73px;
  overflow-wrap: break-word;
  width: calc(100% - 180px);
  .title {
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 3%;
    color: ${colors.white};
  }
  .text {
    font-size: 22px;
    color: ${colors.white};
  }
`;

const ImageSlider: React.FC<IProps> = ({ images }) => {
  const [sliderState, sliderActions] = useSlider({ images });
  return (
    <SliderContainer>
      <div className="img-content">
        <SliderImage
          src={images[sliderState.currentIndex].image}
          alt="Slider"
        />
        <div className="overlay"></div>
        <DotItems>
          <h2 className="title">{images[sliderState.currentIndex].title}</h2>
          <p className="text">{images[sliderState.currentIndex].text}</p>
        </DotItems>
        <DotsContainer>
          {images.map((itm, index) => (
            <Dot
              key={itm.title}
              isActive={index === sliderState.currentIndex}
              onClick={() => sliderActions.goToImage(index)}
            />
          ))}
        </DotsContainer>
      </div>
    </SliderContainer>
  );
};

export default ImageSlider;
