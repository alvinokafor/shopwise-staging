import { useState } from "react";
import { Flex, Text, IconButton } from "@radix-ui/themes";
import { PlusCircledIcon, MinusCircledIcon } from "@radix-ui/react-icons";

export default function AddToCart() {
  const [productCount, setProductCount] = useState(0);

  return (
    <Flex align={"center"} gap={"3"}>
      <IconButton
        variant="ghost"
        onClick={() => {
          if (productCount === 0) return;
          setProductCount((prev) => prev - 1);
        }}
      >
        <MinusCircledIcon width={24} height={24} />
      </IconButton>

      <Text>{productCount}</Text>

      <IconButton
        variant="ghost"
        onClick={() => setProductCount((prev) => prev + 1)}
      >
        <PlusCircledIcon width={24} height={24} />
      </IconButton>
    </Flex>
  );
}
