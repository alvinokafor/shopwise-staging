import { useState } from "react";
import {
  Flex,
  Heading,
  Text,
  IconButton,
  Button,
  Select,
} from "@radix-ui/themes";
import {
  ReloadIcon,
  PlusCircledIcon,
  EyeOpenIcon,
  EyeNoneIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { WalletAdapter, useWalletQuery } from "@/adapters/WalletAdapter";
import { queryKeys } from "@/lib/constants";
import { getFormattedAmount } from "@/utils";
import Skeleton from "react-loading-skeleton";

export default function Wallet() {
  const [showBalance, setShowBalance] = useState(true);
  const [walletCurrrecy, setWalletCurrency] = useState("NGN");

  const { data, isLoading } = useWalletQuery(
    WalletAdapter.getWalletBalance,
    [queryKeys.WALLET_BALANCE],
    ""
  );

  const wallet = data?.data.wallet;

  return (
    <Flex className="justify-between flex-col md:flex-row gap-4">
      <Flex direction={"column"} gap={"2"}>
        <Flex gap={"3"} align={"center"}>
          <Select.Root
            size="1"
            defaultValue="NGN"
            onValueChange={(value: string) => setWalletCurrency(value)}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="NGN">Nigerian Naira</Select.Item>
              <Select.Item value="USD">United States Dollars</Select.Item>
            </Select.Content>
          </Select.Root>

          <IconButton
            variant="ghost"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <EyeOpenIcon /> : <EyeNoneIcon />}
          </IconButton>
        </Flex>

        {!isLoading ? (
          <Heading size={"8"}>
            {walletCurrrecy === "NGN"
              ? showBalance
                ? //@ts-expect-error no types found
                  getFormattedAmount(wallet?.balance, wallet?.currency)
                : "****"
              : "$0.00"}
          </Heading>
        ) : (
          <Skeleton width={150} height={25} />
        )}
        <Flex align={"center"} gap={"3"}>
          <Text className="text-slate-500 text-sm">Last Updated 5mins ago</Text>
          <IconButton variant="ghost">
            <ReloadIcon />
          </IconButton>
        </Flex>
      </Flex>

      <Flex direction={"column"} gap={"2"}>
        <Link to={"/fund-wallet"} className="block">
          <Button className="w-full">
            <PlusCircledIcon />
            Add Money
          </Button>
        </Link>
        <Link to={"/transaction-history"}>
          <Button>
            <ReaderIcon />
            Transaction History
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
