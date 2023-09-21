import { Box, Flex } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ReactSelect from "@src/components/atoms/Select";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import { useMemberTierList } from "@src/constant/useMemberTierList";
import { useNationalityList } from "@src/constant/useNationalityList";
import { usePropertyList } from "@src/constant/usePropertyList";
import { formatDateToYYYYMMDD } from "@src/utility/formatDateToYYYYMMDD";
import { useForm } from "react-hook-form";

const defaultValues = {
  propertyId: "",
  membershipTierId: "",
  nationalityId: "",
  totalAmount: "",
  dateFrom: "",
  dateTo: "",
};
const UserFilter = ({ setPara, isLoading, onDrawerModalClose }: any) => {
  const { handleSubmit, register, control, reset, setValue } = useForm({
    defaultValues,
  });
  const propertyList = usePropertyList();
  const tierList = useMemberTierList();
  const nationalityList = useNationalityList();
  const changeValidFromDate = (date: any) => {
    setValue("dateFrom", formatDateToYYYYMMDD(date));
  };
  const changeValidToDate = (date: any) => {
    setValue("dateTo", formatDateToYYYYMMDD(date));
  };
  const onSubmitHandler = async (data: any) => {
    const extraParams = {
      tier: data.membershipTierId?.value,
      property: data.propertyId?.value,
      nationality: data.nationalityId?.value,
      totalAmount: data.totalAmount,
      fromDate: data.dateFrom,
      toDate: data.dateTo,
    };
    setPara(extraParams);
  };
  const onClear = () => {
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <ReactSelect
            control={control}
            name="propertyId"
            placeholder="Choose Property Name"
            label="Property Name"
            labelKey={"name"}
            valueKey={"id"}
            options={propertyList || []}
          />
          <ReactSelect
            control={control}
            register={register}
            name="membershipTierId"
            placeholder="Choose membership tier"
            label="Membership Tier"
            options={tierList || []}
            labelKey={"membershipName"}
            valueKey={"id"}
          />
          <ReactSelect
            control={control}
            name="nationalityId"
            placeholder="Choose your nationality"
            label="Nationality"
            options={nationalityList || []}
            labelKey={"countryName"}
            valueKey={"id"}
          />
          <FormControl
            control="input"
            name="totalAmount"
            register={register}
            placeholder={"Bill amount"}
            label={"Bill amount (greater than)"}
          />
          <FormControl
            control="date"
            register={register}
            name="dateFrom"
            label="Date From"
            endIcons="true"
            changeDate={changeValidFromDate}
          />
          <FormControl
            control="date"
            register={register}
            name="dateTo"
            label="Date To"
            endIcons="true"
            changeDate={changeValidToDate}
          />
          <ModalFooterForm
            isLoading={isLoading}
            onCloseModal={onClear}
            direction={"column-reverse"}
            resetButtonText={"Clear"}
            submitButtonText={"Filter"}
            onClick={onDrawerModalClose}
          />
        </Flex>
      </Box>
    </form>
  );
};
export default UserFilter;
