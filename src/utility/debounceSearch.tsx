import { Search2Icon } from "@chakra-ui/icons";
import { Button, Input } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";
import { useState, useEffect } from "react";

const DebouncedSearchInput = ({ onSearch, delay = 300 }: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, delay);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, onSearch, delay]);

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search"
        height="42px"
        fontSize="16px"
        fontFamily="'Urbanist', sans-serif"
        pl={10}
        _focusVisible={{
          border: `1px solid ${colors.primary} `,
        }}
        borderRadius={8}
        onChange={handleInputChange}
      />
      <Button
        h="35px"
        w="35px"
        bgColor="transparent"
        color="gray"
        zIndex={10}
        position="absolute"
        top={1}
        borderRadius={8}
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
        leftIcon={
          <Search2Icon h="14px" w="14px" color="gray" bgColor={"transparent"} />
        }
      />
    </>
  );
};

export default DebouncedSearchInput;
