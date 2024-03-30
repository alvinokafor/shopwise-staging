import { Box, Flex, Heading, Grid } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import {
  Search,
  // PreMadeBaskets,
  // StoreCategory,
  StoreProductCard,
} from "@/components/shopping";
import { Store } from "@/assets/icons";
import { StoreAdapter, useStoreQuery } from "@/adapters/StoreAdapter";
import { useSearchParams } from "react-router-dom";

export default function StorePage() {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get("storeId");

  if (!storeId) return null;

  const storeQuery = useStoreQuery(
    StoreAdapter.getStore,
    ["STORE", storeId],
    storeId
  );

  const productsQuery = useStoreQuery(
    StoreAdapter.getProductsFromStore,
    ["ALL_PRODUCTS", storeId],
    storeId
  );

  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <img
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="block object-cover cursor-pointer w-full h-40 bg-gray-50"
            />

            <Flex
              className="flex-col md:flex-row md:items-center gap-4"
              justify={"between"}
            >
              <Flex align={"center"} gap={"4"}>
                <Store dimensions={"32"} />
                <Heading>{storeQuery.data?.data.name}</Heading>
              </Flex>

              <Flex align={"center"} gap={"3"}>
                <Search />
              </Flex>
            </Flex>
          </Box>

          {/* <PreMadeBaskets /> */}
          {/* <StoreCategory /> */}

          <Grid className="md:grid-cols-3" gap={"4"}>
            {productsQuery.data?.data.data?.map((product) => (
              <StoreProductCard product={product} key={product.name} />
            ))}
          </Grid>
        </Box>
      </Container>
    </AppLayout>
  );
}
