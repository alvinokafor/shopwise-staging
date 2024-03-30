import AppLayout from "@/layouts/AppLayout";
import { Heading, Box, Text, Button } from "@radix-ui/themes";
import { WalletAdapter, useWalletMutation } from "@/adapters/WalletAdapter";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

export default function FundingConfirmation() {
  const { mutateAsync, isPending } = useWalletMutation(
    WalletAdapter.verifyWalletFunding,
    ""
  );
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("tx_ref");

  const handleVerifyFunding = async function () {
    try {
      await mutateAsync({ reference });
      toast.success("Transaction Verified");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleVerifyFunding();
  }, []);
  return (
    <AppLayout>
      <Box className="flex h-screen flex-col gap-6 items-center justify-center">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.1" cx="50" cy="50" r="50" fill="#5C6AC4" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M51.5625 18.75C68.8214 18.75 82.8125 32.7411 82.8125 50C82.8125 67.2589 68.8214 81.25 51.5625 81.25C34.3036 81.25 20.3125 67.2589 20.3125 50C20.3125 32.7411 34.3036 18.75 51.5625 18.75Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M71.192 25.6831C78.2799 31.4119 82.8125 40.1766 82.8125 50C82.8125 67.2589 68.8214 81.25 51.5625 81.25C41.7391 81.25 32.9744 76.7174 27.2456 69.6295C32.6106 73.9657 39.4396 76.5625 46.875 76.5625C64.1339 76.5625 78.125 62.5714 78.125 45.3125C78.125 37.8771 75.5282 31.0481 71.192 25.6831V25.6831Z"
            fill="#FFC200"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M84.375 50C84.375 31.8782 69.6843 17.1875 51.5625 17.1875C33.4407 17.1875 18.75 31.8782 18.75 50C18.75 68.1218 33.4407 82.8125 51.5625 82.8125C69.6843 82.8125 84.375 68.1218 84.375 50ZM21.875 50C21.875 33.604 35.1665 20.3125 51.5625 20.3125C67.9585 20.3125 81.25 33.604 81.25 50C81.25 66.396 67.9585 79.6875 51.5625 79.6875C35.1665 79.6875 21.875 66.396 21.875 50Z"
            fill="#154E84"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M71.192 25.6831C78.2799 31.4119 82.8125 40.1766 82.8125 50C82.8125 67.2589 68.8214 81.25 51.5625 81.25C41.7391 81.25 32.9744 76.7174 27.2456 69.6295C32.6106 73.9657 39.4396 76.5625 46.875 76.5625C64.1339 76.5625 78.125 62.5714 78.125 45.3125C78.125 37.8771 75.5282 31.0481 71.192 25.6831V25.6831Z"
            fill="#47C1BF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M51.5625 17.1875C69.6843 17.1875 84.375 31.8782 84.375 50C84.375 68.1218 69.6843 82.8125 51.5625 82.8125C33.4407 82.8125 18.75 68.1218 18.75 50C18.75 31.8782 33.4407 17.1875 51.5625 17.1875ZM51.5625 20.3125C35.1665 20.3125 21.875 33.604 21.875 50C21.875 66.396 35.1665 79.6875 51.5625 79.6875C67.9585 79.6875 81.25 66.396 81.25 50C81.25 33.604 67.9585 20.3125 51.5625 20.3125Z"
            fill="#5C6AC4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48.4389 57.063L40.126 48.8571C39.5119 48.2509 38.5226 48.2573 37.9163 48.8714C37.3101 49.4855 37.3165 50.4748 37.9306 51.0811L47.4592 60.487C48.1124 61.1318 49.178 61.0774 49.7621 60.3695L65.2335 41.6195C65.7827 40.9539 65.6884 39.9691 65.0228 39.4199C64.3572 38.8706 63.3724 38.965 62.8231 39.6306L48.4389 57.063Z"
            fill="#006FBB"
          />
        </svg>

        <Heading className="text-center">Wallet Funding Successful</Heading>

        <Text color="gray">Your wallet has been succesfully funded</Text>

        <Link to={`/`}>
          <Button disabled={isPending}>Go to Home</Button>
        </Link>
      </Box>
    </AppLayout>
  );
}
