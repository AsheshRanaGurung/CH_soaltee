import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";

const TableActions = ({ onEdit, onView, onDelete }: ITableActions) => {
  return (
    <Flex justifyItems="center" alignItems="center" justifyContent={"center"}>
      {!!onView && (
        <Tooltip hasArrow label="View" color={colors.white}>
          <IconButton
            width={"20px"}
            aria-label="settings"
            bgColor={"transparent"}
            icon={<ViewIcon />}
            onClick={onView}
            color={colors.primary}
            sx={{
              "&:hover": {
                bgColor: "transparent",
              },
              "&:focus": {
                outline: "none",
              },
              "&:disabled": {
                background: "none !important",
              },
            }}
          />
        </Tooltip>
      )}

      {!!onEdit && (
        <Tooltip hasArrow label="Edit" color={colors.white}>
          <IconButton
            width={"20px"}
            aria-label="settings"
            bgColor={"transparent"}
            onClick={onEdit}
            color={colors.primary}
            icon={<EditIcon />}
            sx={{
              "&:hover": {
                bgColor: "transparent",
              },
              "&:focus": {
                outline: "none",
              },
              "&:disabled": {
                background: "none !important",
              },
            }}
          />
        </Tooltip>
      )}

      {!!onDelete && (
        <Tooltip hasArrow label="Delete" color={colors.white}>
          <IconButton
            width={"20px"}
            aria-label="settings"
            bgColor={"transparent"}
            icon={<DeleteIcon />}
            color={colors.primary}
            onClick={onDelete}
            sx={{
              "&:hover": {
                bgColor: "transparent",
              },
              "&:focus": {
                outline: "none",
              },
              "&:disabled": {
                background: "none !important",
              },
            }}
          />
        </Tooltip>
      )}
    </Flex>
  );
};
interface ITableActions {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

export default TableActions;
