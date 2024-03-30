import { useEffect, useState } from "react";
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
import {
  useBeneficiariesMutation,
  BeneficiariesAdapter,
} from "@/adapters/BeneficiariesAdapter";
import { PhoneInput } from "react-international-phone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateBeneficiarySchema,
  createBeneficiaryValidator,
} from "@/lib/validations/beneficiaryValidator";
import { LoadingIndicator } from "@/assets/icons";
import { toast } from "sonner";
import { queryKeys } from "@/lib/constants";
import { useQueryClient } from "@tanstack/react-query";

export default function AddNewBeneficary() {
  const queryClient = useQueryClient();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync, isPending } = useBeneficiariesMutation(
    BeneficiariesAdapter.createBeneficiary,
    ""
  );

  const { register, handleSubmit, reset } = useForm<CreateBeneficiarySchema>({
    resolver: zodResolver(createBeneficiaryValidator),
  });

  const handleAddBeneficiary = async (data: CreateBeneficiarySchema) => {
    try {
      await mutateAsync({ ...data, phoneNumber });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ALL_BENEFICIARIES],
      });
      toast.success(`${data.nickName} had been added to your beneficiaries`);
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Dialog.Root onOpenChange={setOpenModal} open={openModal}>
      <Dialog.Trigger>
        <Button>Add a Beneficiary</Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-[550px] space-y-4">
        <Flex align={"center"} justify={"between"} mb={"3"}>
          <Heading size={"4"}>Add a Beneficiary</Heading>

          <Dialog.Close>
            <IconButton variant="ghost">
              <Cross1Icon />
            </IconButton>
          </Dialog.Close>
        </Flex>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleAddBeneficiary)}
        >
          <Flex direction={"column"} gap={"2"}>
            <label className="font-semibold text-sm">
              Name <sub className="text-red-500">*</sub>
            </label>
            <TextField.Input
              placeholder="Enter Name"
              {...register("nickName")}
            />
          </Flex>

          <Flex direction={"column"} gap={"2"}>
            <label className="font-semibold text-sm">
              Email <sub className="text-red-500">*</sub>
            </label>
            <TextField.Input
              type="email"
              placeholder="Enter Email"
              {...register("email")}
            />
          </Flex>

          <Flex direction={"column"} gap={"3"}>
            <Text className="font-semibold">Beneficiary Address</Text>

            <Grid className="grid-cols-1 md:grid-cols-2" gap={"4"}>
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
                <label className="font-semibold text-sm">
                  Address Name <sub className="text-red-500">*</sub>
                </label>
                <TextField.Input
                  placeholder="Enter Address"
                  {...register("address")}
                />
              </Flex>

              <Flex direction={"column"} gap={"2"}>
                <label className="font-semibold text-sm">
                  Phone Number Name <sub className="text-red-500">*</sub>
                </label>
                <PhoneInput
                  // defaultCountry="ng"
                  value={phoneNumber}
                  onChange={(phone) => setPhoneNumber(phone)}
                />
              </Flex>
            </Grid>
          </Flex>

          <Flex direction={"column"} gap={"3"}>
            <Text className="font-semibold">Bill Information</Text>

            <Grid className="grid-cols-1 md:grid-cols-2" gap={"4"}>
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
                <label className="font-semibold text-sm">
                  Smartcard Number
                </label>
                <TextField.Input placeholder="Enter Smartcard Number" />
              </Flex>

              <Flex direction={"column"} gap={"2"}>
                <label className="font-semibold text-sm">
                  Electricity Meter Number
                </label>
                <TextField.Input placeholder="Enter Meter Number" />
              </Flex>
            </Grid>

            <Button disabled={isPending} className="mt-4" size={"3"}>
              {isPending ? <LoadingIndicator /> : "Save"}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
