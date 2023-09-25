import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import ModalFooterForm from "@src/components/molecules/modal/footer";
import { useMemberTierList } from "@src/constant/useMemberTierList";
import { useFormHook } from "@src/hooks/useFormhook";
import { IService } from "@src/interface/pointConfig";
import { serviceValidationSchema } from "@src/schema/pointConfigiration/service";
import {
  createServiceApi,
  updateService,
} from "@src/service/point-config/service";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { colors } from "@src/theme/colors";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    flex: 0 0 20%;
  }
`;
const defaultValues = {
  serviceName: "",
  serviceCode: "",
};
export const CreateServiceForm = ({
  isUpdate,
  updateId,
  tableData,
  setIsUpdate,
  setUpdateId,
  onServiceModalClose,
}: any) => {
  const { register, errors, setValue, handleSubmit, reset, watch } =
    useFormHook({
      validationSchema: serviceValidationSchema,
      defaultValues,
    });
  const [formDataArray, setFormDataArray] = useState<IService[]>([]);

  const updatePercentValue = (
    array: any,
    idToUpdate: any,
    newPercentValue: any
  ) => {
    return array.map((item: any) => {
      if (item.id === idToUpdate) {
        return { ...item, rewardPercentage: newPercentValue };
      }
      return item;
    });
  };

  const handleInputChange = (e: any, item: any) => {
    const { value } = e.target;
    const dat = updatePercentValue(
      watch("membershipServiceResponseDtos"),
      item.id,
      value
    );
    setFormDataArray(dat);
    setValue("membershipServiceResponseDtos", dat);
  };
  const onCloseHandler = () => {
    reset(defaultValues);
    setUpdateId("");
    setIsUpdate(false);
    onServiceModalClose();
  };
  const onSubmit = (data: IService) => {
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
    }
  };

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createServiceApi, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
      queryClient.refetchQueries("service");
      queryClient.invalidateQueries("service");
      onCloseHandler();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(
        error.response?.data?.message || "Cound not create member tier"
      );
    },
  });

  const { mutate: update, isLoading: isUpdating } = useMutation(updateService, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
      queryClient.invalidateQueries("service");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });

  const data = useMemberTierList();
  const defaultVal =
    data?.map((item: any) => ({
      id: item.id,
      membershipName: item.membershipName,
      rewardPercentage: "0",
    })) || [];
  useEffect(() => {
    if (!isUpdate) {
      if (defaultVal?.length > 0) {
        setValue("membershipServiceResponseDtos", defaultVal);
      }
    }
  }, [data]);
  useEffect(() => {
    if (isUpdate && updateId) {
      const dataValue = tableData?.data?.find((x: any) => x.id === updateId);

      const filteredData1 = defaultVal.filter(
        (item1: any) =>
          !dataValue?.membershipServiceResponseDtos?.some(
            (item2: any) => item2.membershipName === item1.membershipName
          )
      );
      const combinedData =
        dataValue?.membershipServiceResponseDtos?.concat(filteredData1);

      reset({
        id: dataValue?.id,
        serviceName: dataValue?.serviceName,
        serviceCode: dataValue?.serviceCode,
        membershipServiceResponseDtos: combinedData,
      });
    }
  }, [isUpdate, updateId, data, tableData?.data]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mx={{ base: "none", md: "auto" }}>
          <Flex direction="column" gap={4.5}>
            <FormControl
              control="input"
              name="serviceName"
              register={register}
              placeholder={"Service name"}
              label={"Service Name"}
              error={errors?.serviceName?.message || ""}
              required
            />
            <FormControl
              control="input"
              name="serviceCode"
              register={register}
              placeholder={"Service code"}
              label={"Service Code"}
              error={errors?.requiredPoints?.message || ""}
              required
            />
            <Text fontSize={"lg"}>Reward Point (in %) *</Text>

            <Wrapper>
              {" "}
              {watch("membershipServiceResponseDtos") &&
                watch("membershipServiceResponseDtos").map(
                  (itm: any, index: number) => {
                    return (
                      <FormControl
                        key={itm.id}
                        control="input"
                        type="text"
                        name={`rewardPercentage${index}`}
                        register={register}
                        defaultValue={itm.rewardPercentage}
                        placeholder={""}
                        label={itm.membershipName}
                        error={errors?.membershipName?.message || ""}
                        label_color={colors.black_1}
                        onChange={(e: any) => handleInputChange(e, itm)}
                      />
                    );
                  }
                )}
            </Wrapper>
          </Flex>
          <Spacer />
        </Box>
        <ModalFooterForm
          onCloseModal={onServiceModalClose}
          resetButtonText={"Cancel"}
          isLoading={isLoading || isUpdating}
          submitButtonText={isUpdate ? "Update Service" : "Add Service"}
        />
        <Spacer />
      </form>
    </>
  );
};
