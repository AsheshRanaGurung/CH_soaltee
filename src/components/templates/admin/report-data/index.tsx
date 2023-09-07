import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";

import { IProperty } from "@src/interface/master-data/property";
import { createPhoneNumberSchema } from "@src/utility/phoneValidation";
import ReportTable from "@src/components/molecules/Report";

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

const ReportList: React.FC<IPropertyProps> = ({
  tableData,
  tableDataFetching,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [_, setDeleteId] = useState("");

  const {
    // isOpen: isPropertyOpen,
    onOpen: onPropertyModalOpen,
    onClose: onPropertyModalClose,
  } = useDisclosure();
  const {
    // isOpen: isDeletePropertyOpen,
    onOpen: onDeletePropertyOpen,
    // onClose: onDeletePropertyClose,
  } = useDisclosure();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Property Name is required"),
    code: yup.string().required("Property Code is required"),
    phoneNumber: createPhoneNumberSchema(),
    contactPerson: yup.string().required("Contact Person Name is required"),
    contactPersonPhoneNo: createPhoneNumberSchema(),
  });
  const { reset } = useFormHook({
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

  //   const { mutateAsync: mutate } = useCreateProperty();
  //   const { mutateAsync: update } = useUpdateProperty();
  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onPropertyModalClose();
  };

  //   const onSubmitHandler = (data: IProperty) => {
  //     if (updateId) {
  //       update({
  //         id: updateId,
  //         data: {
  //           ...data,
  //           id: updateId,
  //         },
  //       });
  //       onCloseHandler();
  //     } else {
  //       mutate(data);
  //       onCloseHandler();
  //     }
  //   };

  //   const { mutateAsync: deletePropertyTier, isLoading: isDeleting } =
  //     useDeleteProperty();

  //   const onDelete = async (id: string) => {
  //     const result = await deletePropertyTier({
  //       id: id,
  //     });
  //     result.status === 200 && onDeletePropertyClose();
  //   };

  return (
    <>
      <ReportTable
        tableData={tableData}
        tableDataFetching={tableDataFetching}
        title="Filter By"
        btnText="Add Property"
        CurrentText="Report List"
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
    </>
  );
};
export default ReportList;
