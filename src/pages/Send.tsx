import { Box, Flex, Heading, Card, Text } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  SendToWallet,
  SendToBankAccount,
} from "@/components/transactions/modals";

export default function Send() {
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <Flex align={"center"} gap={"4"}>
              <PaperPlaneIcon width={24} height={24} />
              <Heading>Send Funds</Heading>
            </Flex>
          </Box>

          <Box className="space-y-4">
            <Flex direction={"column"} gap={"4"} className="shadow-sm">
              <Card>
                <Flex align={"center"} justify={"between"}>
                  <Flex direction={"column"} gap={"1"}>
                    <Heading size={"3"}>Send to Wallet</Heading>
                    <Text color="gray">
                      Send to any diaspora account for free
                    </Text>
                  </Flex>

                  <SendToWallet />
                </Flex>
              </Card>
            </Flex>

            <Flex direction={"column"} gap={"4"} className="shadow-sm">
              <Card>
                <Flex align={"center"} justify={"between"}>
                  <Flex direction={"column"} gap={"1"}>
                    <Heading size={"3"}>Send to Bank Account</Heading>
                    <Text color="gray">
                      Send from your wallet to any Nigerian bank account
                    </Text>
                  </Flex>

                  <SendToBankAccount />
                </Flex>
              </Card>
            </Flex>
          </Box>
        </Box>
      </Container>
    </AppLayout>
  );
}
