import { Button, HStack, VStack, Text, Stack } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import { useFormHook } from "@src/hooks/useFormhook";
import { colors } from "@src/theme/colors";
import { font } from "@src/theme/font";

export const ReferalLayout = () => {
  const { register, handleSubmit } = useFormHook({});
  const submitHandler = (data: any) => {
    console.log(data);
  };
  return (
    <Stack fontFamily={font.josefin} gap={45}>
      <VStack>
        <Text fontSize="xl" fontWeight="600" width="100%">
          Invite your friend
        </Text>
        <Text
          fontWeight="400"
          fontSize="md"
          color={colors.black_1}
          width="100%"
          overflowWrap="break-word"
        >
          lnsert your friends e-mail addresses and send them invitations to join
          The Heritage Club.
        </Text>
        <form
          onSubmit={handleSubmit(submitHandler)}
          style={{ display: "flex" }}
        >
          <FormControl
            control="input"
            width="400px"
            name="email"
            mb={20}
            required
            placeholder="Enter email address"
            register={register}
          />
          <Button variant="primary">Send Invitations</Button>
        </form>
      </VStack>
      <VStack>
        <Text fontSize="xl" fontWeight="600" width="100%">
          Share the referral link or Referral code
        </Text>
        <Text
          fontWeight="400"
          fontSize="md"
          color={colors.black_1}
          width="100%"
        >
          You can also share your personal referral link by copying and sending
          it or sharing it on your social media
        </Text>
        <HStack width="100%" gap={4}>
          <Text background={colors.light_bg} width="100%" p={2}>
            www.soaltee.com/?invite/24123214
          </Text>
          <Button variant="primary">Copy Link</Button>
        </HStack>
        <Text fontWeight="600">OR</Text>
        <HStack width="100%" gap={4}>
          <Text
            background={colors.light_bg}
            width="100%"
            p={2}
            textAlign="center"
          >
            AF92023123
          </Text>
          <Button variant="primary">Copy Code</Button>
        </HStack>
      </VStack>
    </Stack>
  );
};
