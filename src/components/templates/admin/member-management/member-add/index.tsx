import { useEffect, useState } from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import { useNationalityList } from "@src/constant/useNationalityList";
import { useFormHook } from "@src/hooks/useFormhook";
import { memberManagementValidation } from "@src/schema/member-management";
import { usePropertyList } from "@src/constant/usePropertyList";
import { IMember } from "@src/interface/member-management";
import { useMutation, useQueryClient } from "react-query";
import { createMember } from "@src/service/member-management";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import { useMemberTierList } from "@src/constant/useMemberTierList";

const defaultValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  nationalityId: "",
  dateOfBirth: "",
  membershipTierId: "",
  propertyId: "",
  isActive: false,
};

export const CreateMemberManagementForm = ({
  isUpdate,
  updateId,
  tableData,
  setIsUpdate,
  setUpdateId,
  onMemberModalClose,
}: any) => {
  const propertyList = usePropertyList();

  const { register, errors, setValue, reset, handleSubmit } = useFormHook({
    validationSchema: memberManagementValidation,
    defaultValues,
  });
  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData?.data.find((x: IMember) => x.id === updateId);
      reset({
        ...data,
      });
    }
  }, [isUpdate, updateId, tableData?.data]);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createMember, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.refetchQueries("member_management");
      onCloseHandler();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onMemberModalClose();
  };

  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const toggleSwitch = () => {
    setIsSwitchOpen((initialValue) => !initialValue);
  };
  const nationalityList = useNationalityList();

  const onSubmitHandler = async (data: IMember) => {
    if (updateId) {
      mutate({
        id: updateId,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        nationalityId: data.nationalityId,
        propertyId: data?.propertyId,
        isBlocked: data.isBlocked,
        membershipTierId: data.membershipTierId,
        roleId: "2",
      });
    } else {
      mutate({
        id: "0",
        fullName: data.fullName,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        nationalityId: data.nationalityId,
        propertyId: data.propertyId,
        roleId: "2",
      });
    }
  };

  const tierList = useMemberTierList();
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <FormControl
            control="input"
            name="fullName"
            register={register}
            placeholder={"Full Name"}
            label={"Full Name"}
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
            isDisabled={updateId ? true : false}
            required
          />
          <FormControl
            control="input"
            type="number"
            name="phoneNumber"
            register={register}
            placeholder={"Mobile Number"}
            label={"Mobile Number"}
            error={errors?.phoneNumber?.message || ""}
            required
          />
          <FormControl
            control="input"
            name="dateOfBirth"
            defaultValue={"2023-09-07"}
            type="date"
            required
            label="Date of birth"
            color="black"
            padding="10px"
            height="40px"
            lineHeight="2"
            register={register}
            error={errors.dateOfBirth?.message || ""}
          />
          <FormControl
            control="reactSelect"
            register={register}
            name="nationalityId"
            placeholder="Choose your nationality"
            label="Nationality"
            required
            onChange={(e: any) => setValue("nationalityId", e.value)}
            error={errors.nationalityId?.message || ""}
            options={nationalityList || []}
            labelKey={"countryName"}
            valueKey={"id"}
          />
          <FormControl
            control="reactSelect"
            register={register}
            name="propertyId"
            placeholder="Choose Property Name"
            onChange={(e: any) => setValue("propertyId", e.value)}
            label="Property Name"
            labelKey={"name"}
            valueKey={"id"}
            required
            options={propertyList || []}
          />
          {updateId && (
            <FormControl
              control="reactSelect"
              register={register}
              name="membershipTierId"
              placeholder="Choose Tier"
              label="Tier"
              required
              onChange={(e: any) => setValue("membershipTierId", e.value)}
              error={errors.membershipTierId?.message || ""}
              options={tierList || []}
              labelKey={"membershipName"}
              valueKey={"id"}
            />
          )}
          {updateId && (
            <FormControl
              control="switch"
              name="isBlocked"
              variant="red"
              value={isSwitchOpen}
              toggleSwitch={toggleSwitch}
              register={register}
              label={"Is Blocked ?"}
            />
          )}
        </Flex>
        <ModalFooterForm
          onCloseModal={onMemberModalClose}
          resetButtonText={"Cancel"}
          isLoading={isLoading}
          submitButtonText={isUpdate ? "Update Member" : "Add Member"}
        />
        <Spacer />
      </Box>
    </form>
  );
};
