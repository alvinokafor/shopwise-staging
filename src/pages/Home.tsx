import { Box, Heading, Flex, Button } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container } from "../partials";
import { ProtectedRoute } from "@/utils";
import { FeaturedStores, PreMadeBaskets } from "@/components/shopping";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <Container>
          <Box className="pt-24 space-y-12">
            {/* {user && <Wallet />} */}
            <Box className="space-y-4">
              {/* <Heading>Categories</Heading> */}

              {/* <Flex direction={"column"} gap={"4"}>
                <ServiceList />
              </Flex> */}

              {/* <Tabs.Root defaultValue="bill-payments">
                <Tabs.List>
                  <Tabs.Trigger value="shopping">Shopping</Tabs.Trigger>
                  <Tabs.Trigger value="exports">Exports</Tabs.Trigger>
                  <Tabs.Trigger value="bill-payments">
                    Bill Payments
                  </Tabs.Trigger>
                  <Tabs.Trigger value="financial-services">
                    Financial Services
                  </Tabs.Trigger>
                </Tabs.List>

                <Box pt="3" pb="2">
                  <Tabs.Content value="shopping" className="space-y-3">
                    <ShoppingList />

                    <Box className="space-y-6">
                      <Flex align={"center"} justify={"between"}>
                        <Heading size={"4"}>Featured Stores</Heading>
                        <Link to={"/shopping"}>
                          <Button>See All Stores</Button>
                        </Link>
                      </Flex>

                      <SelectedStores />
                    </Box>
                  </Tabs.Content>

                  <Tabs.Content value="exports">
                    <Box className="space-y-6">
                      <Flex align={"center"} justify={"between"}>
                        <Heading size={"4"}>Export Stores</Heading>
                        <Link to={"/export"}>
                          <Button>See All Stores</Button>
                        </Link>
                      </Flex>

                      <Grid columns={"3"} gap={"4"}>
                        {stores.map((store) => (
                          <Card key={store.id} size="2">
                            <Link to={`/export/${store.id}`}>
                              <Inset clip="padding-box" side="top" pb="current">
                                <img
                                  src={store.storeImage}
                                  className="block object-cover cursor-pointer w-full h-40 bg-gray-50"
                                />
                              </Inset>
                            </Link>
                            <Box className="space-y-2">
                              <Heading size="3">{store.storeName}</Heading>
                              <Text className="text-slate-500">
                                {store.location}
                              </Text>
                            </Box>
                          </Card>
                        ))}
                      </Grid>
                    </Box>
                  </Tabs.Content>

                  <Tabs.Content value="bill-payments">
                    <BillPaymentList />
                  </Tabs.Content>

                  <Tabs.Content value="financial-services">
                    <FinancialServices />
                  </Tabs.Content>
                </Box>
              </Tabs.Root> */}
              <PreMadeBaskets />

              <Box className="space-y-4">
                <Flex align={"center"} justify={"between"}>
                  <Heading size={"4"}>Featured Stores</Heading>
                  <Link to={"/shopping"}>
                    <Button>See All Stores</Button>
                  </Link>
                </Flex>

                <FeaturedStores />
              </Box>
            </Box>
          </Box>
        </Container>
      </AppLayout>
    </ProtectedRoute>
  );
}
