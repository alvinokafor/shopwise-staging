import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { CartCard } from "@/components/shopping";
import { Link } from "react-router-dom";
// import { products } from "@/static/data";
import { useContext } from "react";
import { ShopContext } from "@/contexts/ShopContext";
import { Product } from "@/lib/types/Stores";

export default function SavedItems() {
  //@ts-expect-error no types found
  const { orders } = useContext(ShopContext);
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-6">
          <Box className="space-y-6">
            <BackButton />

            <Flex align={"center"} justify={"between"}>
              <Flex align={"center"} gap={"4"}>
                <BookmarkIcon width={24} height={24} />
                <Heading>Saved Items</Heading>
              </Flex>

              <Link to={`/shopping`}>
                <Button>Add Items</Button>
              </Link>
            </Flex>

            <Box className="space-y-2">
              {/* {products.map((product) => {
                if (cartItems[product.id] !== 0) {
                  return <CartCard key={product.id} product={product} />;
                }
              })} */}
              {orders.map((product: Product) => (
                <CartCard key={product.name} product={product} />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </AppLayout>
  );
}
