import { useContext } from "react";
import { Box, Flex, Heading, Card, Text, Button } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { useSearchParams } from "react-router-dom";
import { UserContext, IUserContext } from "@/contexts/UserContext";
import { ShopContext } from "@/contexts/ShopContext";
import { Product } from "@/lib/types/Stores";
import { CartCard } from "@/components/shopping";
import { useStoreQuery, StoreAdapter } from "@/adapters/StoreAdapter";
import { queryKeys } from "@/lib/constants";
import { ICart } from "@/lib/types/Stores";
import { getFormattedAmount } from "@/utils";

export default function GatewayPage() {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  //@ts-expect-error no types found
  const { orders } = useContext(ShopContext);
  const { redirectUrl } = useContext(UserContext) as IUserContext;

  const { data } = useStoreQuery<ICart>(
    StoreAdapter.getCart,
    [queryKeys.CART],
    ""
  );
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-6">
          <Box className="space-y-6">
            <BackButton />
            <Flex direction={"column"}>
              <Heading>Order Confirmation</Heading>
              <Text color="gray" size="2">
                You will be redirected to a secure payment gateway where you
                will be able to pay for your order.
              </Text>
            </Flex>
          </Box>

          <Card variant="surface">
            <Box className="space-y-4">
              {data?.cart.products.map((product: Product) => (
                <CartCard key={product.name} product={product} />
              ))}
              <Flex direction={"column"} gap={"3"}>
                <Flex direction={"column"} gap={"1"}>
                  <Heading size={"3"}>Amount</Heading>
                  <Text color="gray">
                    {getFormattedAmount(Number(amount), "NGN")}
                  </Text>
                </Flex>
              </Flex>

              {/* <Flex direction={"column"} gap={"3"}>
                <Flex direction={"column"} gap={"1"}>
                  <Heading size={"3"}>Payment Gateway Fee</Heading>
                  <Text color="gray">$1.00</Text>
                </Flex>
              </Flex> */}

              <a className="block" href={redirectUrl}>
                <Button>Proceed</Button>
              </a>
            </Box>
          </Card>
        </Box>
      </Container>
    </AppLayout>
  );
}
