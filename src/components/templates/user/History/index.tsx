import {
  Box,
  Card,
  Text,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { BackgroundTextWithImage } from "@src/components/molecules/bg-text-image";
import { imageList } from "@src/assets/images";
import { font } from "@src/theme/font";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { getTransactionHistory } from "@src/service/transaction-history";
import { useState } from "react";
import { useQueryClient } from "react-query";
import Historytable from "./history-table";

const HistoryTransaction = () => {
  const [para, setPara] = useState({});
  const queryClient = useQueryClient();
  const handleClick = (name: "month" | "week" | "day") => {
    queryClient.removeQueries({ queryKey: "user_transcation" });
    setPara({ type: name });
  };
  const { data: tableData, isLoading } = usePageinationHook({
    key: "user_transcation",
    url: getTransactionHistory,
    extraParams: para,
  });
  return (
    <>
      <BackgroundTextWithImage
        img={imageList.BackgoundImage}
        height="500px"
        styles={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Box
          color={"#FFFFFF"}
          p={["40px 20px"]}
          position="absolute"
          textAlign="center"
        >
          <Stack>
            <Text
              as="div"
              fontFamily={font.cormorant}
              fontWeight="bold"
              fontSize="xxx-large"
            >
              History
            </Text>
          </Stack>
        </Box>
      </BackgroundTextWithImage>
      <Card
        width="70%"
        margin="0 auto"
        position="relative"
        top={-150}
        left={0}
        right={0}
        borderRadius={16}
        px={10}
        pt={10}
      >
        <Tabs variant="soft-rounded" colorScheme="red">
          <TabList>
            <Tab onClick={() => handleClick("month")}>Monthly</Tab>
            <Tab onClick={() => handleClick("week")}>Weekly</Tab>
            <Tab onClick={() => handleClick("day")}>Daily</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Historytable
                setPara={setPara}
                tabName="month"
                tableData={tableData?.data}
                tableDataFetching={isLoading}
              />
            </TabPanel>
            <TabPanel>
              <Historytable
                tableData={tableData?.data}
                setPara={setPara}
                tabName="week"
                tableDataFetching={isLoading}
              />
            </TabPanel>
            <TabPanel>
              <Historytable
                setPara={setPara}
                tableData={tableData?.data}
                tabName="day"
                tableDataFetching={isLoading}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </>
  );
};

export default HistoryTransaction;
