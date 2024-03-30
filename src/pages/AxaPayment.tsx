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
  Switch,
  HoverCard,
} from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { BackButton } from "../partials";
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
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

// interface FXRate {
//   data: {
//     NGN: {
//       code: string;
//       value: number;
//     };
//   };
// }

export default function AxaPayment() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  // const [exchangeRate, setExchangeRate] = useState(0);

  const { setRedirectUrl } = useContext(UserContext) as IUserContext;
  const [deliveryType, setDeliveryType] = useState("myself");
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
      <section className="mx-auto px-6 sm:max-w-2xl md:max-w-4xl  lg:px-8">
        <Box className="pt-24 space-y-6">
          <Grid columns={"6"} gap={"8"}>
            <Box className="col-span-4">
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
              <Separator my={"2"} size={"4"} />

              <Box className="space-y-4 mt-4">
                <Heading size={"3"}>Axa Mansard Bronze Package</Heading>
              </Box>

              <Box className="space-y-2 mt-4">
                <Heading size={"3"}>Customer Information</Heading>

                <RadioGroup.Root
                  defaultValue="myself"
                  onValueChange={(value: string) => setDeliveryType(value)}
                  size={"3"}
                >
                  <label className="font-semibold text-sm pb-3">
                    Who are you buying this plan for?
                  </label>
                  <Flex gap="2" align={"center"}>
                    <Text as="label" size="3">
                      <Flex gap="2">
                        <RadioGroup.Item value="myself" /> Myself
                      </Flex>
                    </Text>
                    <Text as="label" size="3">
                      <Flex gap="2">
                        <RadioGroup.Item value="someone-else" /> Someone Else
                      </Flex>
                    </Text>
                    <Text as="label" size="3">
                      <Flex gap="2">
                        <RadioGroup.Item value="family" /> Family/Group
                      </Flex>
                    </Text>
                  </Flex>
                </RadioGroup.Root>

                {deliveryType === "myself" && (
                  <Flex direction={"column"} pt={"4"} gap={"4"}>
                    <Grid columns={"2"} gap={"4"}>
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
                        <label className="font-semibold text-sm">
                          Genotype
                        </label>
                        <Select.Root size={"2"}>
                          <Select.Trigger placeholder="Select Genotype" />
                          <Select.Content>
                            <Select.Item value="AA">AA</Select.Item>
                            <Select.Item value="AB">AB</Select.Item>
                            <Select.Item value="AS">AS</Select.Item>
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

                      {/* <Flex direction={"column"} gap={"2"}>
                        <label className="font-semibold text-sm">
                          Delivery Address
                        </label>
                        <TextField.Input placeholder="Enter Address" />
                      </Flex> */}

                      <Flex direction={"column"} gap={"2"}>
                        <label className="font-semibold text-sm">
                          Prefered Hospital Location
                        </label>
                        <Select.Root size={"2"}>
                          <Select.Trigger placeholder="Select Hospital Location" />
                          <Select.Content>
                            <Select.Item value="lagos">Lagos</Select.Item>
                            <Select.Item value="abuja">Abuja</Select.Item>
                            <Select.Item value="enugu">Enugu</Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Flex>

                      <Flex direction={"column"} gap={"2"}>
                        <label className="font-semibold text-sm">
                          Prefered Hospital{" "}
                        </label>
                        <Select.Root size={"2"}>
                          <Select.Trigger placeholder="Select Hospital" />
                          <Select.Content>
                            <Select.Item value="lagos">UNTH</Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Flex>
                    </Grid>
                  </Flex>
                )}

                {deliveryType === "someone-else" && (
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
                            <Select.Item value="enugu">
                              United States
                            </Select.Item>
                            <Select.Item value="lagos">Canada</Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Flex>

                      <Flex direction={"column"} gap={"2"}>
                        <label className="font-semibold text-sm">City</label>
                        <Select.Root size={"2"}>
                          <Select.Trigger placeholder="Select Region" />
                          <Select.Content>
                            <Select.Item value="new-layout">
                              California
                            </Select.Item>
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
                )}
              </Box>
            </Box>

            <Box className="space-y-3 col-span-2">
              <Box className="space-y-2 mt-4">
                <Box className="space-y-4 mt-4">
                  <Heading size={"3"}>Selected Plan Details</Heading>

                  <Flex align={"center"} justify={"between"}>
                    <Text className="text-slate-600">Plan Name</Text>
                    <Text className="text-slate-600">Bronze</Text>
                  </Flex>

                  <Flex align={"center"} justify={"between"}>
                    <Text className="text-slate-600">Subtotal</Text>
                    <Text className="text-slate-600">
                      {getFormattedAmount(Number(58000), "NGN")}
                    </Text>
                  </Flex>

                  <Flex align={"center"} justify={"between"}>
                    <Flex align={"center"}>
                      <Text className="text-slate-600">Fees</Text>
                      <HoverCard.Root>
                        <HoverCard.Trigger>
                          <QuestionMarkCircledIcon />
                        </HoverCard.Trigger>
                        <HoverCard.Content>
                          <Box>
                            <Heading size="3" as="h3">
                              Fees we Charge
                            </Heading>

                            <Text
                              as="div"
                              size="2"
                              style={{ maxWidth: 300 }}
                              mt="3"
                            >
                              These Fees help us run our platform, operations,
                              and support teams. It is a flat fee of N1,000.00
                            </Text>
                          </Box>
                        </HoverCard.Content>
                      </HoverCard.Root>
                    </Flex>

                    <Text className="text-slate-600">NGN 1,000.00</Text>
                  </Flex>

                  <Flex align={"center"} justify={"between"}>
                    <Text className="font-medium">Total</Text>

                    <Text className="font-medium">
                      {getFormattedAmount(Number(totalAmount), "NGN")}
                    </Text>
                  </Flex>

                  <Flex align={"center"} justify={"between"} mt={"4"}>
                    <Text className="font-medium">
                      Set as Recurring Payment
                    </Text>

                    <Switch />
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

              <Button onClick={handlePlaceOrder} size={"3"} className="w-full">
                {cardCheckOut.isPending || walletCheckout.isPending ? (
                  <LoadingIndicator />
                ) : (
                  "Place Order"
                )}
              </Button>
            </Box>
          </Grid>
        </Box>
      </section>
    </AppLayout>
  );
}
