import ModalForm from "@src/components/molecules/modal";
import { SetPasswordTemplate } from "@src/components/templates/authentication/set-password";
import { useMutation } from "react-query";
import { setPasswordApi } from "@src/service/auth";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";

export const ChangePassword = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  dataProfile: any;
}) => {
  return (
    <ModalForm
      isModalOpen={isOpen}
      onCloseModal={onClose}
      title="Change Password"
    >
      <ChangePasswordPage dataProfile={data} onClose={onClose} />
    </ModalForm>
  );
};

export const ChangePasswordPage = ({ dataProfile, onClose }: any) => {
  const { mutate, isLoading } = useMutation(setPasswordApi, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Password changed successfully");
      onClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  return (
    <SetPasswordTemplate
      mutate={mutate}
      isLoading={isLoading}
      type="change_password"
      email={dataProfile?.email}
    />
  );
};
