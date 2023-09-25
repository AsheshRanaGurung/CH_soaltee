import { Box, Flex, Spacer } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import { useFormHook } from "@src/hooks/useFormhook";
import { IProperty } from "@src/interface/master-data/property";
import { propertyValidation } from "@src/schema/master-data";
import {
  useCreateProperty,
  useUpdateProperty,
} from "@src/service/master-data/property";
import { useEffect } from "react";
interface IpropertyProps {
  isUpdate: any;
  updateId: any;
  tableData: any;
  setIsUpdate: any;
  setUpdateId: any;
  onPropertyModalClose: any;
}
const defaultValues = {
  name: "",
  code: "",
  phoneNumber: "",
  contactPerson: "",
  contactPersonPhoneNo: "",
};

export const CreatePropertyForm: React.FC<IpropertyProps> = ({
  isUpdate,
  updateId,
  tableData,
  setIsUpdate,
  setUpdateId,
  onPropertyModalClose,
}) => {
  const { handleSubmit, register, errors, reset } = useFormHook({
    validationSchema: propertyValidation,
    defaultValues,
  });
  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: IProperty) => x.id === updateId);
      reset({
        ...data,
      });
    }
  }, [isUpdate, updateId]);
  const { mutateAsync: mutate, isLoading } = useCreateProperty();
  const { mutateAsync: update, isLoading: isUpdating } = useUpdateProperty();
  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onPropertyModalClose();
  };

  const onSubmitHandler = (data: IProperty) => {
    if (updateId) {
      update({
        id: updateId,
        data: {
          ...data,
          id: updateId,
        },
      });
      onCloseHandler();
    } else {
      mutate(data);
      onCloseHandler();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box mx={{ base: "none", md: "auto" }}>
        <Flex direction="column" gap={4.5}>
          <FormControl
            control="input"
            name="name"
            register={register}
            placeholder={"Property Name"}
            label={"Property Name"}
            error={errors?.name?.message || ""}
            required
          />
          <FormControl
            control="input"
            name="code"
            register={register}
            placeholder={"Property Code"}
            label={"Property Code"}
            error={errors.code?.message || ""}
            required
          />
          <FormControl
            control="input"
            width="400px"
            name="email"
            mb={20}
            required
            placeholder="Enter your mail"
            label="Email"
            register={register}
            error={errors.email?.message || ""}
          />
          <FormControl
            control="input"
            type="number"
            name="phoneNumber"
            register={register}
            placeholder={"Phone Number"}
            label={"Phone Number"}
            error={errors.phoneNumber?.message || ""}
            required
          />
          <FormControl
            control="input"
            name="contactPerson"
            register={register}
            placeholder={"Contact Person"}
            label={"Contact Person"}
            error={errors.contactPerson?.message || ""}
            required
          />
          <FormControl
            control="input"
            type="number"
            name="contactPersonPhoneNo"
            register={register}
            placeholder={"Contact Person Phone Number"}
            label={"Contact Person Phone Number"}
            error={errors.contactPersonPhoneNo?.message || ""}
            required
          />
        </Flex>
        <ModalFooterForm
          onCloseModal={onPropertyModalClose}
          resetButtonText={"Cancel"}
          isLoading={isLoading || isUpdating}
          submitButtonText={isUpdate ? "Update Property" : "Add Property"}
        />
        <Spacer />
      </Box>
    </form>
  );
};
