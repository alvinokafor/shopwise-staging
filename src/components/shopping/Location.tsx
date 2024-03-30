import { Flex, Select } from "@radix-ui/themes";

export default function Location({ items = ["lagos", "abuja"] }) {
  return (
    <Flex align={"center"} gap={"2"}>
      <Select.Root size={"2"}>
        <Select.Trigger />
        <Select.Content>
          {items.map((item) => (
            <Select.Item className="capitalize" value={item}>
              {item}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}
