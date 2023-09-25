import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import * as yup from "yup";

import { AxiosError } from "axios";
import { useFormHook } from "@src/hooks/useFormhook";
import { useMutation } from "react-query";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { createManual } from "@src/service/profile/manual";
import FormControl from "@src/components/atoms/FormControl";
import ReactSelect from "@src/components/atoms/Select";
import { usePropertyList } from "@src/constant/usePropertyList";

const defaultValues = {
  propertyname: "",
  rewardPoints: "",
};
const validationSchema = yup.object().shape({
  propertyname: yup
    .mixed()
    .test("is-property-valid", "Please select Property", function (value) {
      if (typeof value === "object") {
        return true;
      }
      return false;
    }),
  rewardPoints: yup.string().required("Reward Points is required"),
});

const ManualForm = ({ data, onCloseModal, handleFormSubmit }: any) => {
  const { register, handleSubmit, errors, control } = useFormHook({
    validationSchema,
    defaultValues,
  });
  const propertyList = usePropertyList();

  const { id } = data.userId;
  const { mutate, isLoading } = useMutation(createManual, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
      handleFormSubmit(response?.data?.data?.rewardPoints);
      onCloseModal();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  const onSubmit = (data: any) => {
    mutate({
      userId: id,
      propertyId: data.propertyname?.value,
      rewardPoints: data.rewardPoints,
      transactionType: "MANUALLY",
    });
  };
  return (
    <Box>
      <Grid rowGap={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GridItem>
            <ReactSelect
              control={control}
              name="propertyname"
              placeholder="Select property"
              label="Property Name"
              error={errors.propertyname?.message || ""}
              labelKey={"name"}
              valueKey={"id"}
              required
              options={propertyList || []}
            />
          </GridItem>
          <GridItem>
            <FormControl
              control="input"
              register={register}
              name="rewardPoints"
              placeholder="Enter points"
              label="Reward Points"
              required
              error={errors.rewardPoints?.message || ""}
            />
          </GridItem>
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
              Add Points
            </Button>
          </Flex>
        </form>
      </Grid>
    </Box>
  );
};

export default ManualForm;
