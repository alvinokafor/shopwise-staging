import {
  Dialog,
  Box,
  Flex,
  Text,
  IconButton,
  Heading,
  Separator,
  Button,
} from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { AddToCart } from "..";
import { Link } from "react-router-dom";

export default function OrderDetails() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {/* <Text>View Selection</Text> */}
        <Button variant="ghost">View Selection</Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-lg space-y-4">
        <Flex align={"center"} justify={"between"} mb={"3"}>
          <Heading size={"4"}>Review Order</Heading>

          <IconButton variant="ghost">
            <Dialog.Close>
              <Cross1Icon />
            </Dialog.Close>
          </IconButton>
        </Flex>

        <Box className="space-y-4 mt-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <Box key={item}>
              <Flex align={"center"} justify={"between"}>
                <Flex direction={"column"} gap={"3"}>
                  <Text className="text-slate-600">Nestle Coffe</Text>
                  <Text className="text-slate-600">$3.00</Text>
                </Flex>

                <AddToCart />
              </Flex>
              <Separator my={"3"} size={"4"} />
            </Box>
          ))}

          <Flex align={"center"} justify={"between"}>
            <Text className="font-semibold">Total</Text>
            <Text className="font-semibold">$30.00</Text>
          </Flex>
        </Box>

        <Flex align={"center"} gap={"3"}>
          <Link to={"/checkout"}>
            <Button>Proceed to Checkout</Button>
          </Link>
          <Button color="red" variant="surface">
            Clear Selection
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
