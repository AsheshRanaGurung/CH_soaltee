import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import { useEffect, useState } from "react";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import { CreatePropertyForm } from "@src/components/templates/admin/master-data/property/property-add";
import {
  useCreateProperty,
  useDeleteProperty,
  useUpdateProperty,
} from "@src/service/master-data/property";
import PropertyTable from "../property-table";
import { IProperty } from "@src/interface/master-data/property";

interface IPropertyProps {
  tableData: IProperty[];
  tableDataFetching: boolean;
}

const defaultValues = {
  name: "",
  code: "",
  phoneNumber: "",
  contactPerson: "",
  contactPersonPhoneNo: "",
};

const PropertyList: React.FC<IPropertyProps> = ({
  tableData,
  tableDataFetching,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const {
    isOpen: isPropertyOpen,
    onOpen: onPropertyModalOpen,
    onClose: onPropertyModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeletePropertyOpen,
    onOpen: onDeletePropertyOpen,
    onClose: onDeletePropertyClose,
  } = useDisclosure();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Property Name is required"),
    code: yup.string().required("Property Code is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    contactPerson: yup.string().required("Contact Person Name is required"),
    contactPersonPhoneNo: yup
      .string()
      .required("Contact Person Phone Number is required"),
  });
  const { handleSubmit, register, errors, reset } = useFormHook({
    validationSchema,
    defaultValues,
  });

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: IProperty) => x.id === updateId);

      reset({
        name: data?.name,
        code: data?.code,
        phoneNumber: data?.phoneNumber,
        contactPerson: data?.contactPerson,
        contactPersonPhoneNo: data?.contactPersonPhoneNo,
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

  const { mutateAsync: deletePropertyTier, isLoading: isDeleting } =
    useDeleteProperty();

  const onDelete = async (id: string) => {
    const result = await deletePropertyTier({
      id: id,
    });
    result.status === 200 && onDeletePropertyClose();
  };

  return (
    <>
      <PropertyTable
        tableData={tableData}
        tableDataFetching={tableDataFetching}
        title="Filter By"
        btnText="Add Property"
        CurrentText="Property List"
        onAction={() => {
          onCloseHandler();
          onPropertyModalOpen();
        }}
        onMemberModalOpen={onPropertyModalOpen}
        onEditData={(id: string) => {
          setUpdateId(id);
          setIsUpdate(true);
          onPropertyModalOpen();
        }}
        onDeleteData={(id: string) => {
          setDeleteId(id);
          onDeletePropertyOpen();
        }}
      />
      <ModalForm
        isModalOpen={isPropertyOpen}
        title={isUpdate ? "Update Property" : "Add Property"}
        onCloseModal={onPropertyModalClose}
        resetButtonText={"Cancel"}
        isLoading={isLoading || isUpdating}
        submitButtonText={isUpdate ? "Update Property" : "Add Property"}
        submitHandler={handleSubmit(onSubmitHandler)}
        showFooter={true}
      >
        <CreatePropertyForm register={register} errors={errors} />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isModalOpen={isDeletePropertyOpen}
        onCloseModal={onDeletePropertyClose}
        resetButtonText={"No"}
        isLoading={isDeleting}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(deleteId ?? "")}
        showFooter={true}
      >
        Are you sure you want to delete the Property detail?
      </ModalForm>
    </>
  );
};
export default PropertyList;