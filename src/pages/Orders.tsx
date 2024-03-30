import { Box, Button, Flex, Heading, Tabs, Text } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { MyCart, OngoingOrderCard } from "@/components/shopping";
import { Link } from "react-router-dom";
import {
  StoreAdapter,
  useStoreQuery,
  useStoreMutation,
} from "@/adapters/StoreAdapter";
import { queryKeys } from "@/lib/constants";
import { IOngoingOrders } from "@/lib/types/Stores";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { LoadingIndicator } from "@/assets/icons";
import { useQueryClient } from "@tanstack/react-query";

export default function Orders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const { data } = useStoreQuery<IOngoingOrders[]>(
    StoreAdapter.getOngoingOrders,
    [queryKeys.ONGOING_ORDERS],
    ""
  );

  const { mutateAsync, isPending } = useStoreMutation(
    StoreAdapter.clearCart,
    ""
  );

  const handleClearCart = async () => {
    try {
      await mutateAsync({});
      toast.success("Your Cart Has Been Cleared");
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-6">
          <Box className="space-y-6">
            <BackButton />

            <Flex align={"center"} justify={"between"}>
              <Flex align={"center"} gap={"4"}>
                <ArchiveIcon width={24} height={24} />
                <Heading>Orders</Heading>
              </Flex>

              <Flex align={"center"} gap={"2"}>
                <Link to={`/checkout`}>
                  <Button variant="surface">Check Out</Button>
                </Link>
                <Button onClick={handleClearCart} variant="surface">
                  {isPending ? <LoadingIndicator /> : "Clear Cart"}
                </Button>
              </Flex>
            </Flex>
          </Box>

          <Tabs.Root defaultValue={!tab ? "cart" : tab}>
            <Tabs.List>
              <Tabs.Trigger value="cart">My Cart</Tabs.Trigger>
              <Tabs.Trigger value="ongoing">Ongoing</Tabs.Trigger>
              <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3" pb="2">
              <Tabs.Content value="cart">
                <MyCart />
              </Tabs.Content>

              <Tabs.Content value="ongoing">
                <Box className="space-y-4">
                  {data?.length !== 0 ? (
                    data?.map((order) => (
                      <OngoingOrderCard key={order._id.orderId} order={order} />
                    ))
                  ) : (
                    <Text size="2">You have no ongoing orders.</Text>
                  )}
                </Box>
              </Tabs.Content>

              <Tabs.Content value="completed">
                <Text size="2">You have no completed orders.</Text>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Box>
      </Container>
    </AppLayout>
  );
}
