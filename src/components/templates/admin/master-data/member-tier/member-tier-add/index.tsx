import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { IMemberTierDetail } from "@src/interface/master-data/property";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ChromePicker } from "react-color";
import { useEffect, useState } from "react";
import { colors } from "@src/theme/colors";
import styled from "styled-components";
import { ColorPickerMinusIcon, ColorPickerPlusIcon } from "@src/assets/svgs";
interface IMemberProps {
  register: UseFormRegister<IMemberTierDetail>;
  setValue: UseFormSetValue<IMemberTierDetail>;
  errors: FieldErrors;
  id?: number | string;
}
const ColorStyled = styled.div`
  border: 1px solid rgba(233, 233, 233, 1);
  .chrome-picker {
    width: 100% !important;
    box-shadow: none !important;
  }
`;
export const CreateMemberForm: React.FC<IMemberProps> = ({
  register,
  errors,
  setValue,
  id,
}: any) => {
  const [color, setColor] = useState(`${colors.primary}`);

  const [isColorPicked, setIsColorPicked] = useState(false);

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex);
    setValue("colorCode", newColor.hex);
  };

  useEffect(() => {
    setValue("colorCode", color);
  }, []);
  return (
    <>
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
          <Flex
            gap={1}
            onClick={() => {
              setIsColorPicked(!isColorPicked);
            }}
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
          <ImageUpload setValue={setValue} required={!id} />
        </Flex>
        <Spacer />
      </Box>
    </>
  );
};
