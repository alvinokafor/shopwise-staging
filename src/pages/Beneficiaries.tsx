import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import AppLayout from "../layouts/AppLayout";
import { Container, BackButton } from "../partials";
import { Search } from "@/components/shopping";
import { BeneficiaryCard } from "@/components/beneficiaries";
import { AddNewBeneficary } from "@/components/beneficiaries/modals";
import {
  BeneficiariesAdapter,
  useBeneficiariesQuery,
} from "@/adapters/BeneficiariesAdapter";
import { queryKeys } from "@/lib/constants";
import { LoadingIndicator } from "@/assets/icons";

export default function Beneficairies() {
  const { data, isLoading } = useBeneficiariesQuery(
    BeneficiariesAdapter.getAllBeneficiaries,
    [queryKeys.ALL_BENEFICIARIES],
    ""
  );

  return (
    <AppLayout>
      <Container>
        <Box className="pt-24 space-y-12">
          <Box className="space-y-6">
            <BackButton />

            <Flex
              className="flex-col md:flex-row md:items-center gap-4"
              justify={"between"}
              align={"center"}
            >
              <Heading>Beneficiaries</Heading>

              <Flex align={"center"} gap={"3"}>
                <Search />
                <AddNewBeneficary />
              </Flex>
            </Flex>
          </Box>
          {/* @ts-expect-error no types found */}
          {data?.data.beneficiaries !== undefined ? (
            !isLoading ? (
              //@ts-expect-error no types found
              data?.data.beneficiaries.map((beneficiary) => (
                <BeneficiaryCard
                  key={beneficiary.id}
                  beneficiary={beneficiary}
                />
              ))
            ) : (
              <Box className="mx-auto w-max">
                <LoadingIndicator color="#0090FF" />
              </Box>
            )
          ) : (
            <Box className="text-center mt-10">
              <Text>You have no beneficiaries</Text>
            </Box>
          )}
        </Box>
      </Container>
    </AppLayout>
  );
}
