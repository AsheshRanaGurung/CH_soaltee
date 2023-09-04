import { Box, Grid, GridItem, Button, Flex } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import { DeleteIcon } from "@chakra-ui/icons";
import * as yup from "yup";

import { useFieldArray } from "react-hook-form";
import { useFormHook } from "@src/hooks/useFormhook";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { createByService } from "@src/service/profile/byservice";
type FormValues = {
  propertyname: string;
  services: {
    service: string | number;
    amount: number | null | string;
  }[];
};
const defaultValues = {
  propertyname: "",
  services: [
    {
      service: "",
      amount: null,
    },
  ],
};
const validationSchema: any = yup.object().shape({
  propertyname: yup.string().required("Property Name is required"),
  services: yup.array().of(
    yup.object().shape({
      service: yup.mixed().required("Service is required"),
      amount: yup.mixed().required("Amount is required"),
    })
  ),
});
export const ServiceForm = ({ data, onCloseModal }: any) => {
  const { register, handleSubmit, control, errors } = useFormHook({
    validationSchema,
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: "services",
    control,
  });
  const { id } = data.userId;
  const { mutate, isLoading } = useMutation(createByService, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      onCloseModal();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data: FormValues) => {
    const serviceArray = data.services.map((item) => {
      return {
        serviceId: Number(item.service),
        totalAmount: Number(item.amount),
      };
    });
    mutate({
      userId: id,
      propertyId: Number(data.propertyname),
      transactionType: "SERVICE",
      lpServiceListDtos: serviceArray,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          control="select"
          register={register}
          name="propertyname"
          label="Property Name"
          placeholder="Select Property Name"
          error={errors?.propertyname?.message || ""}
          options={data?.propertyList || []}
          required
        />
        {fields.map((field, i) => {
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
                  <FormControl
                    control="select"
                    register={register}
                    name={`services.${i}.service`}
                    label="Service"
                    placeholder="Select Service Name"
                    error={(errors?.services as any)?.service?.message || ""}
                    options={data?.serviceList || []}
                    required
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
                    error={(errors?.services as any)?.amount?.message || ""}
                    required
                  />
                </GridItem>
                <GridItem
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <DeleteIcon onClick={() => remove(i)} />
                </GridItem>
              </Grid>
            </Box>
          );
        })}
        <Button
          bg={"#FFF3F3"}
          borderRadius={0}
          color={"#B4304B"}
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
