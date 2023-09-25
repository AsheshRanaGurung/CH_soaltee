import { Box, Flex, Button } from "@chakra-ui/react";
import DateComponent from "@src/components/atoms/DateInput";
import ReactSelect from "@src/components/atoms/Select";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useForm } from "react-hook-form";

const defaultValues = {
  propertyId: "",
  dateFrom: "",
};
export const UserTransactionFilter = ({
  tabName,
  setPara,
}: {
  setPara: any;
  tabName: any;
}) => {
  const propertyList = usePropertyList();

  const { handleSubmit, control } = useForm({
    defaultValues,
  });
  const onSubmitHandler = async (data: any) => {
    const extraParams = {
      propertyId: data.propertyId?.value || "",
      dates: data.dateFrom || "",
      type: tabName,
    };
    setPara(extraParams);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box mx={{ base: "none", md: "auto" }} mb={3} mt={6}>
          <Flex direction="row" gap={6} width="50%" alignItems="center">
            <ReactSelect
              control={control}
              name="propertyId"
              placeholder="Choose Property Name"
              label="Property Name"
              labelKey={"name"}
              valueKey={"id"}
              options={propertyList || []}
            />

            <DateComponent
              control={control}
              name="dateFrom"
              label="Date"
              endIcons="true"
            />
            <Button type="submit">FIlter</Button>
          </Flex>
        </Box>
      </form>
    </>
  );
};
