import "react-datepicker/dist/react-datepicker.css";
import FormControl from "@src/components/atoms/FormControl";
import { Box, Spacer } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { createBonus, updateBonus } from "@src/service/point-config/bonus";
import { useServiceList } from "@src/constant/useServiceList";
import { useEffect, useState } from "react";
import { formatDateToYYYYMMDD } from "@src/utility/formatDateToYYYYMMDD";
import { bonusValidationSchema } from "@src/schema/pointConfigiration/bonus";
import { IBonus } from "@src/interface/pointConfig";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import { useFormHook } from "@src/hooks/useFormhook";
import ReactSelect from "@src/components/atoms/Select";

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
  const { register, errors, setValue, reset, handleSubmit, watch, control } =
    useFormHook({
      validationSchema: bonusValidationSchema,
      defaultValues,
    });
  // const [individualData, setIndividualData] = useState<IMember | null>(null);

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData?.data.find((x: IBonus) => x.id === updateId);
      // setIndividualData(data);
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

      <Box position="relative" zIndex={1}>
        <FormControl
          control="date"
          register={register}
          name="validFrom"
          label="Valid From"
          endIcons="true"
          error={errors.validFrom?.message || ""}
          changeDate={changeValidFromDate}
          defaultValue={updateId && new Date(watch("validFrom"))}
          required
        />
      </Box>
      <Box>
        <FormControl
          control="date"
          register={register}
          name="validTo"
          label="Valid To"
          endIcons="true"
          error={errors.validTo?.message || ""}
          changeDate={changeValidToDate}
          minDate={validFrom}
          defaultValue={updateId && new Date(watch("validTo"))}
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
