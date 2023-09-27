import { Button, HStack, VStack, Text, Stack } from "@chakra-ui/react";
import { getReferalLink } from "@src/service/referal-link";
// import { useFormHook } from "@src/hooks/useFormhook";

import { font } from "@src/theme/font";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import ClipboardJS from "clipboard";
import { useEffect, useRef, useState } from "react";
import { SimpleHeadingText } from "@src/components/molecules/heading-text";
import CopyWithTextButton from "@src/components/molecules/copy-text-with-button";
import CreatableSelect from "react-select/creatable";
import React, { KeyboardEventHandler } from "react";
import { sendEmail } from "@src/service/email";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import styled from "styled-components";

const CreatableSelectStyled = styled(CreatableSelect)`
  width: 100%;
  .css-4xgw5l-IndicatorsContainer2 {
    display: none;
  }
`;
export const ReferalLayout = () => {
  const { control, handleSubmit, setValue, getValues } = useForm();

  const { data: refer } = useQuery("referalLink", getReferalLink, {
    select: (data) => data?.data?.data,
  });

  const referalCode = refer?.referrallink?.split("?")[1];
  const clipboardLinkRef = useRef(null);
  const clipboardCodeRef = useRef(null);
  const clipboardLinkRefCurrent = clipboardLinkRef?.current;
  const clipboardCodeRefCurrent = clipboardCodeRef?.current;
  const [clickedLink, setIsLinkClicked] = useState(false);
  const [clickedCode, setIsCodeClicked] = useState(false);

  useEffect(() => {
    if (clipboardLinkRefCurrent && clipboardCodeRefCurrent) {
      const clipboardLink = new ClipboardJS(clipboardLinkRefCurrent);
      const clipboardCode = new ClipboardJS(clipboardCodeRefCurrent);

      // Define a callback function when copying is successful
      clipboardLink.on("success", (e) => {
        setIsLinkClicked(true);
        e.clearSelection();
      });
      clipboardCode.on("success", (e) => {
        setIsCodeClicked(true);
        e.clearSelection();
      });

      // Clean up the Clipboard.js instance when the component unmounts
      return () => {
        setTimeout(() => {
          setIsLinkClicked(false);
          setIsCodeClicked(false);
        }, 1500);
        clipboardLink.destroy();
        clipboardCode.destroy();
      };
    }
  }, [
    clipboardLinkRefCurrent,
    clipboardCodeRefCurrent,
    clickedLink,
    clickedCode,
  ]);
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
      referralLink: refer?.referrallink,
      email: data.email.map((value: any) => value.label),
    });
  };

  return (
    <Stack fontFamily={font.josefin} gap={45}>
      <VStack>
        <SimpleHeadingText
          title=" Invite your friend"
          subtitle="Insert your friends e-mail addresses and send them invitations to join
          The Heritage Club."
        />
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
      </VStack>
      <VStack>
        <SimpleHeadingText
          title="Share the referral link or Referral code"
          subtitle="You can also share your personal referral link by copying and sending
          it or sharing it on your social media"
        />
        <HStack width="100%" gap={4}>
          <CopyWithTextButton
            ref={clipboardLinkRef}
            textToCopy={refer?.referrallink}
            buttonText="Link"
            isClicked={clickedLink}
          />
        </HStack>
        <Text fontWeight="600">OR</Text>
        <CopyWithTextButton
          ref={clipboardCodeRef}
          textToCopy={referalCode}
          buttonText="Code"
          isClicked={clickedCode}
        />
      </VStack>
    </Stack>
  );
};
