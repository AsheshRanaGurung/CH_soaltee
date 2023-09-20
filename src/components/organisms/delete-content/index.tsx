import { Text } from "@chakra-ui/layout";
import ModalFooterForm from "@src/components/molecules/modal/footer";
const DeleteContent = ({
  handleSubmit,
  title,
  onCloseModal,
  isLoading,
}: any) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Text> {`Are you sure you want to delete the ${title} ?`}</Text>
      <ModalFooterForm
        onCloseModal={onCloseModal}
        resetButtonText={"Cancel"}
        isLoading={isLoading}
        submitButtonText={"Yes"}
        onClick={handleSubmit}
      />
    </form>
  );
};
export default DeleteContent;
