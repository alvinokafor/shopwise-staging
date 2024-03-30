import { useState, useEffect } from "react";
import { Flex, Heading, Card, Avatar } from "@radix-ui/themes";
import { BeneficaryDetails } from "./modals";
import { Beneficiary } from "@/lib/types/Beneficiaries";

export default function BeneficiaryCard({
  beneficiary,
}: {
  beneficiary: Beneficiary;
}) {
  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    const fullname = beneficiary.nickName.split(" ");
    fullname[1]
      ? setUserInitials(fullname[0][0] + fullname[1][0])
      : setUserInitials(fullname[0][0]);
  }, [beneficiary.nickName]);
  return (
    <Card>
      <Flex align={"center"} justify={"between"}>
        <Flex gap={"3"} align={"center"}>
          <Avatar size={"6"} radius="full" fallback={userInitials} />

          <Flex direction={"column"} gap={"2"}>
            <Heading size={"3"}>{beneficiary.nickName}</Heading>
            {/* <Text className="text-slate-400">
              Kudirat Salami Street, Agungi Lagos
            </Text> */}
          </Flex>
        </Flex>

        <BeneficaryDetails />
      </Flex>
    </Card>
  );
}
