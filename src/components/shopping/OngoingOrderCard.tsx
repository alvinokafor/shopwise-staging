import { Card, Text, Heading, Flex, Separator, Button } from "@radix-ui/themes";
import { IOngoingOrders } from "@/lib/types/Stores";

export default function OngoingOrderCard({ order }: { order: IOngoingOrders }) {
  return (
    <Card variant="classic">
      <Flex justify={"between"}>
        <Flex direction={"column"} gap={"3"}>
          <Heading size="4">{order.productName}</Heading>

          <Flex align={"center"} gap={"3"}>
            <Text color="gray" size="2">
              {order.quantity} Items
            </Text>

            <Separator orientation="vertical" />

            <Text color="gray" size="2">
              NGN {order.price}.00
            </Text>
          </Flex>
        </Flex>

        <Button>Track Order</Button>
      </Flex>
    </Card>
  );
}
