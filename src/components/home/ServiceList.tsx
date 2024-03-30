import { Box, Text, Grid, Flex } from "@radix-ui/themes";
import { categories } from "@/static/data";
import { Link } from "react-router-dom";

export default function ServiceList() {
  return (
    <Box className="space-y-4">
      <Grid className="grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link to={category.link} key={category.id}>
            <Box className="h-40 relative group rounded-lg cursor-pointer overflow-hidden">
              <img
                src={category.image}
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
                    {category.name}
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Link>
        ))}
      </Grid>
    </Box>
  );
}
