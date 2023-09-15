import "react-datepicker/dist/react-datepicker.css";
import FormControl from "@src/components/atoms/FormControl";
import { Button, Flex } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { createBonus, updateBonus } from "@src/service/point-config/bonus";
import { useServiceList } from "@src/constant/useServiceList";
import DateComponent from "@src/components/atoms/DateInput";
import { useState } from "react";
import { formatDateToYYYYMMDD } from "@src/utility/formatDateToYYYYMMDD";
export const AddBonus = ({
  register,
  errors,
  setValue,
  handleSubmit,
  onCloseModal,
  updateId,
  watch,
}: any) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createBonus, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.refetchQueries("bonus");
      queryClient.invalidateQueries("bonus");
      onCloseModal();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  const { mutate: update, isLoading: isUpdating } = useMutation(updateBonus, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Bonus Updated!!");
      queryClient.invalidateQueries("bonus");
      onCloseModal();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  const [validFrom, setValidFrom] = useState();
  const serviceList = useServiceList();
  const changeValidFromDate = (date: any) => {
    setValidFrom(date);
    setValue("validFrom", formatDateToYYYYMMDD(date));
  };
  const changeValidToDate = (date: any) => {
    setValue("validTo", formatDateToYYYYMMDD(date));
  };
  const onSubmit = (data: any) => {
    if (updateId) {
      update({
        id: updateId,
        data: {
          ...data,
          id: updateId,
        },
      });
    } else {
      mutate(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        control="input"
        name="bonusName"
        register={register}
        placeholder={"Offer Name"}
        label={"Offer Name"}
        error={errors?.bonusName?.message || ""}
        required
      />
      <FormControl
        control="reactSelect"
        register={register}
        name="serviceId"
        placeholder="Choose Service"
        onChange={(e: any) => setValue("serviceId", e.value)}
        label="Bonus for"
        labelKey={"serviceName"}
        valueKey={"id"}
        required
        options={serviceList || []}
      />
      <DateComponent
        name="validFrom"
        label="Valid From"
        endIcons="true"
        error={errors.validFrom?.message || ""}
        changeDate={changeValidFromDate}
        defaultValue={updateId && new Date(watch("validFrom"))}
      />
      <DateComponent
        name="validTo"
        label="Valid To"
        endIcons="true"
        error={errors.validFrom?.message || ""}
        changeDate={changeValidToDate}
        minDate={validFrom}
        defaultValue={updateId && new Date(watch("validTo"))}
      />
      <FormControl
        control="input"
        name="bonusValue"
        register={register}
        placeholder={"Bonus Value"}
        label={"Bonus Value"}
        error={errors?.bonusValue?.message || ""}
        required
      />

      <Flex gap={3} mt={3}>
        <Button
          py={6}
          variant="outlined"
          borderRadius={0}
          w="100%"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          py={6}
          variant="primary"
          borderRadius={0}
          w="100%"
          isLoading={isLoading || isUpdating}
        >
          {updateId ? "Update Bonus" : "Add Bonus"}
        </Button>
      </Flex>
    </form>
  );
};
