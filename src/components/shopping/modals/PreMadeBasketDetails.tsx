import {
  Dialog,
  Box,
  Flex,
  Text,
  IconButton,
  Heading,
  Inset,
  Separator,
  Button,
} from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { AddToCart } from "..";

export default function PreMadeBasketDetails() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="cursor-pointer">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src="https://images.unsplash.com/photo-1538220856186-0be0e085984d?q=80&w=1363&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="block object-cover cursor-pointer w-full h-40 bg-gray-50"
          />
        </Inset>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-lg space-y-4">
        <Flex align={"center"} justify={"between"} mb={"3"}>
          <Heading size={"4"}>Breakfast Package</Heading>

          <IconButton variant="ghost">
            <Dialog.Close>
              <Cross1Icon />
            </Dialog.Close>
          </IconButton>
        </Flex>

        <img
          src="https://images.unsplash.com/photo-1538220856186-0be0e085984d?q=80&w=1363&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover cursor-pointer w-full h-40 rounded-md"
        />

        <Box className="space-y-4 mt-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <Box key={item}>
              <Flex align={"center"} justify={"between"}>
                <Text className="text-slate-600">Nestle Coffe 20g x2</Text>
                <Text className="text-slate-600">$3.00</Text>
              </Flex>
              <Separator my={"3"} size={"4"} />
            </Box>
          ))}

          <Flex align={"center"} justify={"between"}>
            <Text className="font-semibold">Total</Text>
            <Text className="font-semibold">$30.00</Text>
          </Flex>
        </Box>

        <Flex align={"center"} justify={"between"}>
          <AddToCart />

          <Button>Checkout</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
