import { useLocation } from "react-router-dom";
import { OfferTemplate } from "../../components/templates/user/offer-detail";
import { UserLayout } from "@src/components/organisms/user-layout";

export const OfferDetail = () => {
  const { state } = useLocation();
  const { offerImage, offerName, description, subTitle } = state;
  return (
    <>
      <UserLayout>
        <OfferTemplate
          title={offerName}
          heading="SOALTEE HERITAGE CLUB"
          subtitle={subTitle}
          description={description}
          image={offerImage}
        />
      </UserLayout>
    </>
  );
};
