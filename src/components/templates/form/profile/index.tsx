import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ManualForm from "@src/components/templates/form/profile/manual";
import { ServiceForm } from "@src/components/templates/form/profile/service";

import { colors } from "@src/theme/colors";
import { getAllProperty } from "@src/service/master-data/property";
import { useQuery } from "react-query";
import { getAllService } from "@src/service/point-config/service";
import { ProfileFormProps } from "@src/interface/profile-points";

const ProfileForm: React.FC<ProfileFormProps> = ({
  userId,
  onCloseModal,
  handleFormSubmit,
}) => {
  const { data: property } = useQuery("property", getAllProperty, {
    select: ({ data }) => data.datalist,
  });
  const { data: service } = useQuery("service", getAllService, {
    select: ({ data }) => data.datalist,
  });
  const propertyList = property?.map((item: any) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });
  const serviceList = service?.map((item: any) => {
    return {
      label: item?.serviceName,
      value: item?.id,
    };
  });
  return (
    <>
      <Tabs variant="unstyled">
        <TabList>
          <Tab color={colors.black_1} _active={{ color: colors.primary }}>
            By Service
          </Tab>
          <Tab color={colors.black_1} _active={{ color: colors.primary }}>
            Manually
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="3px"
          bg={colors.primary}
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <ServiceForm
              data={{ userId, serviceList, propertyList }}
              onCloseModal={onCloseModal}
              handleFormSubmit={handleFormSubmit}
            />
          </TabPanel>
          <TabPanel>
            <ManualForm
              data={{ userId, serviceList, propertyList }}
              onCloseModal={onCloseModal}
              handleFormSubmit={handleFormSubmit}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ProfileForm;
