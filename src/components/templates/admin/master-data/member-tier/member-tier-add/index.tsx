import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { IMemberTierDetail } from "@src/interface/master-data/property";
import { ChromePicker } from "react-color";
import { useEffect, useState } from "react";
import { colors } from "@src/theme/colors";
import styled from "styled-components";
import { ColorPickerMinusIcon, ColorPickerPlusIcon } from "@src/assets/svgs";
import { memberTierValidationSchema } from "@src/schema/master-data/member-tier";
import {
  useCreateMemberTier,
  useUpdateMemberTier,
} from "@src/service/master-data/member-tier";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import { useFormHook } from "@src/hooks/useFormhook";

const defaultValues = {
  membershipName: "",
  pointsFrom: "",
  pointsTo: "",
  image: "",
};

const ColorStyled = styled.div`
  border: 1px solid rgba(233, 233, 233, 1);
  .chrome-picker {
    width: 100% !important;
    box-shadow: none !important;
  }
`;

export const CreateMemberForm = ({
  isUpdate,
  updateId,
  tableData,
  setIsUpdate,
  setUpdateId,
  onMemberModalClose,
}: any) => {
  const { register, errors, setValue, reset, handleSubmit } = useFormHook({
    validationSchema: memberTierValidationSchema,
    defaultValues,
  });
  const [color, setColor] = useState(`${colors.primary}`);

  const [isColorPicked, setIsColorPicked] = useState(false);

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex);
    setValue("colorCode", newColor.hex);
  };

  useEffect(() => {
    setValue("colorCode", color);
  }, []);
  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData?.data.find(
        (x: IMemberTierDetail) => x.id === updateId
      );
      reset({
        membershipName: data?.membershipName,
        pointsFrom: data?.pointsFrom,
        pointsTo: data?.pointsTo,
      });
    }
  }, [isUpdate, updateId]);

  const { mutateAsync: mutate, isLoading } = useCreateMemberTier();

  const { mutateAsync: update, isLoading: isUpdating } = useUpdateMemberTier();

  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onMemberModalClose();
  };

  const onSubmitHandler = async (data: IMemberTierDetail) => {
    const formData = new FormData();
    const dat = {
      membershipName: data.membershipName,
      pointsFrom: data.pointsFrom,
      pointsTo: data.pointsTo,
      colorCode: data.colorCode,
      description: data?.description,
    };
    formData.append("data", JSON.stringify(dat));
    if (updateId) {
      if (data.image) {
        formData.append("image", data.image as Blob);
        const result = await update({ id: updateId, data: formData });
        result.status === 200 && onCloseHandler();
      } else {
        formData.append("image", "");
        const result = await update({ id: updateId, data: formData });
        result.status === 200 && onCloseHandler();
      }
    } else {
      formData.append("image", data.image as Blob);
      const result = await mutate(formData);
      result.status === 200 && onCloseHandler();
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <FormControl
            control="input"
            name="membershipName"
            register={register}
            placeholder={"Tier Name"}
            label={"Tier Name"}
            error={errors?.membershipName?.message || ""}
            required
          />
          <FormControl
            control="input"
            type="number"
            name="pointsFrom"
            register={register}
            placeholder={"Points from Tier"}
            label={"Points from Tier"}
            error={errors?.pointsFrom?.message || ""}
            required
          />
          <FormControl
            control="input"
            type="number"
            name="pointsTo"
            register={register}
            placeholder={"Points to Tier"}
            label={"Points to Tier"}
            error={errors?.pointsTo?.message || ""}
            required
          />
          <FormControl
            onChange={(data: string) => setValue("description", data)}
            control="editor"
            name="description"
            label={"Description"}
            required
            placeholder={"description"}
            error={errors?.description?.message ?? ""}
          />
          <Flex
            gap={1}
            onClick={() => {
              setIsColorPicked(!isColorPicked);
            }}
            cursor="pointer"
            mt={5}
          >
            {!isColorPicked ? (
              <ColorPickerPlusIcon />
            ) : (
              <ColorPickerMinusIcon />
            )}
            Pick a Color
          </Flex>
          {isColorPicked && (
            <ColorStyled>
              <ChromePicker color={color} onChange={handleColorChange} />
            </ColorStyled>
          )}
          <Text fontSize={"sm"} mt={5} mb={2} fontWeight={"500"}>
            Image
          </Text>
          <ImageUpload
            setValue={setValue}
            // required={!id}
          />
        </Flex>
        <Spacer />
        <ModalFooterForm
          onCloseModal={onMemberModalClose}
          resetButtonText={"Cancel"}
          isLoading={isLoading || isUpdating}
          submitButtonText={isUpdate ? "Update Tier" : "Add Tier"}
        />
        <Spacer />
      </Box>
    </form>
  );
};
