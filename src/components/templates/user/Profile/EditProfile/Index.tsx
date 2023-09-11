import { Box, Flex } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ModalForm from "@src/components/organisms/modal";
import { nationality } from "@src/constant/index";
import { useFormHook } from "@src/hooks/useFormhook";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import * as yup from "yup";
import { useEffect } from "react";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { useUpdateUserDetail } from "@src/service/user";
import { imageList } from "@src/assets/images";

const defaultValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  nationality: "",
};
const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().required("Email is required"),
  phoneNumber: createPhoneNumberSchema(),
  nationality: yup.string().required("Nationality is required"),
});
export const EditProfile = ({
  isOpen,
  onClose,
  data,
  handleFormSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  handleFormSubmit: (data: any) => void;
}) => {
  const { handleSubmit, register, errors, reset, setValue } = useFormHook({
    validationSchema,
    defaultValues,
  });
  const { userId } = data;
  const { mutateAsync: update, isLoading: isUpdating } = useUpdateUserDetail();
  const onSubmitHandler = async (data: any) => {
    const formData = new FormData();
    const datas = {
      fullName: data?.fullName,
      phoneNumber: data?.phoneNumber,
      nationality: data?.nationality,
    };

    data?.image && formData.append("image", data?.image as Blob);
    formData.append("data", JSON.stringify(datas));
    const result = await update({ id: userId, data: formData });
    handleFormSubmit(result?.data?.data);
    localStorage.setItem(
      "imageName",
      data?.image ? result?.data?.data?.imageUrl : imageList.DummyUser
    );
    onClose();
  };
  useEffect(() => {
    reset({
      fullName: data?.fullName,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      nationality: data?.nationality,
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
        setValue={setValue}
        isLoading={isUpdating}
      />
    </ModalForm>
  );
};

export const ProfileEdit = ({ register, errors, setValue }: any) => {
  const imageUrl = localStorage.getItem("imageName");
  return (
    <Box mx={{ base: "none", md: "auto" }}>
      <Flex direction="column" gap={4.5}>
        <ImageUpload
          imageSrc={imageUrl ?? ""}
          setValue={setValue}
          isUser={true}
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
          control="select"
          register={register}
          name="nationality"
          placeholder="Choose your nationality"
          label="Nationality"
          required
          error={errors.nationality?.message || ""}
          options={nationality}
        />
      </Flex>
    </Box>
  );
};
