import React, { KeyboardEventHandler } from "react";
import { sendEmail } from "@src/service/email";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { CreatableSelectStyled } from "@src/components/templates/user/referal";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Button } from "@chakra-ui/react";

export const SendEmail = ({ referal }: { referal: string }) => {
  const { control, handleSubmit, setValue, getValues } = useForm();

  //for creatable select
  const createOption = (label: string) => ({
    label,
    value: label,
  });
  const [inputValue, setInputValue] = React.useState("");
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue("email", [...getValues("email"), createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  const { mutate, isLoading } = useMutation(sendEmail, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toastFail(err?.response?.data?.message ?? "Something went wrong");
    },
  });

  const submitHandler = (data: any) => {
    mutate({
      referralLink: referal,
      email: data.email.map((value: any) => value.label),
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          display: "flex",
          width: "100%",
          gap: "15px",
          justifyContent: "space-between",
        }}
      >
        <Controller
          name="email"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <CreatableSelectStyled
              {...field}
              inputValue={inputValue}
              defaultInputValue={inputValue}
              isClearable
              isMulti
              menuIsOpen={false}
              onChange={(newValue: any) => {
                field.onChange(newValue);
              }}
              onInputChange={(newValue: any) => {
                setInputValue(newValue);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter e-mail address"
              value={field.value}
            />
          )}
        />

        <Button
          variant="primary"
          type="submit"
          isLoading={isLoading}
          minWidth={155}
        >
          Send Invitations
        </Button>
      </form>
    </>
  );
};
