import { useState } from "react";
import {
  Dialog,
  Button,
  Flex,
  IconButton,
  Box,
  Heading,
  Text,
} from "@radix-ui/themes";
import { CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TransactionDetails() {
  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".reciept");
    if (capture) {
      setLoader(true);
      html2canvas(capture as HTMLElement).then((canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const doc = new jsPDF();
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
        setLoader(false);
        doc.save("reciept.pdf");
      });
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>View Details</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Transaction Details</Dialog.Title>

        <Box p={"2"} className="space-y-4 reciept">
          <Box className="bg-slate-100 rounded-md py-3 px-">
            <Box className="mx-auto text-center space-y-2">
              <Heading>-$300.00</Heading>
              <Flex
                className="text-green-500"
                align={"center"}
                justify={"center"}
                gap={"1"}
              >
                <CheckCircledIcon width={18} height={18} />
                Success
              </Flex>
            </Box>
          </Box>

          <Box className="bg-slate-100 rounded-md py-3 px-">
            <Box className="px-3 text-sm space-y-4">
              <Flex align={"center"} justify={"between"}>
                <Text className="text-slate-600">From</Text>
                <Text className="font-medium">Alvin Chinedu (You)</Text>
              </Flex>
              <Flex align={"center"} justify={"between"}>
                <Text className="text-slate-600">To</Text>
                <Text className="font-medium">
                  Emeka Nkwo (emeka@gmail.com)
                </Text>
              </Flex>
              <Flex align={"center"} justify={"between"}>
                <Text className="text-slate-600">Transaction Type</Text>
                <Text className="font-medium">Wallet Transfer</Text>
              </Flex>
              <Flex align={"center"} justify={"between"}>
                <Text className="text-slate-600">Recipient Details</Text>
                <Text className="font-medium">Emeka Nkwo</Text>
              </Flex>
              <Flex align={"center"} justify={"between"}>
                <Text className="text-slate-600">Transaction Number</Text>
                <Flex align={"center"} gap={"2"}>
                  <Text className="font-medium">10928736545267</Text>
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(`10928736545267`);
                      toast.success("Copied to clipboard");
                    }}
                    variant="ghost"
                  >
                    <CopyIcon />
                  </IconButton>
                </Flex>
              </Flex>
              <Flex align={"center"} justify={"between"}>
                <Text className="text-slate-600">Payment Method</Text>
                <Text className="font-medium">Wallet</Text>
              </Flex>
              <Flex align={"center"} justify={"between"}>
                <Text className="text-slate-600">Transaction Date</Text>
                <Text className="font-medium">Mar 3rd, 2024 at 20:07:58</Text>
              </Flex>
            </Box>
          </Box>
        </Box>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>

          <Button disabled={!(loader === false)} onClick={downloadPDF}>
            Share Reciept
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
