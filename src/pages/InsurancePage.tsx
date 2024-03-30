import { Box, Flex, Heading, Grid, Card, Inset, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { Medical } from "@/assets/icons";
import { Search } from "@/components/shopping";
import { useStoreQuery, StoreAdapter } from "@/adapters/StoreAdapter";

export default function InsurancePage() {
  const { data } = useStoreQuery(StoreAdapter.getStores, ["STORES"], "");

  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <Flex
              className="flex-col md:flex-row md:items-center gap-4"
              justify={"between"}
            >
              <Flex align={"center"} gap={"4"}>
                <Medical />
                <Heading>Insurance</Heading>
              </Flex>

              <Flex align={"center"} gap={"3"}>
                <Search />
              </Flex>
            </Flex>

            <Grid columns={"2"} gap={"4"}>
              {data?.data.data.map((item) => (
                <Card key={item._id} size="2">
                  <Link to={`/insurance-services/${item._id}`}>
                    <Inset clip="padding-box" side="top" pb="current">
                      <img
                        src={
                          "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                        }
                        className="block object-cover cursor-pointer w-full h-40 bg-gray-50"
                      />
                    </Inset>
                  </Link>
                  <Box className="space-y-2">
                    <Heading size="3">{item.name}</Heading>
                    <Text className="text-slate-500">
                      Start's from NGN 3,800.00
                    </Text>
                  </Box>
                </Card>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </AppLayout>
  );
}
