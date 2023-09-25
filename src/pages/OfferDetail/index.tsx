import { useLocation } from "react-router-dom";
import { OfferTemplate } from "../../components/templates/user/offer-detail";

export const OfferDetail = () => {
  const { state } = useLocation();
  const { offerImage, offerName, description, subTitle } = state;
  return (
    <>
      <>
        <OfferTemplate
          title={offerName}
          heading="SOALTEE HERITAGE CLUB"
          subtitle={subTitle}
          description={description}
          image={offerImage}
        />
      </>
    </>
  );
};
