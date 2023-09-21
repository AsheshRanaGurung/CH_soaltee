import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { useFormHook } from "@src/hooks/useFormhook";
import { IVoucher } from "@src/interface/voucher";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";
import { useServiceList } from "@src/constant/useServiceList";
import { voucherValidationSchema } from "@src/schema/voucher";
import ReactSelect from "@src/components/atoms/Select";

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
`;
const FormWrap = styled.div`
  margin-top: 15px;
  label {
    .chakra-form-control {
      margin-bottom: 5px;
    }
  }
  .ck.ck-editor__main > .ck-editor__editable {
    min-height: 300px;
    padding-left: 22px;
  }
  span {
    color: ${colors.red};
  }
`;
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
    });

  const serviceList = useServiceList();
  useEffect(() => {
    if (state?.id) {
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
          <FormControl
            control="input"
            name="maximumAmounts"
            register={register}
            placeholder={"Maximum Amount"}
            label={"Maximum Amount"}
            error={errors?.maximumAmounts?.message || ""}
            required
          />
          <FormControl
            control="input"
            name="maximumLimits"
            register={register}
            placeholder={"Maximum Limit"}
            label={"Maximum Limit"}
            error={errors?.maximumLimits?.message || ""}
            required
          />
        </Wrapper>
        <FormWrap>
          <Text fontSize={"sm"} mb={2} fontWeight={500}>
            Voucher Description
            <span>&nbsp;*</span>
          </Text>
          <CKEditor
            editor={ClassicEditor}
            data={state?.voucherDescription || ""}
            // onReady={(editor) => {}}
            onChange={(_, editor) => {
              const data = editor.getData();
              setValue("voucherDescription", data);
            }}
          />
        </FormWrap>

        {/* <TextEditor /> */}
        <FormWrap>
          <Text fontSize={"sm"} mb={2} fontWeight={500}>
            Voucher Image
            <span>&nbsp;*</span>
          </Text>
          <ImageUpload
            name={"image"}
            setValue={setValue}
            required={!state?.id}
            imageUploadStyle="row"
          />
        </FormWrap>
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
