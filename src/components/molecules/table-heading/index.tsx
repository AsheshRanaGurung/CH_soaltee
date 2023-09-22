import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { ExportIcon, FilterIcon } from "@src/assets/svgs";
import { TableTitle } from "@src/components/atoms/TableTitle";
import { DrawerComponent } from "@src/components/organisms/drawer";
import DebouncedSearchInput from "@src/utility/debounceSearch";
const TableHeadings = ({
  btnText,
  CurrentText,
  onAction,
  onDisableButton,
  type,
  children,
  drawerTitle,
  onDrawerModalClose,
  onDrawerModalOpen,
  isDrawerOpen,
  onClick,
  onSearch,
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
      {type === "report" ? (
        <Flex gap={2} mb={3} alignItems={"center"}>
          <Button leftIcon={<ExportIcon />} onClick={onClick}>
            Export
          </Button>
          <DrawerComponent
            title={drawerTitle}
            leftIcon={<FilterIcon />}
            btnText="Report Filter"
            onDrawerModalClose={onDrawerModalClose}
            onDrawerModalOpen={onDrawerModalOpen}
            isDrawerOpen={isDrawerOpen}
          >
            {children}
          </DrawerComponent>
        </Flex>
      ) : (
        <Flex gap={2} mb={3} alignItems="center">
          <Flex position="relative">
            {/* <Search setSearchValue={setSearchValue} /> */}
            <DebouncedSearchInput onSearch={onSearch} />
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
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
export default TableHeadings;
