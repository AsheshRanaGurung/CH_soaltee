import { Box, Flex } from "@chakra-ui/react";
import DateComponent from "@src/components/atoms/DateInput";
import FormControl from "@src/components/atoms/FormControl";
import ReactSelect from "@src/components/atoms/Select";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import { useMemberTierList } from "@src/constant/useMemberTierList";
import { useNationalityList } from "@src/constant/useNationalityList";
import { usePropertyList } from "@src/constant/usePropertyList";
import { IProperty } from "@src/interface/master-data/property";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
type Props = {
  id?: number;
  membershipName?: string;
  name?: string;
  countryName?: string;
};
const defaultValues = {
  property: "",
  tier: "",
  nationality: "",
  totalAmount: "",
  fromDate: "",
  toDate: "",
};
const UserFilter = ({ para, setPara, isLoading, onDrawerModalClose }: any) => {
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues,
  });
  const propertyList = usePropertyList();
  const tierList = useMemberTierList();
  const nationalityList = useNationalityList();

  const onSubmitHandler = async (data: any) => {
    const extraParams = {
      tier: data.tier?.value,
      property: data.property?.value,
      nationality: data.nationality?.value,
      totalAmount: data.totalAmount,
      fromDate: data.fromDate,
      toDate: data.toDate,
    };
    setPara(extraParams);
    onDrawerModalClose();
  };
  const onClear = () => {
    setPara({});
    reset(defaultValues);
  };
  useEffect(() => {
    const tier: Props =
      (tierList && tierList.find((id: any) => id?.id === para.tier)) || {};
    const nationality: Props =
      (nationalityList &&
        nationalityList.find((id: any) => id?.id === para.nationality)) ||
      {};
    const prop: Props =
      (propertyList &&
        propertyList.find((id: IProperty) => id?.id === para.property)) ||
      {};

    if (Object.keys(para).length !== 0) {
      reset({
        ...para,
        property: Object.keys(prop).length !== 0 && {
          label: prop?.name,
          value: prop?.id,
        },
        tier: Object.keys(tier).length !== 0 && {
          label: tier?.membershipName,
          value: tier?.id,
        },
        nationality: Object.keys(nationality).length !== 0 && {
          label: nationality?.countryName,
          value: nationality?.id,
        },
      });
    }
  }, [para, setPara, propertyList, tierList, nationalityList]);
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <ReactSelect
            control={control}
            name="property"
            placeholder="Choose Property Name"
            label="Property Name"
            labelKey={"name"}
            valueKey={"id"}
            options={propertyList || []}
          />
          <ReactSelect
            control={control}
            register={register}
            name="tier"
            placeholder="Choose membership tier"
            label="Membership Tier"
            options={tierList || []}
            labelKey={"membershipName"}
            valueKey={"id"}
          />
          <ReactSelect
            control={control}
            name="nationality"
            placeholder="Choose your country"
            label="Country"
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
          <Box position="relative" zIndex={2}>
            <DateComponent
              control={control}
              name="fromDate"
              label="Date From"
              endIcons="true"
            />
          </Box>
          <Box>
            <DateComponent
              control={control}
              name="toDate"
              label="Date To"
              endIcons="true"
            />
          </Box>
          <ModalFooterForm
            isLoading={isLoading}
            onCloseModal={onClear}
            direction={"column-reverse"}
            resetButtonText={"Clear"}
            submitButtonText={"Filter"}
          />
        </Flex>
      </Box>
    </form>
  );
};
export default UserFilter;
