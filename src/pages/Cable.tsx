import { Box, Flex, Heading, Grid, Select, TextField } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { CableIcon } from "@/assets/icons";
import { PaymentMethodModal } from "@/partials/modals";

export default function Cable() {
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <Flex align={"center"} gap={"4"}>
              <CableIcon />
              <Heading>Buy a Cable Subscription</Heading>
            </Flex>
          </Box>

          <Grid columns={"2"} gap={"4"}>
            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Cable Provider</label>
              <Select.Root size={"2"} defaultValue="dstv">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="dstv">DSTV</Select.Item>
                  <Select.Item value="gotv">GOTV</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Packages</label>
              <Select.Root size={"2"} defaultValue="compact">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="compact">Compact for N12,500</Select.Item>
                  <Select.Item value="padi">Padi for N2,500</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Smartcard Number</label>
              <TextField.Input placeholder="Enter smartcard number" />
            </Flex>
          </Grid>
        </Box>

        <PaymentMethodModal />
      </Container>
    </AppLayout>
  );
}
