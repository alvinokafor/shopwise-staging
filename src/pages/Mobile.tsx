import { Box, Flex, Heading, Grid, Select, TextField } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { Mobile as MobileIcon } from "@/assets/icons";
import { PaymentMethodModal } from "@/partials/modals";

export default function Mobile() {
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <Flex align={"center"} gap={"4"}>
              <MobileIcon />
              <Heading>Buy Airtime</Heading>
            </Flex>
          </Box>

          <Grid columns={"2"} gap={"4"}>
            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Service Provider</label>
              <Select.Root size={"2"} defaultValue="mtn">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="mtn">MTN</Select.Item>
                  <Select.Item value="Airtel">Airtel</Select.Item>
                  <Select.Item value="Glo">Glo</Select.Item>
                  <Select.Item value="9Mobile">9Mobile</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Beneficiary Number</label>
              <Select.Root size={"2"} defaultValue="07065">
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Alvin Okafor</Select.Label>
                    <Select.Item value="07065">07065222633</Select.Item>
                  </Select.Group>
                  <Select.Separator />
                  <Select.Group>
                    <Select.Label>Emeka Nkwo</Select.Label>
                    <Select.Item value="07036">07036322953</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Amount</label>
              <TextField.Input placeholder="Enter airtime amount" />
            </Flex>
          </Grid>
        </Box>

        <PaymentMethodModal />
      </Container>
    </AppLayout>
  );
}
