import { useEffect, useState } from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import { useNationalityList } from "@src/constant/useNationalityList";
import { IMember } from "@src/interface/member-management";
import { useMutation, useQueryClient } from "react-query";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { createMember } from "@src/service/member-management";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useFormHook } from "@src/hooks/useFormhook";
import { memberManagementValidation } from "@src/schema/member-management";
import { formatDateToYYYYMMDD } from "@src/utility/formatDateToYYYYMMDD";
import ReactSelect from "@src/components/atoms/Select";

const defaultValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  nationalityId: "",
  dateOfBirth: "",
  isActive: false,
};
export const CreateStaffManagementForm = ({
  isUpdate,
  updateId,
  tableData,
  setIsUpdate,
  setUpdateId,
  onStaffManagementModalClose,
}: any) => {
  const { handleSubmit, register, errors, reset, setValue, control } =
    useFormHook({
      validationSchema: memberManagementValidation,
      defaultValues,
    });

  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const [individualData, setIndividualData] = useState<IMember | null>(null);

  const toggleSwitch = () => {
    setIsSwitchOpen((initialValue) => !initialValue);
  };
  const nationalityList = useNationalityList();
  const propertyList = usePropertyList();
  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData?.data.find((x: IMember) => x.userId === updateId);
      setIndividualData(data);
      reset({
        ...data,
        nationalityId: { label: data.nationality, value: data.nationalityId },
        propertyId: { label: data.propertyName, value: data.propertyId },
      });
      // setValue("dateOfBirth", new Date(data?.dob));
    }
  }, [isUpdate, updateId, tableData]);
  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onStaffManagementModalClose();
  };
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createMember, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.refetchQueries("staff_management");
      onCloseHandler();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });

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
        roleId: "3",
      });
    } else {
      mutate({
        id: "0",
        fullName: data.fullName,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        nationalityId: data.nationalityId?.value,
        propertyId: data?.propertyId?.value,
        roleId: "3",
      });
    }
  };
  const changeDateOfBirth = (date: any) => {
    setValue("dateOfBirth", formatDateToYYYYMMDD(date));
  };
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
            control="date"
            register={register}
            defaultValue={
              individualData &&
              individualData?.dateOfBirth &&
              new Date(individualData.dateOfBirth)
            }
            required
            name="dateOfBirth"
            label="Date of birth"
            endIcons="true"
            changeDate={changeDateOfBirth}
            color="black"
            padding="10px"
            height="40px"
            lineHeight="2"
            error={errors.dateOfBirth?.message || ""}
          />
          <ReactSelect
            control={control}
            name="nationalityId"
            placeholder="Choose your nationality"
            label="Nationality"
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
          onCloseModal={onStaffManagementModalClose}
          resetButtonText={"Cancel"}
          isLoading={isLoading}
          submitButtonText={isUpdate ? "Update Staff" : "Add Staff"}
        />
        <Spacer />
      </Box>
    </form>
  );
};
