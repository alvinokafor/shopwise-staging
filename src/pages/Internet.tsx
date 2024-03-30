import { Box, Flex, Heading, Grid, Select } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { Internet as InternetIcon } from "@/assets/icons";
import { PaymentMethodModal } from "@/partials/modals";

export default function Internet() {
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <Flex align={"center"} gap={"4"}>
              <InternetIcon />
              <Heading>Buy Data</Heading>
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
              <label className="font-semibold">Data Amount</label>
              <Select.Root size={"2"} defaultValue="1gb">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="1gb">1GB</Select.Item>
                  <Select.Item value="2gb">2.5GB</Select.Item>
                  <Select.Item value="3gb">3GB</Select.Item>
                  <Select.Item value="5gb">5GB</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Grid>
        </Box>

        <PaymentMethodModal />
      </Container>
    </AppLayout>
  );
}
