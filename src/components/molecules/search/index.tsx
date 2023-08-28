import { Search2Icon } from "@chakra-ui/icons";
import { Button, Input } from "@chakra-ui/react";

export const Search = ({ setSearchValue }: any) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Search"
        height="44px"
        fontSize="16px"
        fontFamily="'Urbanist', sans-serif"
        pr={12}
        borderRadius={8}
        onChange={(e: any) => {
          setSearchValue && setSearchValue(e.target.value);
        }}
      />
      <Button
        h="35px"
        w="35px"
        bgColor="transparent"
        color="gray"
        zIndex={10}
        position="absolute"
        right={1}
        top={1}
        borderRadius={6}
        sx={{
          "&:hover": {
            bgColor: "transparent",
            outline: "none",
          },
          "&:focus": {
            bgColor: "transparent",
            outline: "none",
          },
        }}
        rightIcon={
          <Search2Icon h="14px" w="14px" color="gray" bgColor={"transparent"} />
        }
      />
    </>
  );
};
