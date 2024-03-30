import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Separator,
  TextArea,
  Select,
  Grid,
  TextField,
  Dialog,
  RadioGroup,
} from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
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

// interface FXRate {
//   data: {
//     NGN: {
//       code: string;
//       value: number;
//     };
//   };
// }

export default function ExportCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  // const [exchangeRate, setExchangeRate] = useState(0);

  const { setRedirectUrl } = useContext(UserContext) as IUserContext;
  const [deliveryType, setDeliveryType] = useState("export");
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

  // const currencyApi = new CurrencyAPI(
  //   "cur_live_ha47dYk1EZHRCekZPBkIqgu2LEhPqq3XCmidggUE"
  // );

  // currencyApi
  //   .latest({
  //     base_currency: "USD",
  //     currencies: "NGN",
  //   })
  //   .then((response: FXRate) => {
  //     setExchangeRate(response.data.NGN.value);
  //   });

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

            <Heading>Checkout ll</Heading>
          </Box>

          <Box>
            <Heading size={"4"}>Order Summary</Heading>
            <Separator my={"2"} size={"4"} />

            <Flex align={"center"} justify={"between"}>
              {/* <Flex direction={"column"} gap={"3"} pt={"4"}>
                <Heading size="3">Shoprite Circle Mall</Heading>

                <Flex align={"center"} gap={"3"}>
                  <Text color="gray" size="2">
                    3 items
                  </Text>

                  <Separator orientation="vertical" />

                  <Text color="gray" size="2">
                    $30
                  </Text>
                </Flex>
              </Flex> */}

              <Flex align={"center"} gap={"3"}>
                {/* <Button variant="surface">Clear Order</Button> */}

                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button variant="surface">Save as Basket</Button>
                  </Dialog.Trigger>

                  <Dialog.Content
                    className="space-y-4"
                    style={{ maxWidth: 450 }}
                  >
                    <Dialog.Title>Save To Basket</Dialog.Title>
                    <Flex direction={"column"} gap={"2"}>
                      <label className="font-semibold" htmlFor="basket-name">
                        Basket Name
                      </label>
                      <TextField.Input
                        size={"3"}
                        placeholder="Enter Basket Name"
                        type="email"
                      />
                    </Flex>
                    <Box className="space-y-2">
                      {/* {products.map((product) => {
                        if (cartItems[product.id] !== 0) {
                          return (
                            <CartCard key={product.id} product={product} />
                          );
                        }
                      })} */}

                      {cart?.data?.cart.products.map((product: Product) => (
                        <CartCard key={product.name} product={product} />
                      ))}
                    </Box>
                    <Flex gap="3" mt="4" justify="end">
                      <Dialog.Close>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button>Save</Button>
                      </Dialog.Close>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
              </Flex>
            </Flex>

            <Box className="space-y-4 mt-4">
              <Heading size={"3"}>Your Items</Heading>

              {/* <Box className="space-y-4 mt-4">
                {[1, 2, 3].map((item) => (
                  <Box key={item}>
                    <Flex align={"center"} justify={"between"}>
                      <Flex align={"center"} gap={"3"}>
                        <Text className="text-slate-600">Nestle Coffe</Text>
                        <Separator orientation="vertical" />
                        <Text className="text-slate-600">$3.00</Text>
                      </Flex>

                      <AddToCart />
                    </Flex>
                    <Separator my={"3"} size={"4"} />
                  </Box>
                ))}
              </Box> */}

              <Box>
                {/* {products.map((product) => {
                  if (cartItems[product.id] !== 0) {
                    return <CartCard key={product.id} product={product} />;
                  }
                })} */}
                {cart?.data?.cart.products.map((product: Product) => (
                  <CartCard key={product.name} product={product} />
                ))}
              </Box>
            </Box>

            <Box className="space-y-2 mt-4">
              <Heading size={"3"}>Delivery Information</Heading>

              {/* <RadioGroup.Root
                defaultValue="export"
                onValueChange={(value: string) => setDeliveryType(value)}
              >
                <label className="font-semibold text-sm">
                  Select Delivery Type
                </label>
                <Flex gap="2" direction="column">
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="export" /> Export
                    </Flex>
                  </Text>
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <RadioGroup.Item value="local" /> Local Delivery
                    </Flex>
                  </Text>
                </Flex>
              </RadioGroup.Root> */}

              {/* {deliveryType === "local" && (
                <Flex direction={"column"} gap={"4"}>
                  <Box className="space-y-2 mt-4">
                    <Heading size={"3"}>Vendor Instruction</Heading>
                    <TextArea />
                  </Box>

                  <Flex direction={"column"} gap={"2"}>
                    <label className="font-semibold text-sm">
                      Select From Beneficiary List
                    </label>
                    <Select.Root size={"2"}>
                      <Select.Trigger placeholder="Select a Beneficiary" />
                      <Select.Content>
                        <Select.Item value="alvin">Alvin Okafor</Select.Item>
                        <Select.Item value="emeka">Emeka Nkwo</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Flex>

                  <Grid columns={"2"} gap={"4"}>
                    <Flex direction={"column"} gap={"2"}>
                      <label className="font-semibold text-sm">Region</label>
                      <Select.Root size={"2"}>
                        <Select.Trigger placeholder="Select Region" />
                        <Select.Content>
                          <Select.Item value="enugu">Enugu</Select.Item>
                          <Select.Item value="lagos">Lagos</Select.Item>
                          <Select.Item value="Abuja">Abuja</Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Flex>

                    <Flex direction={"column"} gap={"2"}>
                      <label className="font-semibold text-sm">City</label>
                      <Select.Root size={"2"}>
                        <Select.Trigger placeholder="Select Region" />
                        <Select.Content>
                          <Select.Item value="new-layout">
                            Enugu - New Layout
                          </Select.Item>
                          <Select.Item value="gariki">
                            Enugu - Gariki
                          </Select.Item>
                          <Select.Item value="independence-layout">
                            Independence Layout
                          </Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Flex>

                    <Flex direction={"column"} gap={"2"}>
                      <label className="font-semibold text-sm">
                        Delivery Address
                      </label>
                      <TextField.Input placeholder="Enter Address" />
                    </Flex>

                    <Flex direction={"column"} gap={"2"}>
                      <label className="font-semibold text-sm">
                        Phone Number
                      </label>
                      <TextField.Input placeholder="Enter Number" />
                    </Flex>
                  </Grid>
                </Flex>
              )} */}

              <Flex direction={"column"} gap={"4"}>
                <Box className="space-y-2 mt-4">
                  <Heading size={"3"}>Packaging Instruction</Heading>
                  <TextArea />
                </Box>

                <Grid columns={"2"} gap={"4"}>
                  <Flex direction={"column"} gap={"2"}>
                    <label className="font-semibold text-sm">Country</label>
                    <Select.Root size={"2"}>
                      <Select.Trigger placeholder="Select Region" />
                      <Select.Content>
                        <Select.Item value="enugu">United States</Select.Item>
                        <Select.Item value="lagos">Canada</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Flex>

                  <Flex direction={"column"} gap={"2"}>
                    <label className="font-semibold text-sm">City</label>
                    <Select.Root size={"2"}>
                      <Select.Trigger placeholder="Select Region" />
                      <Select.Content>
                        <Select.Item value="new-layout">California</Select.Item>
                        <Select.Item value="gariki">Texas</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Flex>

                  <Flex direction={"column"} gap={"2"}>
                    <label className="font-semibold text-sm">
                      Delivery Address
                    </label>
                    <TextField.Input placeholder="Enter Address" />
                  </Flex>

                  <Flex direction={"column"} gap={"2"}>
                    <label className="font-semibold text-sm">
                      Phone Number
                    </label>
                    <TextField.Input placeholder="Enter Number" />
                  </Flex>
                </Grid>
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
