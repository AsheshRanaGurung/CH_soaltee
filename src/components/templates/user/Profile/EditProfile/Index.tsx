import { Box, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import { useFormHook } from "@src/hooks/useFormhook";
import { useEffect } from "react";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { useUpdateUserDetail } from "@src/service/user";
import { objectToFormData } from "objecttoformdataconverter";
import { useNationalityList } from "@src/constant/useNationalityList";
import ModalForm from "@src/components/molecules/modal";
import { userProfileValidationSchema } from "@src/schema/user/profile";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import ReactSelect from "@src/components/atoms/Select";

const defaultValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  nationalityId: "",
};

export const EditProfile = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  dataProfile: any;
}) => {
  return (
    <ModalForm isModalOpen={isOpen} onCloseModal={onClose} title="Edit Profile">
      <ProfileEdit dataProfile={data} onClose={onClose} />
    </ModalForm>
  );
};

export const ProfileEdit = ({ dataProfile, onClose }: any) => {
  const { register, errors, setValue, reset, handleSubmit, control } =
    useFormHook({
      validationSchema: userProfileValidationSchema,
      defaultValues,
    });
  const { mutateAsync: update, isLoading: isUpdating } = useUpdateUserDetail();
  const { userId } = dataProfile !== null ? dataProfile : "";

  const onSubmitHandler = async (data: any) => {
    const convertedData = objectToFormData({
      data: JSON.stringify({
        fullName: data?.fullName,
        phoneNumber: +data?.phoneNumber,
        nationalityId: data?.nationalityId?.value,
      }),
      image: data?.image,
    });

    await update({ id: userId, data: convertedData });
    onClose();
  };
  useEffect(() => {
    reset({
      fullName: dataProfile?.fullName,
      email: dataProfile?.email,
      phoneNumber: dataProfile?.phoneNumber,
      nationalityId: {
        label: dataProfile?.nationality,
        value: dataProfile?.nationalityId,
      },
    });
  }, [dataProfile]);
  const nationalityList = useNationalityList();
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <ImageUpload
            imageSrc={dataProfile?.userImageUrl ?? ""}
            setValue={setValue}
            isUser={true}
            show={true}
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
          <ReactSelect
            control={control}
            name="nationalityId"
            placeholder="Choose your country"
            label="Country"
            required
            error={errors.nationalityId?.message || ""}
            options={nationalityList || []}
            labelKey={"countryName"}
            valueKey={"id"}
          />
        </Flex>
        <ModalFooterForm
          onCloseModal={onClose}
          resetButtonText={"Cancel"}
          isLoading={isUpdating}
          submitButtonText="Update Profile"
        />
        <Spacer />
      </Box>
    </form>
  );
};
