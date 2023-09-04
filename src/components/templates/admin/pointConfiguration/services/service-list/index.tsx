import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import { useEffect, useState } from "react";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import { CreateServiceForm } from "../service-add";
import {
  useCreateService,
  useDeleteService,
  useUpdateService,
} from "@src/service/point-config/service";
import { IService } from "@src/interface/pointConfig";
import ServiceTable from "../service-table";
import { getAllMemberTier } from "@src/service/master-data/member-tier";
import { useQuery } from "react-query";

interface IServiceProps {
  tableData: IService[];
  tableDataFetching: boolean;
}
const defaultValues = {
  serviceName: "",
  serviceCode: "",
  membershipServiceResponseDtos: [],
};

const ServiceList: React.FC<IServiceProps> = ({
  tableData,
  tableDataFetching,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const {
    isOpen: isServiceOpen,
    onOpen: onServiceModalOpen,
    onClose: onServiceModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteServiceOpen,
    onOpen: onDeleteServiceOpen,
    onClose: onDeleteServiceClose,
  } = useDisclosure();

  const validationSchema = yup.object().shape({
    serviceName: yup.string().required("serviceName is required"),
    serviceCode: yup.string().required("serviceCode is required"),
  });
  const [formDataArray, setFormDataArray] = useState<IService[]>([]);
  const { handleSubmit, register, errors, reset, watch, setValue } =
    useFormHook({
      validationSchema,
      defaultValues,
    });
  const { data } = useQuery("member_tier", getAllMemberTier, {
    select: ({ data }) => data.datalist,
  });

  useEffect(() => {
    if (!isUpdate) {
      const defaultVal =
        data?.map((item: any) => ({
          id: item.id,
          membershipName: item.membershipName,
          rewardPercentage: "0",
        })) || [];
      if (defaultVal.length > 0) {
        setValue("membershipServiceResponseDtos", defaultVal);
      }
    }
  }, [data]);
  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: IService) => x.id === updateId);
      reset({
        id: data?.id,
        serviceName: data?.serviceName,
        serviceCode: data?.serviceCode,
        membershipServiceResponseDtos: data?.membershipServiceResponseDtos,
      });
    }
  }, [isUpdate, updateId, tableData]);

  const { mutateAsync: mutate, isLoading } = useCreateService();
  const { mutateAsync: update, isLoading: isUpdating } = useUpdateService();

  const onCloseHandler = () => {
    setDeleteId("");
    setUpdateId("");
    setIsUpdate(false);
    onServiceModalClose();
  };
  const onSubmitHandler = (data: IService) => {
    if (updateId) {
      update({
        id: updateId,
        data: {
          id: data.id,
          serviceCode: data.serviceCode,
          serviceName: data.serviceName,
          membershipServiceRequestDto: formDataArray,
        },
      });
      onCloseHandler();
    } else {
      mutate({
        id: data.id,
        serviceCode: data.serviceCode,
        serviceName: data.serviceName,
        membershipServiceRequestDto: formDataArray,
      });
      onCloseHandler();
    }
  };

  const { mutateAsync: deleteService, isLoading: isDeleting } =
    useDeleteService();

  const onDelete = async (id: string) => {
    const result = await deleteService({
      id: id,
    });
    result.status === 200 && onDeleteServiceClose();
  };

  return (
    <>
      <ServiceTable
        tableData={tableData}
        tableDataFetching={tableDataFetching}
        title="Filter By"
        btnText="Add Property"
        CurrentText="Property List"
        onAction={() => {
          onCloseHandler();
          onServiceModalOpen();
        }}
        onMemberModalOpen={onServiceModalOpen}
        onEditData={(id: string) => {
          setUpdateId(id);
          setIsUpdate(true);
          onServiceModalOpen();
        }}
        onDeleteData={(id: string) => {
          setDeleteId(id);
          onDeleteServiceOpen();
        }}
      />

      <ModalForm
        isModalOpen={isServiceOpen}
        title={isUpdate ? "Update Service" : "Add Service"}
        onCloseModal={onServiceModalClose}
        isLoading={isLoading || isUpdating}
        resetButtonText={"Cancel"}
        submitButtonText={isUpdate ? "Update Service" : "Add Service"}
        submitHandler={handleSubmit(onSubmitHandler)}
        showFooter={true}
      >
        <CreateServiceForm
          register={register}
          errors={errors}
          formDataArray={formDataArray}
          setFormDataArray={setFormDataArray}
          setValue={setValue}
          watch={watch}
          data={data}
        />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isModalOpen={isDeleteServiceOpen}
        onCloseModal={onDeleteServiceClose}
        resetButtonText={"No"}
        isLoading={isDeleting}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(deleteId ?? "")}
        showFooter={true}
      >
        Are you sure you want to delete the Service detail?
      </ModalForm>
    </>
  );
};
export default ServiceList;
