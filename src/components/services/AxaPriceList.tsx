import { Box, Text, Grid, Flex, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { axaPricing } from "@/static/data";
import { Dialog } from "@radix-ui/themes";
import PriceCard from "./price-card";

export default function AxaPriceList() {
  return (
    <Box className="space-y-4">
      <Grid className="grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 gap-y-4">
        {axaPricing.map((item) => (
          //   <Link to={item.link} key={item.id}>
          <Dialog.Root>
            <Dialog.Trigger>
              <Box className="h-40 relative group rounded-lg cursor-pointer overflow-hidden">
                <img
                  src={item.image}
                  alt="Category Image"
                  className="w-full h-full group-hover:scale-105 duration-75 transition-all object-cover rounded-lg"
                />
                <Box className="absolute bg-black/50  duration-100 transition-all group-hover:bg-black/80 inset-0 rounded-lg">
                  <Flex
                    align={"center"}
                    direction={"column"}
                    gap={"2"}
                    justify={"center"}
                    height={"100%"}
                  >
                    <Text className="text-lg text-center text-white">
                      {item.name}
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Dialog.Trigger>

            <Dialog.Content>
              <PriceCard />

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
          //   </Link>
        ))}
      </Grid>
    </Box>
  );
}
