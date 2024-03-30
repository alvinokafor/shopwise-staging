import { Box, Flex, Heading, Grid, Text } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { Money } from "@/assets/icons";
import { Link } from "react-router-dom";
import { billPayments } from "@/static/data";

export default function BillPayments() {
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
                <Money />
                <Heading>Bill Payments</Heading>
              </Flex>
            </Flex>
          </Box>

          <Box className="space-y-4">
            <Grid className="grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-4">
              {billPayments.map((item) => (
                <Flex key={item.link} direction={"column"} gap={"2"}>
                  <Link to={item.link}>
                    <Box
                      className={`w-20 h-20 bg-slate-100 flex items-center justify-center rounded-lg bg-[${item.color}]`}
                    >
                      {item.icon}
                    </Box>
                  </Link>

                  <Text>{item.name}</Text>
                </Flex>
              ))}

              {/* <Flex direction={"column"} gap={"2"}>
          <FullServiceList />

          <Text>More</Text>
        </Flex> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </AppLayout>
  );
}
