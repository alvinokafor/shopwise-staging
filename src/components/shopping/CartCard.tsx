import { useState } from "react";
import {
  Card,
  Text,
  Heading,
  Flex,
  Separator,
  IconButton,
} from "@radix-ui/themes";
import { PlusCircledIcon, MinusCircledIcon } from "@radix-ui/react-icons";
import { Product } from "@/lib/types/Stores";
import { StoreAdapter, useStoreMutation } from "@/adapters/StoreAdapter";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/constants";
import { getFormattedAmount } from "@/utils";

export default function CartCard({ product }: { product: Product }) {
  const queryClient = useQueryClient();
  const [itemQuantity, setItemQuantity] = useState(product.quantity);

  const addToCart = useStoreMutation(StoreAdapter.addToCart, "");
  const removeFromCart = useStoreMutation(StoreAdapter.removeFromCart, "");

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart.mutateAsync({ productId });
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await removeFromCart.mutateAsync({ productId });
      queryClient.invalidateQueries({ queryKey: [queryKeys.CART] });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card variant="classic">
      <Flex justify={"between"}>
        <Flex direction={"column"} gap={"3"}>
          <Heading size="4">{product.name}</Heading>

          <Flex align={"center"} gap={"3"}>
            <Text color="gray" size="2">
              {product.quantity} Items
            </Text>

            <Separator orientation="vertical" />

            <Text color="gray" size="2">
              {getFormattedAmount(product.price * product.quantity, "NGN")}
            </Text>
          </Flex>

          <Flex align={"center"} gap={"3"}>
            {/* <OrderDetails /> */}
            {/* <Link to={"/checkout"}>
              <Button>Check Out</Button>
            </Link> */}
          </Flex>
        </Flex>

        <Flex align={"center"} gap={"3"}>
          <IconButton
            variant="ghost"
            disabled={
              itemQuantity === 0 ||
              addToCart.isPending ||
              removeFromCart.isPending
            }
            onClick={() => {
              setItemQuantity(itemQuantity - 1);
              handleRemoveFromCart(product._id);
            }}
          >
            <MinusCircledIcon width={24} height={24} />
          </IconButton>

          <Text>{itemQuantity > 0 ? itemQuantity : 0}</Text>

          <IconButton
            variant="ghost"
            disabled={addToCart.isPending || removeFromCart.isPending}
            onClick={() => {
              setItemQuantity(itemQuantity + 1);
              handleAddToCart(product._id);
              // setOrders([cartProduct, ...orders]);
            }}
          >
            <PlusCircledIcon width={24} height={24} />
          </IconButton>
        </Flex>
      </Flex>
    </Card>
  );
}
