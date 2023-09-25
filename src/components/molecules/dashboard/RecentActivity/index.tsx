import { Box, Card, Flex, Text } from "@chakra-ui/react";
import RecentActivityList from "@src/components/templates/admin/dashboard/recent-activity";
import { SelectCustom } from "@src/components/atoms/Select/SelectCustom";
import { FieldErrorsImpl, useForm } from "react-hook-form";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useGetRecentActivity } from "@src/service/dashboard";
import { colors } from "@src/theme/colors";
import { useState } from "react";

const RecentActivityCard = () => {
  const {
    control,
    formState: { errors },
  } = useForm();
  const [prov, setProv] = useState("-1");
  const { data: getActivity, isLoading } = useGetRecentActivity({
    proverty: prov,
  });

  const propertyList = usePropertyList();
  return (
    <Card px={4} py={6} gap={7} mt="20px" mb="10px" flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Text fontSize="18px" fontWeight={600} width="100%">
          Recent Activities
        </Text>
        <Flex gap="8px" alignItems="center">
          <Box color={colors.gray_600} width="100%">
            Select Property:
          </Box>
          <SelectCustom
            style={{ marginRight: "10px" }}
            name="property"
            errors={errors as Partial<FieldErrorsImpl<any>>}
            placeholder="All"
            control={control}
            isLoading={isLoading}
            // isError={isError}
            selectOptions={
              propertyList?.map((item: { id: any; name: any }) => {
                return {
                  value: item?.id,
                  label: item?.name,
                };
              }) ?? []
            }
            onAdditionalOnChange={(e) => setProv(e.target.value || "-1")}
          />
        </Flex>
      </Flex>
      <RecentActivityList data={getActivity} isLoading={isLoading} />
    </Card>
  );
};

export default RecentActivityCard;
