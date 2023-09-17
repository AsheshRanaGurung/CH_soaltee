import {
  Card,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Historytable from "./history-table";
import Header from "@src/components/atoms/Header";
import { HeaderWrapper } from "../UserMain-index";

const HistoryTransaction = () => {
  return (
    <>
      <HeaderWrapper>
        <Header navigation={true} />
      </HeaderWrapper>
      <Card>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Historytable />
      </Card>
    </>
  );
};

export default HistoryTransaction;
