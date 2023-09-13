import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import { useEffect, useState } from "react";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import { IParams } from "@src/interface/params";
import { Pagination } from "@src/components/organisms/table";
import { IOffers } from "@src/interface/offers";
import {
  useCreateOffer,
  useDeleteOffer,
  useUpdateOffer,
} from "@src/service/offer";
import { CreateOfferForm } from "../offer-add";
import OfferTable from "../offer-table";
import { OfferPage } from "../offer-Page";

interface IOfferProps {
  tableData: IOffers[];
  tableDataFetching: boolean;
  _pageSizeChange: (limit: number) => void;
  _pageChange: (page: number) => void;
  paginatedData: IOffers[];
  pageParams: IParams;
}

const defaultValues = {
  offerId: "",
  offerImage: "",
  offerName: "",
  description: "",
  subTitle: "",
};

const validationSchema = yup.object().shape({
  offerName: yup.string().required("Offer Name is required"),
  description: yup.string().required("Description is required"),
  subTitle: yup.string().required("Subtitle is required"),
});

const OfferList: React.FC<IOfferProps> = ({
  tableData,
  tableDataFetching,
  _pageSizeChange,
  _pageChange,
  paginatedData,
  pageParams,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [viewId, setViewId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOfferOpen,
    onOpen: onOfferModalOpen,
    onClose: onOfferModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOfferOpen,
    onOpen: onDeleteOfferOpen,
    onClose: onDeleteOfferClose,
  } = useDisclosure();

  const { handleSubmit, register, errors, reset, setValue, watch } =
    useFormHook({
      validationSchema,
      defaultValues,
    });

  useEffect(() => {
    if (isUpdate && updateId) {
      const data = tableData.find((x: IOffers) => x.offerId === updateId);
      reset({ ...data });
    }
  }, [isUpdate, updateId]);

  const { mutateAsync: mutate, isLoading } = useCreateOffer();
  const { mutateAsync: update, isLoading: isUpdating } = useUpdateOffer();
  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onOfferModalClose();
  };

  const onSubmitHandler = async (data: IOffers) => {
    const formData = new FormData();
    const dat = {
      offerName: data.offerName,
      subTitle: data.subTitle,
      description: data.description,
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

  const { mutateAsync: deleteOffer, isLoading: isDeleting } = useDeleteOffer();

  const onDelete = async (id: string) => {
    const result = await deleteOffer({
      id: id,
    });
    result.status === 200 && onDeleteOfferClose();
  };
  return (
    <>
      <OfferTable
        tableDataFetching={tableDataFetching}
        paginatedData={paginatedData}
        pageParams={pageParams}
        title="Filter By"
        btnText="Add Offer"
        CurrentText="Offer List"
        onAction={() => {
          onCloseHandler();
          onOfferModalOpen();
        }}
        onEditData={(id: string) => {
          setUpdateId(id);
          setIsUpdate(true);
          onOfferModalOpen();
        }}
        onDeleteData={(id: string) => {
          setDeleteId(id);
          onDeleteOfferOpen();
        }}
        onViewData={(id: string) => {
          setViewId(id);
          onOpen();
        }}
      />
      <ModalForm
        isModalOpen={isOfferOpen}
        title={isUpdate ? "Update Offer" : "Add Offer"}
        onCloseModal={onOfferModalClose}
        resetButtonText={"Cancel"}
        isLoading={isLoading || isUpdating}
        submitButtonText={isUpdate ? "Update Offer" : "Add Offer"}
        submitHandler={handleSubmit(onSubmitHandler)}
        showFooter={true}
      >
        <CreateOfferForm
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isModalOpen={isDeleteOfferOpen}
        onCloseModal={onDeleteOfferClose}
        resetButtonText={"No"}
        isLoading={isDeleting}
        submitButtonText={"Yes"}
        handleSubmit={() => onDelete(deleteId ?? "")}
        showFooter={true}
      >
        Are you sure you want to delete the Offer detail?
      </ModalForm>
      <Pagination
        enabled={true}
        queryPageIndex={pageParams.page}
        queryPageSize={pageParams.limit}
        totalCount={tableData?.length || 0}
        pageChange={_pageChange}
        pageSizeChange={_pageSizeChange}
      />
      <OfferPage isOpen={isOpen} onClose={onClose} viewId={viewId} />
    </>
  );
};
export default OfferList;
