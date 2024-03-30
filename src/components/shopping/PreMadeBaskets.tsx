import { Box, Button, Flex, Grid, Heading } from "@radix-ui/themes";
import { StoreAdapter, useStoreQuery } from "@/adapters/StoreAdapter";
import { StoreProductCard } from ".";

export default function PreMadeBaskets({ title = "Premade Baskets" }) {
  const { data } = useStoreQuery(
    StoreAdapter.getProductsFromStore,
    ["premade-baskets"],
    "65f454c6c348f2a021f0a876"
  );

  console.log(data);
  return (
    <Box className="space-y-6">
      <Flex align={"center"} justify={"between"}>
        <Heading size={"4"}>{title}</Heading>

        <Button variant="ghost">See All</Button>
      </Flex>

      <Grid className="md:grid-cols-3" gap={"4"}>
        {data?.data.data?.map((product) => (
          <StoreProductCard product={product} key={product.name} />
        ))}
      </Grid>
    </Box>
  );
}
