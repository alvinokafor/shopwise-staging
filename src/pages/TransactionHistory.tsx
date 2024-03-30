import { Box, Flex, Heading } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { ReaderIcon } from "@radix-ui/react-icons";
import { Search } from "@/components/shopping";
import { RecentTransactions } from "@/components/home";

export default function TransactionHistory() {
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <Flex
              className="flex-col md:flex-row md:items-center gap-4"
              justify={"between"}
            >
              <Flex align={"center"} gap={"4"}>
                <ReaderIcon width={24} height={24} />
                <Heading>Transaction History</Heading>
              </Flex>

              <Flex align={"center"} gap={"3"}>
                <Search />
              </Flex>
            </Flex>

            <RecentTransactions />
          </Box>
        </Box>
      </Container>
    </AppLayout>
  );
}
