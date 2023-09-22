import { Box, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { Text } from "@chakra-ui/react";
import { offerValidationSchema } from "@src/schema/offer";
import { useFormHook } from "@src/hooks/useFormhook";
import { useEffect, useState } from "react";
import { IOffers } from "@src/interface/offers";
import { useCreateOffer, useUpdateOffer } from "@src/service/offer";
import ModalFooterForm from "@src/components/molecules/modal/footer";

const defaultValues = {
  offerId: "",
  offerImage: "",
  offerName: "",
  description: "",
  subTitle: "",
};
type IndividualDataType = {
  description?: string;
  offerImage?: any;
};

export const CreateOfferForm = ({
  isUpdate,
  updateId,
  tableData,
  setIsUpdate,
  setUpdateId,
  onOfferModalClose,
}: any) => {
  const { handleSubmit, register, errors, reset, setValue } = useFormHook({
    validationSchema: offerValidationSchema,
    defaultValues,
  });
  const [individualData, setIndividualData] = useState<IndividualDataType>({});

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData?.data.find((x: IOffers) => x.offerId === updateId);
      setIndividualData(data);
      reset({ ...data });
      setValue("image", data?.offerImage);
    }
  }, [isUpdate, updateId]);

  const { mutateAsync: mutate, isLoading } = useCreateOffer();

  const { mutateAsync: update, isLoading: isUpdating } = useUpdateOffer();
  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onOfferModalClose();
  };

  const onSubmitHandler = async (data: IOffers) => {
    const formData = new FormData();
    const dat = {
      offerName: data.offerName,
      subTitle: data.subTitle,
      description: data.description,
    };
    formData.append("data", JSON.stringify(dat));
    if (updateId) {
      if (data.image) {
        formData.append("image", data.image as Blob);
        const result = await update({ id: updateId, data: formData });
        result.status === 200 && onCloseHandler();
      } else {
        formData.append("image", "");
        const result = await update({ id: updateId, data: formData });
        result.status === 200 && onCloseHandler();
      }
    } else {
      formData.append("image", data.image as Blob);
      const result = await mutate(formData);
      result.status === 200 && onCloseHandler();
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box mx={{ base: "none", md: "auto" }}>
        <FormControl
          control="input"
          name="offerName"
          register={register}
          placeholder={"Offer Name"}
          label={"Offer Name"}
          error={errors?.offerName?.message || ""}
          required
        />
        <FormControl
          control="input"
          name="subTitle"
          register={register}
          placeholder={"Sub Title"}
          label={"Sub Title"}
          error={errors?.subTitle?.message || ""}
          required
        />
        <FormControl
          onChange={(data: string) => setValue("description", data)}
          control="editor"
          name="description"
          label={"Description"}
          required
          placeholder={"description"}
          data={
            (updateId && individualData && individualData?.description) ?? ""
          }
          error={errors?.description?.message ?? ""}
        />

        <Text fontSize={"sm"} mt={5} mb={2} fontWeight={"500"}>
          Image
          {!updateId && <span style={{ color: "red" }}>&nbsp;*</span>}
        </Text>
        <ImageUpload
          setValue={setValue}
          error={errors?.image?.message}
          imageSrc={isUpdate ? individualData?.offerImage : undefined}
        />

        {/* <Spacer /> */}
        <ModalFooterForm
          onCloseModal={onOfferModalClose}
          resetButtonText={"Cancel"}
          isLoading={isLoading || isUpdating}
          submitButtonText={isUpdate ? "Update Offer" : "Add Offer"}
        />
        <Spacer />
      </Box>
    </form>
  );
};
