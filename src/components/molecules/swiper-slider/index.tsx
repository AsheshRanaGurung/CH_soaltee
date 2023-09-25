import { colors } from "@src/theme/colors";
import styled from "styled-components";
import { Swiper } from "swiper/react";

export const SwiperWrapper = styled.div`
  position: relative;
  z-index: 2;
  .swiper {
    height: 500px;
    position: unset !important;
  }
  .swiper-button-next,
  .swiper-button-prev {
    right: -4%;
    background: ${colors.slider_nav};
    z-index: 999;
    position: absolute;
    color: #fff;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    font-weight: bold;
    &:after {
      font-size: 16px;
    }
  }
  .swiper-button-prev {
    left: -4%;
  }
`;
export const SwiperSlider = ({ number, modules, children }: any) => {
  return (
    <SwiperWrapper>
      <Swiper
        slidesPerView={number}
        spaceBetween={20}
        modules={modules}
        navigation
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {children}
      </Swiper>
    </SwiperWrapper>
  );
};
