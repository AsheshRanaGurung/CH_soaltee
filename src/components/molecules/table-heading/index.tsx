import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import { TableTitle } from "@src/components/atoms/TableTitle";

import { Search } from "@src/components/molecules/search";
const TableHeadings = ({
  btnText,
  CurrentText,
  setSearchValue,
  onAction,
  onDisableButton,
  optionGroup,
}: any) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      rowGap={2}
      ml={{ base: 2, md: 0 }}
    >
      <TableTitle currentText={CurrentText ?? ""} />
      <Flex gap={2} alignItems="center">
        <Flex position="relative">
          <Search setSearchValue={setSearchValue} />
        </Flex>
        <Flex gap={2} alignItems="center">
          {btnText && (
            <Button
              variant={"primary"}
              size={"md"}
              height={"42px"}
              leftIcon={<AddIcon />}
              onClick={onAction}
              outline="none"
              border={"none"}
              disabled={onDisableButton}
              sx={{
                "&::before": {
                  border: "none",
                },
                "&::after": {
                  border: "none",
                },
              }}
            >
              {btnText}
            </Button>
          )}
          {optionGroup && <Box bgSize={"md"}>{optionGroup}</Box>}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default TableHeadings;
