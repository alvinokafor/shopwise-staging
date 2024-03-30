import { useState, useEffect, useCallback } from "react";
import { Box, Flex, Text, Heading, Button } from "@radix-ui/themes";
import { LoadingIndicator } from "@/assets/icons";
import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import OTPInput from "react-otp-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOTP] = useState("");
  const [timer, setTimer] = useState(59); // Initial timer value in seconds
  const [isResendVisible, setIsResendVisible] = useState(false);

  const { mutateAsync, isPending } = useAuthMutation(AuthAdapter.activate, "");

  const handleVerifyOTP = async () => {
    try {
      await mutateAsync({ email, otp });
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let countdown: number | undefined;

    if (timer > 0) {
      //@ts-expect-error unknown type
      countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setIsResendVisible(true);
      clearInterval(countdown);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  const formatTimer = useCallback(() => {
    // Format the timer to display as '09' when it's less than 10
    return timer < 10 ? `0${timer}` : timer;
  }, [timer]);

  return (
    <Box className="space-y-20 w-[85%]">
      <Box>
        <Flex mb={"5"} direction={"column"} gap={"6"}>
          <Heading size={"8"} className="text-slate-800">
            Email Verification
          </Heading>
          <Text className="text-slate-600">
            A 6-digit confirmation code has been sent to{" "}
            <span className="font-medium">{decodeURIComponent(email!)}</span> .
            Kindly input code here to confirm your registration:
          </Text>

          <Text
            className="cursor-pointer"
            onClick={() => navigate(-1)}
            color="orange"
            weight={"bold"}
          >
            Edit Email Address
          </Text>
        </Flex>

        <OTPInput
          value={otp}
          onChange={setOTP}
          inputStyle={"text"}
          numInputs={6}
          renderSeparator={
            <span className="font-bold text-xl text-slate-400">-</span>
          }
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "56px",
                height: "64px",
                fontSize: "32px",
                fontWeight: "bold",
                margin: "5px",
                textAlign: "center",
                border: "1px solid #D0D5DD",
                outline: "none",
                borderRadius: "8px",
              }}
            />
          )}
        />
      </Box>

      <Box className="space-y-3">
        <Flex align={"center"} justify={"center"} gap={"2"}>
          <Button
            disabled={!isResendVisible ? true : false}
            variant="ghost"
            color="gray"
            className="font-medium"
            onClick={handleVerifyOTP}
          >
            Resend Code
          </Button>
          <Text className="text-primary font-medium">0:{formatTimer()}</Text>
        </Flex>
        <Button onClick={handleVerifyOTP} size={"3"} className="w-full">
          {isPending ? <LoadingIndicator /> : "Verify"}
        </Button>
      </Box>
    </Box>
  );
}
