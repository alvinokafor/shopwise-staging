import {
  Dialog,
  Button,
  Flex,
  Heading,
  IconButton,
  TextField,
  Text,
  Grid,
  Box,
  Select,
  Badge,
} from "@radix-ui/themes";
import { Cross1Icon, ChevronRightIcon } from "@radix-ui/react-icons";
import { LoadingIndicator, Confirmation } from "@/assets/icons";
import { UserAdapter, useUserMutation } from "@/adapters/UsersAdapter";
import { useState } from "react";
import { WalletAdapter, useWalletMutation } from "@/adapters/WalletAdapter";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Wallet } from "@/lib/types/Transanctions";
import { queryKeys } from "@/lib/constants";
import { getFormattedAmount } from "@/utils";
import { toast } from "sonner";
import CurrencyInput from "react-currency-input-field";
import { TransferAdapter } from "@/adapters/TransferAdapter";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons";

export default function SendToWallet() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [formStep, setFormStep] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [currency, setCurrency] = useState("NGN");
  const { mutateAsync, isPending } = useUserMutation(UserAdapter.getUser, "");
  const queryClient = useQueryClient();

  const walletCache: Wallet | undefined = queryClient.getQueryData([
    queryKeys.WALLET_BALANCE,
  ]);

  const transferMutation = useWalletMutation(
    WalletAdapter.transferToWallet,
    ""
  );

  const exchangeRates = useQuery({
    queryKey: ["EXCHANGE_RATE", currency],
    queryFn: () => TransferAdapter.getConversionRate(currency),
  });

  const handleUserSearch = async () => {
    try {
      const res = await mutateAsync({ email });
      setUserDetails(res?.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransferToWallet = async () => {
    try {
      await transferMutation.mutateAsync({
        //@ts-expect-error no found types
        recipientId: userDetails.id,
        amount: amount,
      });
      toast.success("Transfer Successful");
      setOpenModal(false);
      queryClient.invalidateQueries({ queryKey: [queryKeys.WALLET_BALANCE] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger>
        <IconButton variant="ghost">
          <ChevronRightIcon width={32} height={32} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-lg space-y-4">
        {formStep === 1 && (
          <Box className="space-y-4">
            <Flex align={"center"} justify={"between"} mb={"3"}>
              <Heading size={"4"}>Send To Wallet</Heading>

              <IconButton variant="ghost">
                <Dialog.Close>
                  <Cross1Icon />
                </Dialog.Close>
              </IconButton>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Enter Reciever Email</label>

              <Grid className="grid-cols-4 gap-2">
                <TextField.Root className="col-span-3">
                  <TextField.Input
                    size={"3"}
                    placeholder="Enter Email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </TextField.Root>

                <Button
                  onClick={handleUserSearch}
                  size={"3"}
                  className="col-span-1"
                >
                  {isPending ? <LoadingIndicator /> : "Enter"}
                </Button>
              </Grid>

              {/* @ts-expect-error no found types */}
              <Text color="green">{userDetails.fullName}</Text>
            </Flex>

            <Grid columns={"2"} gap={"4"}>
              <Flex align={"center"} gap={"3"} justify={"between"}>
                <Flex direction={"column"} gap={"2"}>
                  <Text className="text-sm">From Currency</Text>

                  <Select.Root
                    required
                    onValueChange={(value: string) => setCurrency(value)}
                    size={"3"}
                  >
                    <Select.Trigger
                      className="min-w-full"
                      placeholder="Select A From Currency"
                    />
                    <Select.Content className="w-full" defaultValue={"NGN"}>
                      <Select.Item value="NGN">Nigerian Naira</Select.Item>
                      <Select.Item value="USD">
                        United States Dollars
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Flex>

                <Flex direction={"column"} gap={"2"}>
                  <Flex direction={"column"} gap={"2"}>
                    <Text className="text-sm">To Currency</Text>

                    <Select.Root required size={"3"}>
                      <Select.Trigger
                        className="w-full"
                        placeholder="Select A To Currency"
                      />
                      <Select.Content className="w-full" defaultValue={"NGN"}>
                        <Select.Item value="NGN">Nigerian Naira</Select.Item>
                        <Select.Item value="USD">
                          United States Dollars
                        </Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Flex>
                </Flex>
              </Flex>
            </Grid>

            {/* <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Select A Currency</label>
     
              <Select.Root
                required
                onValueChange={(value: string) => setCurrency(value)}
                size={"3"}
              >
                <Select.Trigger
                  className="w-full"
                  placeholder="Select A Currency"
                />
                <Select.Content defaultValue={"NGN"}>
                  <Select.Item value="NGN">Nigerian Naira</Select.Item>
                  <Select.Item value="USD">US Dollars</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex> */}

            <Box className="space-y-2">
              {/* <Heading size={"3"}>Current Exchange Rate</Heading> */}
              <Flex align={"center"} justify={"between"}>
                <Flex direction={"column"} gap={"1"}>
                  <Text className="font-medium">
                    United States Dollars (USD)
                  </Text>
                  <Text className="text-sm text-slate-500">
                    {getFormattedAmount(1, "USD")}
                  </Text>
                </Flex>

                <Flex direction={"column"} gap={"1"}>
                  <Text className="font-medium">Nigerian Naira (NGN)</Text>
                  <Text className="text-sm text-slate-500">
                    {getFormattedAmount(
                      exchangeRates.data?.conversion_rate!,
                      "NGN"
                    )}
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold">Enter Amount</label>

              <Flex align={"center"} justify={"between"}>
                <Flex direction={"column"} gap={"2"}>
                  <Flex align={"center"} gap={"2"}>
                    <Text className="text-sm">You Send</Text>

                    {/* <Badge>
                      <DoubleArrowUpIcon />
                      <Text>{getFormattedAmount(1, currency)}</Text>
                    </Badge> */}
                  </Flex>
                  <CurrencyInput
                    id="input-example"
                    name="input-name"
                    placeholder="Please enter an amount"
                    decimalsLimit={2}
                    onValueChange={(value, name, values) =>
                      setAmount(Number(value))
                    }
                    prefix={currency === "NGN" ? "₦" : "$"}
                    className="border border-slate-300 rounded-md px-2 py-2 text-sm font-normal"
                  />
                </Flex>

                <Flex direction={"column"} gap={"2"}>
                  <Flex align={"center"} gap={"2"}>
                    <Text className="text-sm">They Recieve</Text>

                    {/* <Badge>
                      <DoubleArrowDownIcon />
                      <Text>
                        {getFormattedAmount(
                          exchangeRates.data?.conversion_rate!,
                          "NGN"
                        )}
                      </Text>
                    </Badge> */}
                  </Flex>
                  <CurrencyInput
                    id="input-example"
                    name="input-name"
                    placeholder="Please enter an amount"
                    decimalsLimit={2}
                    // onValueChange={(value, name, values) =>
                    //   setAmount(Number(value))
                    // }
                    value={amount * exchangeRates.data?.conversion_rate!}
                    prefix={"₦"}
                    disabled
                    className="border border-slate-300 rounded-md px-2 py-2 text-sm font-normal"
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex align={"center"} gap={"3"}>
              <Button
                disabled={Object.keys(userDetails).length === 0}
                onClick={() => setFormStep(2)}
                className="mt-4"
              >
                Continue
              </Button>
            </Flex>
          </Box>
        )}

        {formStep === 2 && (
          <Box className="space-y-4">
            <Heading>Confirmation</Heading>
            <Box className="mx-auto w-max">
              <Confirmation />
            </Box>
            <Text className="text-center mx-auto" size={"4"}>
              You're about to send{" "}
              <span className="font-semibold">
                {getFormattedAmount(amount, "NGN")}
              </span>{" "}
              to {/* @ts-expect-error no found types */}
              <span className="font-semibold">{userDetails.fullName}</span> from
              your balance of {""}
              <span className="font-semibold">
                {" "}
                {getFormattedAmount(
                  //@ts-expect-error no types found
                  walletCache?.data.wallet.balance,
                  walletCache?.data.wallet.currency
                )}
              </span>
            </Text>
            <Flex align={"center"} gap={"3"}>
              <Dialog.Close>
                <Button variant="surface" onClick={handleTransferToWallet}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button onClick={handleTransferToWallet}>
                {transferMutation.isPending ? <LoadingIndicator /> : "Send"}
              </Button>
            </Flex>
          </Box>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
