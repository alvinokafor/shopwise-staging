import {
  Dialog,
  Box,
  Flex,
  Grid,
  Text,
  IconButton,
  Heading,
} from "@radix-ui/themes";
import { More } from "@/assets/icons";
import { serviceList } from "@/static/data";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function FullServiceList() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Box
          className={`w-20 cursor-pointer h-20 flex items-center justify-center rounded-lg bg-[#F9F9FF]`}
        >
          <More />
        </Box>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex align={"center"} justify={"between"} mb={"3"}>
          <Heading size={"4"}>Service List</Heading>

          <IconButton variant="ghost">
            <Dialog.Close>
              <Cross1Icon />
            </Dialog.Close>
          </IconButton>
        </Flex>
        <Grid columns={"3"} gap={"4"} align={"start"}>
          {serviceList.map((item) => (
            <Flex key={item.name} direction={"column"} gap={"2"}>
              <Box
                className={`w-20 h-20 bg-slate-100 flex items-center justify-center rounded-lg bg-[${item.color}]`}
              >
                {item.icon}
              </Box>

              <Text>{item.name}</Text>
            </Flex>
          ))}
        </Grid>
      </Dialog.Content>
    </Dialog.Root>
  );
}
