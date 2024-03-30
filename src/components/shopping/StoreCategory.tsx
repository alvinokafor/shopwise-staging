import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
// import { StoreProductCard } from ".";

// import { products } from "@/static/data";

export default function StoreCategory() {
  // const { data, isLoading } = useStoreQuery(
  //   StoreAdapter.getAllProducts,
  //   [queryKeys.ALL_PRODUCTS],
  //   ""
  // );
  // console.log(data);

  return (
    <Box className="space-y-6">
      <Flex align={"center"} justify={"between"}>
        <Heading size={"4"}>Products</Heading>

        {/* <Button variant="ghost">See All</Button> */}
      </Flex>

      <Grid className="md:grid-cols-3" gap={"4"}>
        {/* {products?.map((product) => (
          <StoreProductCard product={product} key={product.id} />
        ))} */}
      </Grid>
    </Box>
  );
}
