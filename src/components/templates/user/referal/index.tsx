import { HStack, VStack, Text, Stack } from "@chakra-ui/react";
import { getReferalLink } from "@src/service/referal-link";
// import { useFormHook } from "@src/hooks/useFormhook";

import { font } from "@src/theme/font";
import { useQuery } from "react-query";
import ClipboardJS from "clipboard";
import { useEffect, useRef, useState } from "react";
import { SimpleHeadingText } from "@src/components/molecules/heading-text";
import CopyWithTextButton from "@src/components/molecules/copy-text-with-button";
import CreatableSelect from "react-select/creatable";
import styled from "styled-components";
import { SendEmail } from "@src/components/organisms/send-email";

export const CreatableSelectStyled = styled(CreatableSelect)`
  width: 100%;
  .css-4xgw5l-IndicatorsContainer2 {
    display: none;
  }
`;
export const ReferalLayout = () => {
  const { data: refer } = useQuery("referalLink", getReferalLink, {
    select: (data) => data?.data?.data,
  });

  const referalCode = refer?.referrallink?.split("ref=")[1];
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

  return (
    <Stack fontFamily={font.josefin} gap={45}>
      <VStack>
        <SimpleHeadingText
          title=" Invite your friend"
          subtitle="Insert your friends e-mail addresses and send them invitations to join
          The Heritage Club."
        />
        <SendEmail referal={refer?.referrallink} />
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
