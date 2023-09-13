import { Box, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ImageUpload from "@src/components/atoms/ImageUpload";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Text } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IOffers } from "@src/interface/offers";

interface IOfferProps {
  register: UseFormRegister<IOffers>;
  errors: FieldErrors;
  setValue: any;
  watch: any;
}
export const CreateOfferForm: React.FC<IOfferProps> = ({
  register,
  errors,
  setValue,
  watch,
}) => {
  return (
    <Box mx={{ base: "none", md: "auto" }}>
      <FormControl
        control="input"
        name="offerName"
        register={register}
        placeholder={"Offer Name"}
        label={"Offer Name"}
        error={errors?.offerName?.message || ""}
        required
      />
      <FormControl
        control="input"
        name="subTitle"
        register={register}
        placeholder={"Sub Title"}
        label={"Sub Title"}
        error={errors?.subTitle?.message || ""}
        required
      />

      <Text fontSize={"sm"} mb={2} fontWeight={"500"}>
        Description
      </Text>
      <CKEditor
        editor={ClassicEditor}
        data={watch("description")}
        onChange={(_, editor) => {
          const data = editor.getData();
          console.log("data", data);
          setValue("description", data);
        }}
      />

      <Text fontSize={"sm"} mt={5} mb={2} fontWeight={"500"}>
        Image
      </Text>
      <ImageUpload setValue={setValue} name={"image"} />

      <Spacer />
    </Box>
  );
};
