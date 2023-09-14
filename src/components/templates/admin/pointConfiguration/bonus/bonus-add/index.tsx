import "react-datepicker/dist/react-datepicker.css";
import FormControl from "@src/components/atoms/FormControl";
import { Button, Flex } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { createBonus } from "@src/service/point-config/bonus";
import { useServiceList } from "@src/constant/useServiceList";
export const AddBonus = ({
  register,
  errors,
  setValue,
  handleSubmit,
  onCloseModal,
}: any) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createBonus, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.refetchQueries("bonus");
      onCloseModal();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  const serviceList = useServiceList();
  const onSubmit = (data: any) => {
    mutate(data);
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
        placeholder="Choose Property Name"
        onChange={(e: any) => setValue("serviceId", e.value)}
        label="Service"
        labelKey={"serviceName"}
        valueKey={"id"}
        required
        options={serviceList || []}
      />

      <FormControl
        control="input"
        name="validFrom"
        defaultValue={"2023-09-07"}
        type="date"
        required
        label="Valid From"
        background="white"
        color="black"
        padding="10px"
        height="40px"
        lineHeight="2"
        register={register}
        error={errors.validFrom?.message || ""}
      />
      <FormControl
        control="input"
        name="validTo"
        defaultValue={"2023-09-07"}
        type="date"
        required
        label="Valid To"
        background="white"
        color="black"
        padding="10px"
        height="40px"
        lineHeight="2"
        register={register}
        error={errors.validTo?.message || ""}
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
          isLoading={isLoading}
        >
          Add Bonus
        </Button>
      </Flex>
    </form>
  );
};
