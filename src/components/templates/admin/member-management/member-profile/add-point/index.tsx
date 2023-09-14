import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ManualForm from "../manual";
import { ServiceForm } from "@src/components/templates/admin/member-management/member-profile/service";
import { colors } from "@src/theme/colors";
import { ProfileFormProps } from "@src/interface/profile-points";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useServiceList } from "@src/constant/useServiceList";

const ProfileForm: React.FC<ProfileFormProps> = ({
  userId,
  onCloseModal,
  handleFormSubmit,
}) => {
  const propertyList = usePropertyList();
  const serviceList = useServiceList();
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
