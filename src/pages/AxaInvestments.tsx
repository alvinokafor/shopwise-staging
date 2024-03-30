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
import PriceCard from "@/components/services/price-card";
import AxaPriceList from "@/components/services/AxaPriceList";

export default function AxaInvestments() {
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <Flex align={"center"} gap={"4"}>
              <Box className="h-10 w-10 relative group rounded-lg cursor-pointer overflow-hidden">
                <img
                  src={
                    "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/LC7YJB5H6BEIPCLYPYHSFEPSUM.jpg"
                  }
                  className="w-full h-full group-hover:scale-105 duration-75 transition-all object-cover rounded-lg"
                />
              </Box>
              <Heading>
                <a href="https://www.axamansard.com/health/plans-details/">
                  Axa Mansard
                </a>
              </Heading>
            </Flex>
            <Heading size={"3"} weight={"medium"}>
              Axa Mansard helps you get health insurance for yourself and your
              family. Choose a package from the options below.
            </Heading>
          </Box>

          <AxaPriceList />

          {/* <Grid columns={"2"} gap={"2"}>
            <PriceCard />
            <PriceCard />
          </Grid> */}

          {/* <Grid columns={"2"} gap={"4"}>
            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Select Provider</label>
              <Select.Root size={"2"} defaultValue="axa-health">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="axa-health">Axa Health</Select.Item>
                  <Select.Item value="axa-motor">Axa Motor</Select.Item>
                  <Select.Item value="axa-travel">Axa Travel</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Select Product</label>
              <Select.Root size={"2"} defaultValue="hospicash-yearly">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="hospicash-yearly">
                    Hospicash Yearly (N4000.00)
                  </Select.Item>
                  <Select.Item value="hospicash-quaterly">
                    Hospicash Quaterly (N2000.00)
                  </Select.Item>
                  <Select.Item value="hospicash-monthly">
                    Hospicash Monthly (N1000.00)
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Gender</label>
              <Select.Root size={"2"} defaultValue="male">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="male">Male</Select.Item>
                  <Select.Item value="female">Female</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Date of Birth</label>
              <input
                className="border rounded-lg border-slate-200 p-0.5"
                type="date"
                name=""
                id=""
              />
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Address</label>
              <TextField.Input placeholder="Enter Residential Address" />
            </Flex>
          </Grid> */}
        </Box>

        {/* <PaymentMethodModal /> */}
      </Container>
    </AppLayout>
  );
}
