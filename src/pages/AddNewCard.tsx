import { useContext } from "react";
import { Box, Flex, Heading, Card, Text, Button } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { useSearchParams } from "react-router-dom";
import { UserContext, IUserContext } from "@/contexts/UserContext";

export default function AddNewCard() {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");

  const { redirectUrl } = useContext(UserContext) as IUserContext;
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-6">
          <Box className="space-y-6">
            <BackButton />
            <Flex direction={"column"}>
              <Heading>Fund Confirmation</Heading>
              <Text color="gray" size="2">
                You will be redirected to a secure payment gateway where you
                will be able to fund your account.
              </Text>
            </Flex>
          </Box>

          <Card variant="surface">
            <Box className="space-y-4">
              <Flex direction={"column"} gap={"3"}>
                <Flex direction={"column"} gap={"1"}>
                  <Heading size={"3"}>Amount</Heading>
                  <Text color="gray">NGN {amount}</Text>
                </Flex>
              </Flex>

              <Flex direction={"column"} gap={"3"}>
                <Flex direction={"column"} gap={"1"}>
                  <Heading size={"3"}>From</Heading>
                  <Text color="gray">Card</Text>
                </Flex>
              </Flex>

              {/* <Flex direction={"column"} gap={"3"}>
                <Flex direction={"column"} gap={"1"}>
                  <Heading size={"3"}>Payment Gateway Fee</Heading>
                  <Text color="gray">$1.00</Text>
                </Flex>
              </Flex> */}

              <a href={redirectUrl} className="block">
                <Button>Proceed</Button>
              </a>
            </Box>
          </Card>
        </Box>
      </Container>
    </AppLayout>
  );
}
