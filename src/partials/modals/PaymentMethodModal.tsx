import { useState } from "react";
import { Dialog, Button, Flex, Heading, IconButton } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { PaymentMethod } from "@/components/shopping";
import { useWalletQuery, WalletAdapter } from "@/adapters/WalletAdapter";
import { queryKeys } from "@/lib/constants";

const methods = [
  {
    name: "Wallet",
    tag: "wallet",
    info: "$20.00",
  },
  {
    name: "Pay Online",
    tag: "gateway",
    info: "You will be redirected to pay via a third party payment gateway ",
  },
];

export default function PaymentMethodModal() {
  const [paymentMethod, setPaymentMethod] = useState(methods[0]);

  const { data, isLoading } = useWalletQuery(
    WalletAdapter.getWalletBalance,
    [queryKeys.WALLET_BALANCE],
    ""
  );

  const wallet = data?.data.wallet;
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="mt-4">Subscribe</Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-lg space-y-4">
        <Flex align={"center"} justify={"between"} mb={"3"}>
          <Heading size={"4"}>Payment Method</Heading>

          <IconButton variant="ghost">
            <Dialog.Close>
              <Cross1Icon />
            </Dialog.Close>
          </IconButton>
        </Flex>

        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        <Flex align={"center"} gap={"3"}>
          <Button className="mt-4">Continue</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
