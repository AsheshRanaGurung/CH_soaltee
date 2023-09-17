import { IMemberHistory } from "@src/interface/member-management";
import { Text } from "@chakra-ui/layout";
import styled from "styled-components";
import Type from "./type";
import { FaCircleMinus, FaCirclePlus, FaRegCircle } from "react-icons/fa6";
import { colors } from "@src/theme/colors";
import useDateFormatter from "@src/hooks/useDateCustom";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NoDataAvailable from "@src/components/organisms/nodata";
interface IMemberHistoryProps {
  data?: IMemberHistory[];
}

const Wrapper = styled.div`
  padding: 0px 0px 0px 90px;
`;

const WrapperContent = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  position: relative;
  height: 100px;

  .line-stroke {
    position: relative;
    &::before {
      content: "";
      border: solid 1px #d2d2d2;
      position: absolute;
      height: 84px;
      top: 15px;
      left: 7px;
    }
  }
`;
const MemberHistory: React.FC<IMemberHistoryProps> = ({ data }) => {
  const { formatDateToCustomFormat } = useDateFormatter();
  const [showMoreData, setShowMoreData] = useState<IMemberHistory[]>([]);
  useEffect(() => {
    // Initially, display the first batch of data
    if (data) {
      setShowMoreData(data.slice(0, 5));
    }
  }, [data]);
  const fetchMore = () => {
    if (data) {
      const currentDataLength = showMoreData.length;
      const newData = data.slice(currentDataLength, currentDataLength + 5);
      setShowMoreData((prevData) => [...prevData, ...newData]);
    }
  };
  return (
    <Wrapper>
      <Text fontSize={"2xl"} mb={5}>
        Transaction History
      </Text>
      {data && data.length > 0 ? (
        showMoreData?.map((itmm, index) => {
          return (
            <WrapperContent key={itmm.id}>
              <Type type={itmm.transactionType} />
              {itmm.transactionType === "REEDEM" ? (
                <FaCircleMinus fill={colors.primary} />
              ) : (
                <FaCirclePlus fill={colors.primary_green} />
              )}
              <div className={data.length - 1 === index ? "" : "line-stroke"}>
                <FaRegCircle color={colors.light_gray_1} />
              </div>
              <div>
                <Text>{formatDateToCustomFormat(itmm?.txnDate)}</Text>
                <Text color={colors.secondary_dark}>
                  {itmm.fullName} has been{" "}
                  {itmm.transactionType === "REEDEM" ? "Deducted" : "Credited"}{" "}
                  with {itmm.rewardPoints} points from {itmm.propertyName}.
                </Text>
              </div>
            </WrapperContent>
          );
        })
      ) : (
        <NoDataAvailable content="No history available" />
      )}
      {data && data?.length > 0 && (
        <Button onClick={fetchMore}>Show more</Button>
      )}
    </Wrapper>
  );
};
export default MemberHistory;
