import {
  Dialog,
  Button,
  Flex,
  Heading,
  IconButton,
  TextField,
  Text,
} from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { Cross1Icon, ChevronRightIcon } from "@radix-ui/react-icons";
import { WalletAdapter, useWalletMutation } from "@/adapters/WalletAdapter";
import { useState, useContext } from "react";
import { LoadingIndicator } from "@/assets/icons";
import { UserContext, IUserContext } from "@/contexts/UserContext";

export default function AddFundsModal() {
  const navigate = useNavigate();

  const { setRedirectUrl } = useContext(UserContext) as IUserContext;
  const [amount, setAmount] = useState("");
  const { mutateAsync, isPending } = useWalletMutation(
    WalletAdapter.fundWallet,
    ""
  );

  const handleFundWallet = async () => {
    try {
      const res = await mutateAsync({
        amount: amount,
        redirectUrl: "/fund-wallet/confirmation",
      });
      setRedirectUrl(res?.data.data.redirectUrl);
      navigate(`/confirm-wallet-fund?amount=${amount}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton variant="ghost">
          <ChevronRightIcon width={32} height={32} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-lg space-y-4">
        <Flex align={"center"} justify={"between"} mb={"3"}>
          <Heading size={"4"}>Fund Your Wallet</Heading>

          <IconButton variant="ghost">
            <Dialog.Close>
              <Cross1Icon />
            </Dialog.Close>
          </IconButton>
        </Flex>

        <Flex direction={"column"} gap={"2"}>
          <label className="font-semibold">Enter Amount</label>
          <TextField.Root>
            <TextField.Slot>
              <Text>N</Text>
            </TextField.Slot>
            <TextField.Input
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter the amount you want to fund…"
            />
          </TextField.Root>
        </Flex>
        <Flex align={"center"} gap={"3"}>
          <Button
            disabled={isPending}
            onClick={handleFundWallet}
            className="mt-4"
          >
            {isPending ? <LoadingIndicator /> : "Continue"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
