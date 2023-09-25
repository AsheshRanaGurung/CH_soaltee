import { imageList } from "@src/assets/images";
import { MemberCard } from "../../../organisms/member-card";
import { Box } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";

import { colors } from "@src/theme/colors";
import { getAllOfferSelect } from "@src/service/offer";
import { SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper";

import { useQuery } from "react-query";
import { getUserDetail } from "@src/service/user";
import { getImage } from "@src/service/image";
import { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { redeemData, stepCardData, earnPointsData } from "@src/constant/index";
import { HeadingText } from "@src/components/molecules/heading-text";
import { font } from "@src/theme/font";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useOfferData } from "@src/constant/useOffer";
import { SwiperSlider } from "@src/components/molecules/swiper-slider";
import { EarnPoint } from "@src/components/organisms/earn-point";
import { SpecialOffer } from "@src/components/organisms/special-offer";
import { CardStep } from "@src/components/organisms/step-card";
import { Redeem } from "@src/components/organisms/reward-points";
import { Hotel } from "@src/components/molecules/hotels";
import { Latestoffer } from "../latest-offer";
import { BookForm } from "../book-form";

export const Userpage = () => {
  const [_scrolled, setScrolled] = useState(false);
  function handleScroll() {
    if (window.scrollY > 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { data: offerData } = useQuery("offer", getAllOfferSelect, {
    select: ({ data }) => data.data,
  });
  const [initialOffer, setInitialOfferId] = useState("");

  const { data } = useQuery("user_detail", getUserDetail, {
    select: ({ data }) => data.data,
  });
  const { tierImage } = data ?? "";
  const { nextTierImage } = data ?? "";

  const { data: imageData } = useQuery("image", () => getImage(tierImage), {
    enabled: !!tierImage,
  });
  //get next tier image
  const { data: nextTier } = useQuery(
    "next_image",
    () => getImage(nextTierImage),
    {
      enabled: !!nextTierImage,
    }
  );
  const [imageSrc, setImageSrc] = useState<string | null>(tierImage);
  const [nextImageSrc, setNextImageSrc] = useState<string | null>(
    nextTierImage
  );

  useEffect(() => {
    const blobDataCurrent = new Blob([imageData?.data], { type: "image/jpeg" });
    const blobDataNext = new Blob([nextTier?.data], { type: "image/jpeg" });

    const imageUrlCurrent = URL.createObjectURL(blobDataCurrent);
    const imageUrlNext = URL.createObjectURL(blobDataNext);

    // Set the URL as the image source
    setImageSrc(imageUrlCurrent);
    setNextImageSrc(imageUrlNext);

    // Clean up the URL when the component unmounts
    return () => {
      URL.revokeObjectURL(imageUrlCurrent);
      URL.revokeObjectURL(imageUrlNext);

      setImageSrc("");
      setNextImageSrc("");
    };
  }, [imageData, nextTier]);

  const commonTier = {
    fullName: data?.fullName,
    customerId: data?.customerId,
    pointsToNextTier: data?.pointsToNextTier,
    tierDescription: data?.nextTierDescription,
    totalRewardPoints: data?.totalRewardPoints,
    nextMembershipTier: data?.nextMembershipTier,
  };
  const tierInfoData = [
    {
      ...commonTier,
      image: imageSrc,
      tierName: data?.tierName,
    },
    {
      ...commonTier,
      image: nextImageSrc,
      tierName: data?.nextMembershipTier,
    },
  ];
  const offerResponse = useOfferData(initialOffer);
  const navigate = useNavigate();
  const fetchOfferDetail = (id: any) => {
    setInitialOfferId(id);
    const offerResult = offerResponse;
    navigate(NAVIGATION_ROUTES.OFFER_DETAIL, { state: offerResult });
  };

  return (
    <>
      <Box
        background={`${colors.secondary} url(${imageList.BackgoundImage}) center center/cover no-repeat`}
        marginTop="95px"
        fontFamily={font.josefin}
      >
        <Container maxW={"1400px"} height="700px">
          <SwiperSlider number={1} modules={[Navigation, Autoplay]}>
            {tierInfoData?.map((item: any, index: any) => (
              <SwiperSlide key={index}>
                <MemberCard
                  image={item?.image}
                  tierName={item?.tierName}
                  fullName={item?.fullName}
                  customerId={item?.customerId}
                  pointsToNextTier={item?.pointsToNextTier}
                  tierDescription={item?.nextTierDescription}
                  totalRewardPoints={item?.totalRewardPoints}
                  nextMembershipTier={item?.nextMembershipTier}
                />
              </SwiperSlide>
            ))}
          </SwiperSlider>
        </Container>
        <Box id="earn_point" background={colors.white}>
          <Container maxW={"1400px"}>
            <EarnPoint data={earnPointsData} />
          </Container>
        </Box>
      </Box>
      <Box
        p={["40px 0"]}
        position="relative"
        zIndex={4}
        background={colors.secondary}
        _before={{
          content: `""`,
          background: colors.secondary,
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%",
          transform: "translateY(-25%)",
        }}
      >
        <Container maxW={"1400px"} position="relative" zIndex={12}>
          <HeadingText
            heading="SOALTEE HERITAGE CLUB"
            maintitle="Our Special Offers"
            titletext="We provide special services worldwide with exclusive services and specialist."
          />
          <SwiperSlider number={2} modules={[Navigation, Autoplay, Pagination]}>
            {offerData?.map(
              (item: {
                offerName: string;
                description: string;
                offerImage: any;
                offerId: number;
              }) => (
                <SwiperSlide key={item?.offerId}>
                  <SpecialOffer
                    title={item?.offerName}
                    desc={item?.description}
                    buttonText={"View More"}
                    img={item?.offerImage}
                    viewDetail={() => fetchOfferDetail(item.offerId)}
                  />
                </SwiperSlide>
              )
            )}
          </SwiperSlider>
        </Container>
      </Box>

      <CardStep data={stepCardData} />

      <BookForm />
      <Box id="redeem_point" background={colors.secondary} p={["60px 0"]}>
        <HeadingText
          heading="SOALTEE HERITAGE CLUB"
          maintitle="How to Redeem your Points"
          titletext="Enjoy any services we provide by Redeeming your points"
        />
        <Redeem data={redeemData} />
      </Box>
      <Hotel />
      <Latestoffer />
    </>
  );
};
