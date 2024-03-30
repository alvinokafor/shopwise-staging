import { Box, Flex, Grid, Heading, Button } from "@radix-ui/themes";
import { StoreCard } from ".";
import { Link } from "react-router-dom";
import { useStoreQuery, StoreAdapter } from "@/adapters/StoreAdapter";
import { LoadingIndicator } from "@/assets/icons";

export default function FeaturedStores() {
  const { data, isLoading } = useStoreQuery(
    StoreAdapter.getAllStores,
    ["ALL_STORES"],
    ""
  );

  return (
    <Box className="space-y-6">
      {!isLoading ? (
        <Grid className="sm:grid-cols-2" gap={"4"}>
          {data?.data.data.map((store) => (
            <Link key={store._id} to={`/shopping/store?storeId=${store._id}`}>
              <StoreCard store={store} />
            </Link>
          ))}
        </Grid>
      ) : (
        <Box className="w-max mx-auto">
          <LoadingIndicator color="#3B9EFF" />
        </Box>
      )}
    </Box>
  );
}
