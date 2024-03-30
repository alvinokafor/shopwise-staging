import {
  Box,
  Flex,
  Heading,
  TextField,
  Grid,
  Select,
  Text,
  Card,
} from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { Electricity as ElectricityIcon } from "@/assets/icons";
import { PaymentMethodModal } from "@/partials/modals";

export default function Electricity() {
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <Flex align={"center"} gap={"4"}>
              <ElectricityIcon />
              <Heading>Buy Electricity</Heading>
            </Flex>
          </Box>

          <Grid columns={"2"} gap={"4"}>
            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Distribution Company</label>
              <Select.Root size={"2"} defaultValue="eedc">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="eedc">
                    Enugu Electrical Distribution Company
                  </Select.Item>
                  <Select.Item value="ibedc">
                    Ibadan Electricity Distribution Company
                  </Select.Item>
                  <Select.Item value="bedc">
                    Benin Electric Distribution Company
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Meter/Account Number</label>
              <TextField.Input placeholder="Enter meter number" />
            </Flex>
          </Grid>

          <Flex direction={"column"} gap={"4"}>
            <Card variant="classic">
              <Text as="div" size="2" weight="bold">
                Emeka Nkwo
              </Text>
              <Text as="div" color="gray" size="2">
                Address: Kudirat Salami Street Agungi Ajiran
              </Text>
              <Text as="div" color="gray" size="2">
                Meter Type: Prepaid
              </Text>
              <Text as="div" color="gray" size="2">
                Meter Number: 100288999007
              </Text>
            </Card>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Amount</label>
              <TextField.Root>
                <TextField.Slot>
                  <Text>N</Text>
                </TextField.Slot>
                <TextField.Input placeholder="Enter the amount you want to purchase…" />
              </TextField.Root>
            </Flex>
          </Flex>
        </Box>

        <PaymentMethodModal />
      </Container>
    </AppLayout>
  );
}
