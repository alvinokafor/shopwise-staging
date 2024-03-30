import { Box, Flex, Heading, Grid, Card, Inset, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { Shopping as ShoppingIcon } from "@/assets/icons";
import { Location, Search } from "@/components/shopping";
import { stores } from "@/static/data";

export default function Exports() {
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
                <ShoppingIcon />
                <Heading>Exports</Heading>
              </Flex>

              <Flex align={"center"} gap={"3"}>
                <Search />
                <Location />
              </Flex>
            </Flex>
          </Box>

          <Grid columns={"3"} gap={"4"}>
            {stores.map((store) => (
              <Card key={store.id} size="2">
                <Link to={`/export/${store.id}`}>
                  <Inset clip="padding-box" side="top" pb="current">
                    <img
                      src={store.storeImage}
                      className="block object-cover cursor-pointer w-full h-40 bg-gray-50"
                    />
                  </Inset>
                </Link>
                <Box className="space-y-2">
                  <Heading size="3">{store.storeName}</Heading>
                  <Text className="text-slate-500">{store.location}</Text>
                </Box>
              </Card>
            ))}
          </Grid>
        </Box>
      </Container>
    </AppLayout>
  );
}
