import { Box, Flex, Heading } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { Shopping as ShoppingIcon } from "@/assets/icons";
import {
  Location,
  Search,
  // PreMadeBaskets,
  FeaturedStores,
} from "@/components/shopping";

export default function Shopping() {
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
                <Heading>Shopping</Heading>
              </Flex>

              <Flex align={"center"} gap={"3"}>
                <Search />
                <Location />
              </Flex>
            </Flex>
          </Box>
          {/* 
          <PreMadeBaskets /> */}
          <FeaturedStores />
        </Box>
      </Container>
    </AppLayout>
  );
}
