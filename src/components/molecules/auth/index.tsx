import { colors } from "@soaltee-loyalty/theme/colors";
import styled from "styled-components";
import ImageSlider from "../image-slider";
import { imageList } from "@soaltee-loyalty/assets/images";
import useWindowSize from "@soaltee-loyalty/hooks/useWindowResize";
interface IProps {
  children: React.ReactNode;
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.secondary};
  @media screen and (max-width: 720px) {
    height: 100vh;
  }
`;
const FormContent = styled.div`
  width: 60%;
  margin-left: 100px;
  .img {
    position: absolute;
    top: 15px;
    right: 20px;
    width: 150px;
  }
  @media screen and (max-width: 720px) {
    width: 100%;
    margin: 0;
    padding: 10px;
  }
`;
const Footer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 62%;
  display: flex;
  color: ${colors.dark_gray};
  gap: 35px;
  font-size: 14px;
  @media screen and (max-width: 720px) {
    left: 20px;
    gap: 10px;
  }
`;
const Authentication: React.FC<IProps> = ({ children }) => {
  const { width } = useWindowSize();
  const images = [
    {
      image: imageList.HotelImage,
      title: "Unlock the world of soaltee rewards one",
      text: "Our exclusive loyalty program especially designed to enhance your travel experience and provide you with a host of exciting benefits.",
    },
    {
      image: imageList.HotelImage,
      title: "Unlock the world of soaltee rewards two",
      text: "Our exclusive loyalty program especially designed.",
    },
    {
      image: imageList.HotelImage,
      title: "Unlock the world of soaltee rewards",
      text: "Our exclusive loyalty program especially designed.",
    },
  ];
  return (
    <Wrapper>
      {width > 720 && <ImageSlider images={images} />}
      <FormContent>
        <img src={imageList.Logo} className="img" />
        {children}
        <Footer>
          <p>Privacy policy</p>
          <p>Terms & Services</p>
          <p>©2017 Soaltee Hotel Limited</p>
        </Footer>
      </FormContent>
    </Wrapper>
  );
};
export default Authentication;
