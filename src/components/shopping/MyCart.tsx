import { Box, Text } from "@radix-ui/themes";
import { CartCard } from ".";
import { useContext } from "react";
import { ShopContext } from "@/contexts/ShopContext";
import { Product } from "@/lib/types/Stores";
import { StoreAdapter, useStoreQuery } from "@/adapters/StoreAdapter";
import { queryKeys } from "@/lib/constants";
import { ICart } from "@/lib/types/Stores";
import { LoadingIndicator } from "@/assets/icons";

export default function MyCart() {
  //@ts-expect-error no types found
  const { orders } = useContext(ShopContext);
  const { data, isLoading } = useStoreQuery<ICart>(
    StoreAdapter.getCart,
    [queryKeys.CART],
    ""
  );

  return (
    <>
      {!isLoading ? (
        <Box>
          {data?.cart.products.length !== 0 ? (
            data?.cart.products.map((product: Product) => (
              <CartCard key={product.name} product={product} />
            ))
          ) : (
            <Text size="2">You have no items in your cart.</Text>
          )}
          {/* {orders.length !== 0 ? (
        orders.map((product: Product) => (
          <CartCard key={product.name} product={product} />
        ))
      ) : (
        <Text size="2">You have no items in your cart.</Text>
      )} */}
        </Box>
      ) : (
        <Box className="w-max mx-auto">
          <LoadingIndicator color="#3B9EFF" />
        </Box>
      )}
    </>
  );
}
