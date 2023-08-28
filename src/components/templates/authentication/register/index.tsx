import { Input, Button } from "@chakra-ui/react";
import { useFormHook } from "@soaltee-loyalty/hooks/useFormhook";

interface ISignupProps {
  mutate: any;
  isLoading: boolean;
}
const SignupTemplate: React.FC<ISignupProps> = ({ mutate }) => {
  const { handleSubmit, register, errors } = useFormHook();
  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Signup</div>
      <Input
        size={"md"}
        placeholder="Name"
        {...register("name")}
        className="input-field"
      />
      {errors.name && <p>{errors.name.message}</p>}
      <Input
        size={"md"}
        placeholder="Email"
        {...register("email")}
        className="input-field"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <Button type="submit" className="button">
        Submit
      </Button>
    </form>
  );
};
export { SignupTemplate };
