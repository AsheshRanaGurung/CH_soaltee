import "react-datepicker/dist/react-datepicker.css";
import FormControl from "@src/components/atoms/FormControl";
import { Box, Spacer } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { createBonus, updateBonus } from "@src/service/point-config/bonus";
import { useServiceList } from "@src/constant/useServiceList";
import { useEffect } from "react";
import { IBonus } from "@src/interface/pointConfig";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import { useFormHook } from "@src/hooks/useFormhook";
import ReactSelect from "@src/components/atoms/Select";
import DateComponent from "@src/components/atoms/DateInput";
import { bonusValidationSchema } from "@src/schema/point-configuration/bonus";

const defaultValues = {
  bonusName: "",
  bonusValue: "",
  validFrom: "",
  validTo: "",
  serviceId: "",
};
export const AddBonus = ({
  isUpdate,
  updateId,
  tableData,
  setIsUpdate,
  setUpdateId,
  onBonusModalClose,
}: any) => {
  const { register, errors, reset, handleSubmit, control } = useFormHook({
    validationSchema: bonusValidationSchema,
    defaultValues,
  });

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData?.data.find((x: IBonus) => x.id === updateId);
      reset({
        ...data,
        serviceId: { label: data.serviceName, value: data.serviceId },
      });
    }
  }, [isUpdate, updateId, tableData?.data]);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createBonus, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.refetchQueries("bonus");
      queryClient.invalidateQueries("bonus");
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
    onBonusModalClose();
  };
  const { mutate: update, isLoading: isUpdating } = useMutation(updateBonus, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Bonus Updated!!");
      queryClient.invalidateQueries("bonus");
      onCloseHandler();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  const serviceList = useServiceList();

  const onSubmit = (data: any) => {
    const { serviceId, ...rest } = data;
    if (updateId) {
      update({
        id: updateId,
        data: {
          ...rest,
          serviceId: serviceId?.value,
          id: updateId,
        },
      });
    } else {
      mutate({
        ...rest,
        serviceId: serviceId?.value,
      });
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
      <ReactSelect
        control={control}
        name="serviceId"
        placeholder="Choose Service"
        label="Bonus for"
        labelKey={"serviceName"}
        valueKey={"id"}
        required
        error={errors?.serviceId?.message || ""}
        options={serviceList || []}
      />
      <Box position="relative" zIndex={2}>
        <DateComponent
          control={control}
          name="validFrom"
          label="Valid From"
          endIcons="true"
          error={errors.validFrom?.message || ""}
          required
        />
      </Box>

      <Box>
        <DateComponent
          control={control}
          name="validTo"
          label="Valid To"
          endIcons="true"
          error={errors.validTo?.message || ""}
          required
        />
      </Box>
      <FormControl
        control="input"
        name="bonusValue"
        register={register}
        placeholder={"Bonus Value"}
        label={"Bonus Value"}
        error={errors?.bonusValue?.message || ""}
        required
      />

      <ModalFooterForm
        onCloseModal={onBonusModalClose}
        resetButtonText={"Cancel"}
        isLoading={isLoading || isUpdating}
        submitButtonText={isUpdate ? "Update Bonus" : "Add Bonus"}
      />
      <Spacer />
    </form>
  );
};
