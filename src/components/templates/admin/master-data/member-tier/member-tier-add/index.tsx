import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { IMemberTierDetail } from "@src/interface/master-data/property";
import { ChromePicker } from "react-color";
import { useEffect, useState } from "react";
import { colors } from "@src/theme/colors";
import styled from "styled-components";
import {
  ColorInList,
  ColorPickerMinusIcon,
  ColorPickerPlusIcon,
} from "@src/assets/svgs";
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
type IndividualDataType = {
  description?: string;
  imageUrl?: string;
  colorCode?: string;
};

const ColorStyled = styled.div`
  border: 1px solid rgba(233, 233, 233, 1);
  .chrome-picker {
    width: 100% !important;
    box-shadow: none !important;
  }
`;

const ColorTierStyled = styled.div`
  svg {
    path {
      fill: ${(props) => props.color || "transparent"};
    }
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
  const { register, errors, setValue, reset, handleSubmit, watch } =
    useFormHook({
      validationSchema: memberTierValidationSchema,
      defaultValues,
    });
  const [individualData, setIndividualData] = useState<IndividualDataType>({});
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
      setIndividualData(data);
      reset({
        membershipName: data?.membershipName,
        pointsFrom: data?.pointsFrom,
        pointsTo: data?.pointsTo,
        image: data?.imageUrl,
        description: data?.description,
      });
      setValue("colorCode", individualData?.colorCode);
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
      colorCode: data.colorCode || individualData?.colorCode,
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
            data={
              (updateId && individualData && individualData?.description) ?? ""
            }
            error={errors?.description?.message ?? ""}
          />
          <Flex
            justifyContent="space-between"
            onClick={() => {
              setIsColorPicked(!isColorPicked);
            }}
            cursor="pointer"
            mt={5}
          >
            <Flex gap={1}>
              {!isColorPicked ? (
                <ColorPickerPlusIcon />
              ) : (
                <ColorPickerMinusIcon />
              )}
              Pick a Color
            </Flex>
            <Box>
              <ColorTierStyled
                color={watch("colorCode") || individualData?.colorCode}
              >
                <ColorInList />
              </ColorTierStyled>
            </Box>
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
            error={errors?.image?.message}
            imageSrc={updateId ? individualData?.imageUrl : undefined}
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
