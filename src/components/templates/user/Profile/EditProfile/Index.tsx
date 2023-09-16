import { Box, Flex } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ModalForm from "@src/components/organisms/modal";
import { useFormHook } from "@src/hooks/useFormhook";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import * as yup from "yup";
import { useEffect } from "react";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { useUpdateUserDetail } from "@src/service/user";
import { objectToFormData } from "objecttoformdataconverter";
import { useNationalityList } from "@src/constant/useNationalityList";

const defaultValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  nationalityId: "",
};
const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().required("Email is required"),
  phoneNumber: createPhoneNumberSchema(),
  nationalityId: yup.string().required("Nationality is required"),
});
export const EditProfile = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  dataProfile: any;
  handleFormSubmit: (data: any) => void;
}) => {
  const { handleSubmit, register, errors, reset, setValue } = useFormHook({
    validationSchema,
    defaultValues,
  });
  const { userId } = data;
  const { mutateAsync: update, isLoading: isUpdating } = useUpdateUserDetail();
  const onSubmitHandler = async (data: any) => {
    const convertedData = objectToFormData({
      data: JSON.stringify({
        fullName: data?.fullName,
        phoneNumber: +data?.phoneNumber,
        nationalityId: data?.nationalityId,
      }),
      image: data?.image,
    });

    await update({ id: userId, data: convertedData });
    onClose();
  };
  useEffect(() => {
    reset({
      fullName: data?.fullName,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      nationalityId: data?.nationalityId,
    });
  }, [data]);

  return (
    <ModalForm
      isModalOpen={isOpen}
      onCloseModal={onClose}
      showFooter={true}
      resetButtonText={"Cancel"}
      submitButtonText={"Done"}
      submitHandler={handleSubmit(onSubmitHandler)}
      title="Edit Profile"
      isLoading={isUpdating}
    >
      <ProfileEdit
        register={register}
        errors={errors}
        dataProfile={data}
        setValue={setValue}
        isLoading={isUpdating}
      />
    </ModalForm>
  );
};

export const ProfileEdit = ({ register, errors, setValue, data }: any) => {
  const nationalityList = useNationalityList();
  return (
    <Box mx={{ base: "none", md: "auto" }}>
      <Flex direction="column" gap={4.5}>
        <ImageUpload
          imageSrc={data?.userImageUrl ?? ""}
          setValue={setValue}
          isUser={true}
          name={"image"}
        />

        <FormControl
          control="input"
          name="fullName"
          register={register}
          placeholder={"Full Name "}
          label={"Full Name "}
          error={errors?.fullName?.message || ""}
          required
        />

        <FormControl
          control="input"
          name="email"
          register={register}
          placeholder={"Email"}
          label={"Email"}
          error={errors?.email?.message || ""}
          disabled
        />

        <FormControl
          control="input"
          name="phoneNumber"
          type="number"
          register={register}
          placeholder={"Mobile Number"}
          label={"Mobile Number"}
          error={errors?.phoneNumber?.message || ""}
          required
        />
        <FormControl
          control="reactSelect"
          register={register}
          name="nationalityId"
          placeholder="Choose your nationality"
          label="Nationality"
          onChange={(e: any) => setValue("nationalityId", e.value)}
          required
          error={errors.nationalityId?.message || ""}
          options={nationalityList || []}
          labelKey="countryName"
          valueKey="id"
        />
      </Flex>
    </Box>
  );
};
