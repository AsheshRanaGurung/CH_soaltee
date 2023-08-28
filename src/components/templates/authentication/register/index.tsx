import { Button } from "@chakra-ui/react";
import TextInput from "@soaltee-loyalty/components/atoms/Input";
import { useFormHook } from "@soaltee-loyalty/hooks/useFormhook";

interface ISignupProps {
  mutate: any;
  isLoading: boolean;
}
const SignupTemplate: React.FC<ISignupProps> = ({ mutate }) => {
  const { handleSubmit, register, errors, control } = useFormHook();
  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Signup</div>
      <TextInput
        type="text"
        name="name"
        required
        placeholder="name"
        control={control}
        label="Full Name"
        register={register}
        error={errors.name?.message || ""}
      />

      <Button type="submit" className="button">
        Submit
      </Button>
    </form>
  );
};
export { SignupTemplate };
