import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { useFormHook } from "@src/hooks/useFormhook";
import { IVoucher } from "@src/interface/voucher";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";
import { useServiceList } from "@src/constant/useServiceList";
import { voucherValidationSchema } from "@src/schema/voucher";
import ReactSelect from "@src/components/atoms/Select";
import DateComponent from "@src/components/atoms/DateInput";
import Checkbox from "@src/components/atoms/Checkbox";
import CKEditorWrapper from "@src/components/atoms/Editor";

interface IVoucherProps {
  mutate?: any;
  isLoading?: boolean;
  update?: any;
  isUpdating?: boolean;
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px 65px;
  margin-bottom: 32px;
`;
type IndividualDataType = {
  voucherDescription?: string;
  imageUrl?: string;
};

const defaultValues = {
  voucherName: "",
  serviceId: "",
  discountPercentage: "",
  maximumAmounts: "",
  maximumLimits: "",
  voucherDescription: "",
};
const CheckboxStyled = styled.div<any>`
  display: flex;
  // gap: 32px;
  .css-1op0oxr {
    max-width: 50%;
  }
`;
const CheckboxWrapper = styled.div<any>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 50%;
`;
// const WrapperEditorStyled = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;
export const CreateVoucherForm: React.FC<IVoucherProps> = ({
  mutate,
  isLoading,
  update,
  isUpdating,
}) => {
  const location = useLocation();
  const { state } = location;

  const { handleSubmit, register, errors, reset, setValue, control } =
    useFormHook({
      validationSchema: voucherValidationSchema,
      defaultValues,
    });
  const [individualData, setIndividualData] = useState<IndividualDataType>({});
  const handleEditorDataChange = (newData: string) => {
    setValue("voucherDescription", newData);
  };
  const serviceList = useServiceList();
  useEffect(() => {
    if (state?.id) {
      setIndividualData(state);
      reset({
        ...state,
        serviceId: { label: state.serviceName, value: state.serviceId },
      });
    }
  }, [state]);
  const onSubmitHandler = (data: IVoucher) => {
    const formData = new FormData();
    const dat = {
      voucherName: data?.voucherName,
      serviceId: data?.serviceId?.value,
      discountPercentage: data?.discountPercentage,
      maximumAmounts: data?.maximumAmounts,
      maximumLimits: data?.maximumLimits,
      voucherDescription: data?.voucherDescription,
    };
    formData.append("data", JSON.stringify(dat));
    if (state?.id) {
      if (data.image) {
        formData.append("image", data.image as Blob);
        update({ id: state.id, data: formData });
      } else {
        formData.append("image", "");
        update({ id: state.id, data: formData });
      }
    } else {
      formData.append("image", data.image as Blob);
      mutate(formData);
    }
    reset();
  };
  const handleCheckBox = () => {
    // console.log("here");
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box
        mx={{ base: "none", md: "auto" }}
        backgroundColor={colors.white}
        px={8}
        py={6}
      >
        <Text fontSize="2xl" color={colors.primary} mb={8}>
          {state === null
            ? "Add Voucher and Promocode"
            : "Update Voucher and Promocode"}
        </Text>

        <Wrapper>
          <FormControl
            control="input"
            name="voucherName"
            register={register}
            placeholder={"Voucher Name"}
            label={"Voucher Name"}
            error={errors?.voucherName?.message || ""}
            required
          />
          <ReactSelect
            control={control}
            name="serviceId"
            placeholder="Choose Service"
            label="Service Name"
            error={errors.serviceId?.message || ""}
            labelKey={"serviceName"}
            valueKey={"id"}
            required
            isMulti={true}
            options={serviceList || []}
          />
          <FormControl
            control="input"
            name="discountPercentage"
            register={register}
            placeholder={"Discount Percentage"}
            label={"Discount Percentage"}
            error={errors?.discountPercentage?.message || ""}
            required
          />
          <DateComponent
            control={control}
            name="validFrom"
            label="Valid From"
            endIcons="true"
            error={errors.validFrom?.message || ""}
            required
          />

          <DateComponent
            control={control}
            name="validTo"
            label="Valid To"
            endIcons="true"
            error={errors.validTo?.message || ""}
            required
          />

          <FormControl
            control="input"
            name="maximumAmounts"
            register={register}
            placeholder={"Maximum Discount Amount"}
            label={"Maximum Amount"}
            error={errors?.maximumAmounts?.message || ""}
            required
          />
          <CheckboxStyled>
            <CheckboxWrapper>
              <Checkbox
                name="terms"
                onChange={handleCheckBox}
                control={control}
                colorScheme="red"
              >
                {" "}
                Free
              </Checkbox>
              <Checkbox
                name="terms"
                onChange={handleCheckBox}
                control={control}
                colorScheme="red"
              >
                {" "}
                Featured
              </Checkbox>
            </CheckboxWrapper>
            <FormControl
              control="input"
              name="maximumLimits"
              register={register}
              placeholder={"Required Points"}
              label={"Required Points"}
              error={errors?.maximumLimits?.message || ""}
              required
            />
          </CheckboxStyled>
          <CheckboxStyled>
            <Checkbox
              name="terms"
              onChange={handleCheckBox}
              control={control}
              colorScheme="red"
            >
              {" "}
              Limited Voucher
            </Checkbox>
            <FormControl
              control="input"
              name="voucherLimit"
              register={register}
              placeholder={"Voucher Limit"}
              label={"Voucher Limit"}
              error={errors?.maximumLimits?.message || ""}
              required
            />
          </CheckboxStyled>
        </Wrapper>

        <CKEditorWrapper
          label="Voucher Description"
          data={individualData?.voucherDescription || ""}
          onDataChange={handleEditorDataChange}
        />
        <Text fontSize={"sm"} my={2} fontWeight={500}>
          Voucher Image
          <span style={{ color: colors.red }}>&nbsp;*</span>
        </Text>
        <ImageUpload
          setValue={setValue}
          error={errors?.image?.message}
          imageUploadStyle="row"
          imageSrc={update ? individualData?.imageUrl : undefined}
        />
        <Flex gap={4} mt={3}>
          <Button
            type="submit"
            className="button"
            isLoading={isLoading}
            mt={8}
            width={"138px"}
            borderRadius={"none"}
            disabled={isLoading || isUpdating}
            px={6}
            py={5}
          >
            {!state?.id ? "Add" : "Update"}
          </Button>
          <Button
            variant="outlined"
            borderRadius={0}
            mt={8}
            px={6}
            py={5}
            width={"138px"}
            onClick={() => reset()}
          >
            {!state?.id ? "Clear" : "Reset"}
          </Button>
        </Flex>
        <Spacer />
      </Box>
    </form>
  );
};
