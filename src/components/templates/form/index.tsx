import { Button, Input } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

export const ProductForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      product: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="product"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Input {...field} />}
      />

      <Button colorScheme="blue">Submit</Button>
    </form>
  );
};
