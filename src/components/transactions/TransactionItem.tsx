import {
  Flex,
  Heading,
  IconButton,
  Text,
  Separator,
  Box,
} from "@radix-ui/themes";
import { Electricity } from "@/assets/icons";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { TransactionDetails } from "./modals";

export default function TransactionItem() {
  return (
    <Box>
      <Flex align={"center"} justify={"between"}>
        <Flex gap={"3"}>
          <Flex
            align={"center"}
            justify={"center"}
            className="w-14 h-14 bg-slate-100 rounded-md"
          >
            <Electricity width="32" height="32" />
          </Flex>

          <Flex direction={"column"} gap={"2"}>
            <Heading size={"3"}>Emeka Nkwo</Heading>
            <Text className="text-slate-400 text-sm">Wallet Transfer</Text>
            <Text className="text-slate-400">Mar 3rd, 2024 at 20:07:58</Text>
          </Flex>
        </Flex>

        <Flex align={"center"} gap={"6"}>
          <Heading size={"4"}> -$300</Heading>
          <TransactionDetails />
        </Flex>
      </Flex>
      <Separator my="4" size="4" />
    </Box>
  );
}
