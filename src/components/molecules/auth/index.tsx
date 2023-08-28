import { colors } from "@soaltee-loyalty/theme/colors";
import styled from "styled-components";
import ImageSlider from "../image-slider";
import { imageList } from "@soaltee-loyalty/assets/images";
interface IProps {
  children: React.ReactNode;
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.secondary};
`;
const FormContent = styled.div`
  width: 50%;
  margin-left: 100px;
`;
const Authentication: React.FC<IProps> = ({ children }) => {
  const images = [
    {
      image: imageList.HotelImage,
      title: "Unlock the world of soaltee rewards",
      text: "Our exclusive loyalty program especially designed to enhance your travel experience and provide you with a host of exciting benefits.",
    },
    {
      image: imageList.HotelImage,
      title: "Unlock the world of soaltee rewards",
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
      <ImageSlider images={images} />
      <FormContent>{children}</FormContent>
    </Wrapper>
  );
};
export default Authentication;
