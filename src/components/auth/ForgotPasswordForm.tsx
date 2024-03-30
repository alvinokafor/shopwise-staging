import { useState } from "react";
import { Box, Flex, Heading, Text, TextField, Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useAuthMutation, AuthAdapter } from "@/adapters/AuthAdapter";
import { LoadingIndicator } from "@/assets/icons";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const { mutateAsync, isPending } = useAuthMutation(
    AuthAdapter.forgotPasswordRequest,
    ""
  );

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutateAsync({ email });
      navigate(`/verify-reset-password?email=${email}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Flex mb={"5"} direction={"column"} gap={"2"}>
        <Heading size={"8"} className="text-slate-800">
          Forgot Password
        </Heading>
        <Text className="text-slate-600">
          Input your email to reset your password
        </Text>
      </Flex>

      <form onSubmit={handleForgotPassword} className="space-y-6">
        <Flex direction={"column"} gap={"2"}>
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <TextField.Input
            size={"3"}
            placeholder="Enter Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Flex>

        <Box className="space-y-3">
          <Button disabled={isPending} className="w-full" size={"3"}>
            {isPending ? <LoadingIndicator /> : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
