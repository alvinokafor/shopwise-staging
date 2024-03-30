import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Select,
  Grid,
  Switch,
} from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { useParams } from "react-router-dom";
import { InsurancePlanCard } from "@/components/shopping";
import { CartCard } from "@/components/shopping";
import { useContext, useState } from "react";
import { ShopContext } from "@/contexts/ShopContext";
import { Product } from "@/lib/types/Stores";
import {
  useStoreMutation,
  StoreAdapter,
  useStoreQuery,
} from "@/adapters/StoreAdapter";
import { toast } from "sonner";
import { LoadingIndicator } from "@/assets/icons";
import { useNavigate } from "react-router-dom";
import { UserContext, IUserContext } from "@/contexts/UserContext";
import { useWalletQuery, WalletAdapter } from "@/adapters/WalletAdapter";
import { queryKeys } from "@/lib/constants";
import { getFormattedAmount } from "@/utils";
// import CurrencyAPI from "@everapi/currencyapi-js";
import { ICart } from "@/lib/types/Stores";
import { useQueryClient } from "@tanstack/react-query";

export default function InsuranceCheckOut() {
  const { id } = useParams();

  if (!id) return null;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  // const [exchangeRate, setExchangeRate] = useState(0);

  const { setRedirectUrl } = useContext(UserContext) as IUserContext;

  //@ts-expect-error no types found
  const { cartItems, getTotalCartAmount, orders } = useContext(ShopContext);
  const clearCartMutation = useStoreMutation(StoreAdapter.clearCart, "");

  const cart = useStoreQuery<ICart>(StoreAdapter.getCart, [queryKeys.CART], "");

  // if (!cart) return null;

  const orderItems = cart?.data?.cart.products.map((product) => {
    const {
      imgUrl,
      createdAt,
      description,
      quantity,
      updatedAt,
      id,
      _id,
      ...rest
    } = product;
    const cartProduct = { ...rest, productId: id };
    return cartProduct;
  });

  const storeQuery = useStoreQuery(StoreAdapter.getStore, ["STORE", id], id);

  const productsQuery = useStoreQuery(
    StoreAdapter.getProductsFromStore,
    ["ALL_PRODUCTS", id],
    id
  );

  const walletCheckout = useStoreMutation(StoreAdapter.checkOutWithWallet, "");
  const cardCheckOut = useStoreMutation(StoreAdapter.checkOutWithCard, "");

  const { data } = useWalletQuery(
    WalletAdapter.getWalletBalance,
    [queryKeys.WALLET_BALANCE],
    ""
  );

  const wallet = data?.data.wallet;

  const totalAmount: number | undefined = cart?.data?.cart.products?.reduce(
    (accumulator: number, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    },
    0
  );

  const handleWalletCheckout = async () => {
    try {
      await walletCheckout.mutateAsync({ orders });
      toast.success("Your Order Has Been Placed");
      navigate(`/order-success`);
      await clearCartMutation.mutateAsync({});
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardCheckOut = async () => {
    try {
      const res = await cardCheckOut.mutateAsync({ orders: orderItems });
      setRedirectUrl(res?.data.data.redirectUrl);
      navigate(`/proceed-to-gateway?amount=${totalAmount}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "wallet") {
      handleWalletCheckout();
    } else {
      handleCardCheckOut();
    }
  };

  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-6">
          <Box className="space-y-6">
            <BackButton />

            <img
              src={
                "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
              }
              className="block object-cover cursor-pointer w-full h-40 bg-gray-50"
            />

            <Flex
              className="flex-col md:flex-row md:items-center gap-4"
              justify={"between"}
            >
              <Flex align={"center"} gap={"4"}>
                <Heading>{storeQuery.data?.data.name}</Heading>
              </Flex>
            </Flex>
          </Box>

          <Box>
            <Box className="space-y-6 mt-4">
              <Grid className="md:grid-cols-3" gap={"4"}>
                {productsQuery.data?.data.data?.map((product) => (
                  <InsurancePlanCard product={product} key={product.name} />
                ))}
              </Grid>
              <Box className="space-y-2">
                <Heading size={"3"}>Selected Plans</Heading>
                {cart?.data?.cart.products.length !== 0 ? (
                  cart?.data?.cart.products.map((product: Product) => (
                    <CartCard key={product.name} product={product} />
                  ))
                ) : (
                  <Text>No plan has been selected</Text>
                )}
              </Box>
            </Box>

            <Flex align={"center"} justify={"between"} mt={"4"}>
              <Text className="font-semibold">Set as Recurring Payment</Text>

              <Switch />
            </Flex>
          </Box>

          <Box className="space-y-2 mt-4">
            <Heading size={"3"}>Payment Method</Heading>

            <Box className="space-y-4 mt-4">
              {/* <Flex align={"center"} justify={"between"}>
                  <Text className="text-slate-600">Current Exchange Rate</Text>
                  <Text className="text-slate-600">
                    {getFormattedAmount(exchangeRate, "NGN")} to $ 1.00
                  </Text>
                </Flex> */}

              <Flex align={"center"} justify={"between"}>
                <Text className="text-slate-600">Subtotal</Text>
                <Text className="text-slate-600">
                  {getFormattedAmount(Number(totalAmount), "NGN")}
                </Text>
              </Flex>

              <Flex align={"center"} justify={"between"}>
                <Text className="font-medium">Total</Text>

                <Text className="font-medium">
                  {getFormattedAmount(Number(totalAmount), "NGN")}
                </Text>
              </Flex>
            </Box>

            <Box className="space-y-2 mt-4">
              <Heading size={"3"}>Payment Method</Heading>

              <Select.Root
                onValueChange={(value: string) => setPaymentMethod(value)}
                size={"3"}
                defaultValue={"wallet"}
              >
                <Select.Trigger
                  className="w-full"
                  placeholder="Select a Payment Method"
                />
                <Select.Content>
                  <Select.Item value="wallet">
                    Wallet -{" "}
                    {getFormattedAmount(wallet?.balance!, wallet?.currency!)}
                  </Select.Item>
                  <Select.Item value="gateway">
                    Pay Online Via a Secure Gateway
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>
          </Box>

          <Button onClick={handlePlaceOrder} size={"3"} className="w-full">
            {cardCheckOut.isPending || walletCheckout.isPending ? (
              <LoadingIndicator />
            ) : (
              "Place Order"
            )}
          </Button>
        </Box>
      </Container>
    </AppLayout>
  );
}
