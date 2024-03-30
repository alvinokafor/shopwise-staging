import {
  Dialog,
  Button,
  Flex,
  Heading,
  IconButton,
  TextField,
  Grid,
  Select,
  Text,
} from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function BeneficaryDetails() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="ghost">View Details</Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-lg space-y-4">
        <Flex align={"center"} justify={"between"} mb={"3"}>
          <Heading size={"4"}>Alvin Chinedu</Heading>

          <Dialog.Close>
            <IconButton variant="ghost">
              <Cross1Icon />
            </IconButton>
          </Dialog.Close>
        </Flex>

        <Flex direction={"column"} gap={"2"}>
          <label className="font-semibold text-sm">Name</label>
          <TextField.Input placeholder="Enter Name" />
        </Flex>

        <Flex direction={"column"} gap={"3"}>
          <Text className="font-semibold">Beneficiary Address</Text>

          <Grid columns={"2"} gap={"4"}>
            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold text-sm">Region</label>
              <Select.Root size={"2"}>
                <Select.Trigger placeholder="Select Region" />
                <Select.Content>
                  <Select.Item value="enugu">Enugu</Select.Item>
                  <Select.Item value="lagos">Lagos</Select.Item>
                  <Select.Item value="Abuja">Abuja</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold text-sm">City</label>
              <Select.Root size={"2"}>
                <Select.Trigger placeholder="Select Region" />
                <Select.Content>
                  <Select.Item value="new-layout">
                    Enugu - New Layout
                  </Select.Item>
                  <Select.Item value="gariki">Enugu - Gariki</Select.Item>
                  <Select.Item value="independence-layout">
                    Independence Layout
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold text-sm">Address</label>
              <TextField.Input placeholder="Enter Address" />
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold text-sm">Phone Number</label>
              <TextField.Input placeholder="Enter Number" />
            </Flex>
          </Grid>
        </Flex>

        <Flex direction={"column"} gap={"3"}>
          <Text className="font-semibold">Bill Information</Text>

          <Grid columns={"2"} gap={"4"}>
            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold text-sm">Cable Provider</label>
              <Select.Root size={"2"} defaultValue="dstv">
                <Select.Trigger placeholder="Select Cable Provider" />
                <Select.Content>
                  <Select.Item value="dstv">Dstv</Select.Item>
                  <Select.Item value="gotv">Gotv</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold text-sm">Smartcard Number</label>
              <TextField.Input placeholder="Enter Smartcard Number" />
            </Flex>

            <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold text-sm">
                Electricity Meter Number
              </label>
              <TextField.Input placeholder="Enter Meter Number" />
            </Flex>

            {/* <Flex direction={"column"} gap={"2"}>
              <label className="font-semibold text-sm">Phone Number</label>
              <TextField.Input placeholder="Enter Number" />
            </Flex> */}
          </Grid>
        </Flex>

        <Flex align={"center"} gap={"2"}>
          <Flex align={"center"} gap={"3"}>
            <Button className="mt-4">Edit</Button>
          </Flex>
          <Flex align={"center"} gap={"3"}>
            <Button className="mt-4">Save</Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
