import { Box, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Text } from "@chakra-ui/react";
import { offerValidationSchema } from "@src/schema/offer";
import { useFormHook } from "@src/hooks/useFormhook";
import { useEffect } from "react";
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

export const CreateOfferForm = ({
  isUpdate,
  updateId,
  tableData,
  setIsUpdate,
  setUpdateId,
  onOfferModalClose,
}: any) => {
  const { handleSubmit, register, errors, reset, setValue, watch } =
    useFormHook({
      validationSchema: offerValidationSchema,
      defaultValues,
    });

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData?.data.find((x: IOffers) => x.offerId === updateId);
      reset({ ...data });
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

        <Text fontSize={"sm"} mb={2} fontWeight={"500"}>
          Description
        </Text>
        <CKEditor
          editor={ClassicEditor}
          data={watch("description")}
          onChange={(_, editor) => {
            const data = editor.getData();
            setValue("description", data);
          }}
        />

        <Text fontSize={"sm"} mt={5} mb={2} fontWeight={"500"}>
          Image
        </Text>
        <ImageUpload setValue={setValue} name={"image"} />

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
