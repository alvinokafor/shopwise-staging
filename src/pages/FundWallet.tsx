import { Box, Flex, Heading, Card, Text } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { AddFundsModal } from "@/components/transactions/modals";

export default function FundWallet() {
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-6">
          <Box className="space-y-6">
            <BackButton />
            <Flex direction={"column"}>
              <Heading>Fund Wallet</Heading>
              <Text color="gray" size="2">
                You will be charged for adding money with a card.
              </Text>
            </Flex>
          </Box>

          <Card>
            <Flex align={"center"} justify={"between"}>
              <Flex align={"center"} gap={"4"}>
                <Flex direction={"column"} gap={"1"}>
                  <Heading size={"3"}>Card (Flutterwave)</Heading>
                  <Text color="gray">
                    Fund your wallet using your card on the flutterwave secure
                    gateway
                  </Text>
                </Flex>
              </Flex>

              <AddFundsModal />
            </Flex>
          </Card>

          <Card>
            <Flex align={"center"} justify={"between"}>
              <Flex align={"center"} gap={"4"}>
                <Flex direction={"column"} gap={"1"}>
                  <Heading size={"3"}>Giftcards</Heading>
                  <Text color="gray">Fund your wallet using giftcards</Text>
                </Flex>
              </Flex>

              <AddFundsModal />
            </Flex>
          </Card>
        </Box>
      </Container>
    </AppLayout>
  );
}
