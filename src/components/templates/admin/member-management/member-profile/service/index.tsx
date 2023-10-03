import { Box, Grid, GridItem, Button, Flex } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import { DeleteIcon } from "@chakra-ui/icons";
import * as yup from "yup";

import { useFieldArray } from "react-hook-form";
import { useFormHook } from "@src/hooks/useFormhook";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { createByService } from "@src/service/profile/byservice";
import { colors } from "@src/theme/colors";
import ReactSelect from "@src/components/atoms/Select";
interface Service {
  service: string;
  amount: number | null;
}

interface FormValues {
  propertyname: string;
  services: Service[];
}
const defaultValues: FormValues = {
  propertyname: "",
  services: [
    {
      service: "",
      amount: null,
    },
  ],
};
const validationSchema: any = yup.object().shape({
  propertyname: yup
    .mixed()
    .test("is-property-valid", "Please select Property", function (value) {
      if (value !== null && typeof value === "object") {
        return true;
      }
      return false;
    }),
  services: yup.array().of(
    yup.object().shape({
      service: yup
        .mixed()
        .test("is-service-valid", "Service is required", function (value) {
          if (value !== null && typeof value === "object") {
            return true;
          }
          return false;
        }),
      amount: yup.mixed().required("Amount is required"),
    })
  ),
});
export const ServiceForm = ({ data, onCloseModal, handleFormSubmit }: any) => {
  const { register, handleSubmit, control, errors, watch } = useFormHook({
    validationSchema,
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: "services",
    control,
  });
  const selectedValue = watch("services");

  const selectedServiceIds = selectedValue.map((item: any) =>
    Number(item?.service?.value)
  );
  const { id } = data.userId;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createByService, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      queryClient.invalidateQueries("member_history");

      handleFormSubmit(response?.data?.data?.rewardPoints);

      onCloseModal();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data: any) => {
    const serviceArray = data.services.map((item: any) => {
      return {
        serviceId: Number(item?.service?.value),
        totalAmount: Number(item.amount),
      };
    });
    mutate({
      userId: id,
      propertyId: Number(data?.propertyname?.value),
      transactionType: "SERVICE",
      lpServiceListDtos: serviceArray,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ReactSelect
          control={control}
          name="propertyname"
          placeholder="Select property"
          label="Property Name"
          error={errors.propertyname?.message || ""}
          labelKey={"name"}
          valueKey={"id"}
          required
          options={data.propertyList || []}
        />
        {fields.map((field, i) => {
          const errorMessage = errors?.services?.[
            i as unknown as keyof typeof errors.services
          ] as {
            [key: string]: any;
          };
          return (
            <Box key={field.id}>
              <Grid
                marginY={3}
                gap={4}
                mt={4}
                templateColumns={"repeat(1, 5.75fr 5.75fr 0.5fr)"}
                key={field.id}
              >
                <GridItem>
                  <ReactSelect
                    control={control}
                    name={`services.${i}.service`}
                    placeholder="Select service"
                    label="Service"
                    error={errorMessage?.service?.message ?? ""}
                    labelKey={"serviceName"}
                    valueKey={"id"}
                    required
                    options={data?.serviceList || []}
                    isSelected={selectedServiceIds}
                  />
                </GridItem>
                <GridItem>
                  <FormControl
                    control="input"
                    type="text"
                    register={register}
                    name={`services.${i}.amount`}
                    placeholder="Amount"
                    label="Amount"
                    error={errorMessage?.amount?.message || ""}
                    required
                  />
                </GridItem>
                <GridItem
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <DeleteIcon
                    color={colors.primary}
                    onClick={() => remove(i)}
                  />
                </GridItem>
              </Grid>
            </Box>
          );
        })}
        <Button
          bg={colors.secondary}
          borderRadius={0}
          isDisabled={selectedServiceIds.length === data?.serviceList?.length}
          color={colors.red_primary}
          onClick={() =>
            append({
              service: "",
              amount: null,
            })
          }
        >
          + &nbsp;Add Service
        </Button>
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
            isLoading={isLoading}
            py={6}
            variant="primary"
            borderRadius={0}
            w="100%"
          >
            Add Points
          </Button>
        </Flex>
      </form>
    </>
  );
};
