import { Box, Flex } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import { useMemberTierList } from "@src/constant/useMemberTierList";
import { useNationalityList } from "@src/constant/useNationalityList";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useForm } from "react-hook-form";

const UserFilter = ({ setPara, isLoading, onDrawerModalClose }: any) => {
  const { handleSubmit, register, setValue } = useForm();

  const propertyList = usePropertyList();
  const membershipTierList = useMemberTierList();
  const nationalityList = useNationalityList();

  const onSubmitHandler = async (data: any) => {
    const extraParams = {
      tier: data.membershipTierId,
      property: data.propertyId,
      nationality: data.nationalityId,
      totalAmount: data.totalAmount,
    };
    setPara(extraParams);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <FormControl
            control="reactSelect"
            register={register}
            name="propertyId"
            placeholder="Choose property"
            onChange={(e: any) => setValue("propertyId", e.value)}
            label="Property"
            labelKey={"name"}
            valueKey={"id"}
            options={propertyList || []}
          />
          <FormControl
            control="reactSelect"
            register={register}
            name="membershipTierId"
            placeholder="Choose membership tier"
            onChange={(e: any) => setValue("membershipTierId", e.value)}
            label="Membership Tier"
            labelKey={"membershipName"}
            valueKey={"id"}
            options={membershipTierList || []}
          />
          <FormControl
            control="reactSelect"
            register={register}
            name="nationalityId"
            placeholder="Choose nationality"
            onChange={(e: any) => setValue("nationalityId", e.value)}
            label="Nationality"
            labelKey={"countryName"}
            valueKey={"id"}
            options={nationalityList || []}
          />
          <FormControl
            control="input"
            name="totalAmount"
            register={register}
            placeholder={"Bill amount"}
            label={"Bill amount (greater than)"}
          />
          <ModalFooterForm
            // onCloseModal={onDrawerClose}
            // resetButtonText={"Cancel"}
            isLoading={isLoading}
            submitButtonText={"Filter"}
            onClick={onDrawerModalClose}
          />
        </Flex>
      </Box>
    </form>
  );
};
export default UserFilter;
