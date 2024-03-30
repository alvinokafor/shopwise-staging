import {
  Dialog,
  Button,
  Flex,
  Heading,
  IconButton,
  TextField,
  Text,
  Select,
  TextArea,
} from "@radix-ui/themes";
import { Cross1Icon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  TransferAdapter,
  useTransferMutation,
  useTransferQuery,
} from "@/adapters/TransferAdapter";
import { queryKeys } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  SendToBankSchema,
  sendToBankValidator,
} from "@/lib/validations/transactionsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingIndicator } from "@/assets/icons";
import { toast } from "sonner";

export default function SendToBankAccount() {
  const [bankCode, setBankCode] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SendToBankSchema>({
    resolver: zodResolver(sendToBankValidator),
  });

  console.log(errors);

  const watchFields = watch(["accountNumber", "amount"]);
  const enableResolveAccountReq = watchFields[0] === "" ? false : true;

  const { mutateAsync, isPending } = useTransferMutation(
    TransferAdapter.sendToBank,
    ""
  );

  const allBanks = useTransferQuery(
    TransferAdapter.getBanks,
    [queryKeys.BANKS],
    "",
    true
  );

  const resolveAccount = useTransferQuery(
    TransferAdapter.resolveAccount,
    [queryKeys.RESOLVE_ACCOUNT],
    `resolve?bankCode=${bankCode}&accountNumber=${watchFields[0]}`,
    enableResolveAccountReq
  );

  const handleSendToAccount = async (data: SendToBankSchema) => {
    try {
      await mutateAsync({ bankCode, ...data });
      setOpenModal(false);
      toast.success("Transaction Successful");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger>
        <IconButton variant="ghost">
          <ChevronRightIcon width={32} height={32} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-lg space-y-4">
        <Flex align={"center"} justify={"between"} mb={"3"}>
          <Heading size={"4"}>Send To Bank Account</Heading>

          <IconButton variant="ghost">
            <Dialog.Close>
              <Cross1Icon />
            </Dialog.Close>
          </IconButton>
        </Flex>

        <form
          onSubmit={handleSubmit(handleSendToAccount)}
          className="space-y-4"
        >
          <Flex direction={"column"} gap={"2"}>
            <label className="font-semibold">Choose A Bank</label>
            <Select.Root
              onValueChange={(value: string) => setBankCode(value)}
              size={"2"}
            >
              <Select.Trigger placeholder="Select a Bank" />
              <Select.Content className="max-h-60">
                {allBanks.data?.data.banks.slice(1).map((bank) => (
                  <Select.Item key={bank.code} value={bank.code}>
                    {bank.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex direction={"column"} gap={"2"}>
            <label className="font-semibold">Enter Account Number</label>
            <TextField.Input
              {...register("accountNumber")}
              placeholder="Account Number"
            />

            {resolveAccount.isLoading ? (
              <LoadingIndicator color="#80B036" />
            ) : (
              <Text color="green">{resolveAccount.data?.data.accountName}</Text>
            )}
          </Flex>

          <Flex direction={"column"} gap={"2"}>
            <label className="font-semibold">Enter Amount</label>
            <TextField.Root>
              {/* <TextField.Slot>
                <Text>$</Text>
              </TextField.Slot> */}
              <TextField.Input
                {...register("amount")}
                placeholder="Enter the amount you want to send…"
              />
            </TextField.Root>
          </Flex>

          <Flex direction={"column"} gap={"2"}>
            <label className="font-semibold">Narration</label>
            <TextArea {...register("narration")} />
          </Flex>
          <Flex align={"center"} gap={"3"}>
            <Button className="mt-4">
              {isPending ? <LoadingIndicator /> : "Send"}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
