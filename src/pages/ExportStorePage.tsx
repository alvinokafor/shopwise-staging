import { Box, Flex, Heading } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { Search, StoreCategory } from "@/components/shopping";
import { Store } from "@/assets/icons";
import { useParams } from "react-router-dom";
import { stores } from "@/static/data";

export default function ExportStorePage() {
  const { id } = useParams();

  const storeDetails = stores.find((store) => store.id === Number(id));
  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <img
              src={storeDetails?.storeImage}
              className="block object-cover cursor-pointer w-full h-40 bg-gray-50"
            />

            <Flex
              className="flex-col md:flex-row md:items-center gap-4"
              justify={"between"}
            >
              <Flex align={"center"} gap={"4"}>
                <Store dimensions={"32"} />
                <Heading>{storeDetails?.storeName}</Heading>
              </Flex>

              <Flex align={"center"} gap={"3"}>
                <Search />
              </Flex>
            </Flex>
          </Box>

          <StoreCategory />
        </Box>
      </Container>
    </AppLayout>
  );
}
