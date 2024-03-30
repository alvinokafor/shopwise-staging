// eslint-disable-next-line no-unused-vars
import {
  Card,
  Box,
  Text,
  Heading,
  Inset,
  Flex,
  IconButton,
  Button,
  Dialog,
} from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useStoreMutation, StoreAdapter } from "@/adapters/StoreAdapter";
import { Product } from "@/lib/types/Stores";
import { queryKeys } from "@/lib/constants";
import { useState } from "react";
import { PlusCircledIcon, MinusCircledIcon } from "@radix-ui/react-icons";

export default function InsurancePlanCard({ product }: { product: Product }) {
  const queryClient = useQueryClient();
  const [itemQuantity, setItemQuantity] = useState(0);

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
    <Card size="2">
      <Dialog.Root>
        <Dialog.Trigger>
          <Inset clip="padding-box" side="top" pb="current">
            <img
              src={
                "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
              }
              className="block object-cover cursor-pointer w-full h-40 bg-gray-50"
            />
          </Inset>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 550 }}>
          <Dialog.Title>{product.name}</Dialog.Title>
          <Text className="text-lg text-slate-500 mb-2 font-medium">
            NGN {product.price}.00
          </Text>
          <Dialog.Description size="2" mb="4">
            <Text>{product?.description}</Text>
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
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

              <Text>{itemQuantity > 0 ? `${itemQuantity} person(s)` : 0}</Text>

              <IconButton
                variant="ghost"
                disabled={addToCart.isPending || removeFromCart.isPending}
                onClick={() => {
                  setItemQuantity(itemQuantity + 1);
                  handleAddToCart(product._id);
                }}
              >
                <PlusCircledIcon width={24} height={24} />
              </IconButton>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <Box className="space-y-2">
        <Heading size="3">{product.name}</Heading>
        <Text className="text-lg text-slate-500 font-medium">
          NGN {product.price}.00
        </Text>
        <Text className="line-clamp-5">{product?.description}</Text>
        {/* <Text as="p" className="text-sm text-slate-500 font-medium">
          1kg per Unit
        </Text> */}

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

          <Text>{itemQuantity > 0 ? `${itemQuantity} person(s)` : 0}</Text>

          <IconButton
            variant="ghost"
            disabled={addToCart.isPending || removeFromCart.isPending}
            onClick={() => {
              setItemQuantity(itemQuantity + 1);
              handleAddToCart(product._id);
            }}
          >
            <PlusCircledIcon width={24} height={24} />
          </IconButton>
        </Flex>
      </Box>
    </Card>
  );
}
