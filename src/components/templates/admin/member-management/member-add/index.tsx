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
import ReactSelect from "@src/components/atoms/Select";
import DateComponent from "@src/components/atoms/DateInput";

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
  onModalClose,
  roleId,
  querykey,
}: any) => {
  const propertyList = usePropertyList();
  const { register, errors, reset, handleSubmit, control } = useFormHook({
    validationSchema: memberManagementValidation,
    defaultValues,
  });

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData?.data.find((x: IMember) => x.id === updateId);

      setIsSwitchOpen(data.isBlocked);
      reset({
        ...data,
        nationalityId: { label: data.nationality, value: data.nationalityId },
        propertyId: { label: data.propertyName, value: data.propertyId },
        membershipTierId: {
          label: data.membershipTierName,
          value: data.tierId,
        },
      });
    }
  }, [isUpdate, updateId, tableData?.data]);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createMember, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.refetchQueries(querykey);
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
    onModalClose();
  };

  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const toggleSwitch = () => {
    setIsSwitchOpen((initialValue) => !initialValue);
  };

  const nationalityList = useNationalityList();

  const onSubmitHandler = async (data: any) => {
    if (updateId) {
      mutate({
        id: updateId,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        nationalityId: data.nationalityId?.value,
        propertyId: data?.propertyId?.value,
        isBlocked: data.isBlocked,
        membershipTierId: data.membershipTierId?.value,
        roleId: roleId,
      });
    } else {
      mutate({
        id: "0",
        fullName: data.fullName,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        nationalityId: data.nationalityId?.value,
        propertyId: data.propertyId?.value,
        roleId: roleId,
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
          <DateComponent
            control={control}
            required
            name="dateOfBirth"
            label="Date of birth"
            endIcons="true"
            error={errors.dateOfBirth?.message || ""}
            maxDate={new Date()}
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
          <ReactSelect
            control={control}
            name="propertyId"
            placeholder="Choose Property Name"
            label="Property Name"
            error={errors.propertyId?.message || ""}
            labelKey={"name"}
            valueKey={"id"}
            required
            options={propertyList || []}
          />
          {updateId && roleId === "2" && (
            <ReactSelect
              control={control}
              register={register}
              name="membershipTierId"
              placeholder="Choose Tier"
              label="Tier"
              required
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
          onCloseModal={onModalClose}
          resetButtonText={"Cancel"}
          isLoading={isLoading}
          submitButtonText={
            isUpdate
              ? querykey === "member_management"
                ? "Update Member"
                : querykey === "staff_management"
                ? "Update Staff"
                : ""
              : querykey === "staff_management"
              ? "Add Staff"
              : querykey === "member_management"
              ? "Add Member"
              : ""
          }
        />
        <Spacer />
      </Box>
    </form>
  );
};
