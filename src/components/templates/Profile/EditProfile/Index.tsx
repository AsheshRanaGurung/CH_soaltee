import { Box, Flex } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ModalForm from "@src/components/organisms/modal";
import { nationality } from "@src/constant/index";
import { useFormHook } from "@src/hooks/useFormhook";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import * as yup from "yup";

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
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { handleSubmit, register, errors, reset } = useFormHook({
    validationSchema,
    defaultValues,
  });
  const onSubmitHandler = () => {
    reset(defaultValues);
  };
  return (
    <ModalForm
      isModalOpen={isOpen}
      onCloseModal={onClose}
      showFooter={true}
      resetButtonText={"Cancel"}
      submitButtonText={"Done"}
      submitHandler={handleSubmit(onSubmitHandler)}
      title="Edit Profile"
    >
      <ProfileEdit register={register} errors={errors} />
    </ModalForm>
  );
};

export const ProfileEdit = ({ register, errors }: any) => {
  return (
    <Box mx={{ base: "none", md: "auto" }}>
      <Flex direction="column" gap={4.5}>
        {/* <ImageUpload
          setValue={setValue}
          imgSrc={imageList.profileAvatar}
          required={!id}
        /> */}

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
          required
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
