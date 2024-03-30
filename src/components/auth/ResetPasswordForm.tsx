import { useEffect } from "react";
import { Box, Flex, Heading, TextField, Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordValidator,
  type ResetPasswordSchema,
} from "@/lib/validations/authValidator";
import { useObfuscationToggle } from "@/hooks";
import { useAuthMutation, AuthAdapter } from "@/adapters/AuthAdapter";
import { LoadingIndicator } from "@/assets/icons";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [inputType, icon, setVisible] = useObfuscationToggle();
  const { register, handleSubmit, setFocus } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordValidator),
  });

  const { mutateAsync, isPending } = useAuthMutation(
    AuthAdapter.resetPassword,
    ""
  );

  const handleSignUp = async (data: ResetPasswordSchema) => {
    try {
      await mutateAsync({ email, ...data });
      navigate(`/login`);
      toast.success("Password Reset Successful");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);
  return (
    <Box className="overflow-y-auto">
      <Flex mb={"5"} direction={"column"} gap={"2"}>
        <Heading size={"8"} className="text-slate-800">
          Reset Password
        </Heading>
      </Flex>

      <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
        <Flex direction={"column"} gap={"2"}>
          <label className="font-semibold" htmlFor="password">
            Enter New Password
          </label>

          <TextField.Root>
            <TextField.Input
              required
              placeholder="Enter Password"
              size={"3"}
              type={inputType}
              {...register("password")}
            />
            <TextField.Slot
              className="cursor-pointer"
              onClick={() => setVisible((visible) => !visible)}
            >
              {icon}
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {/* <Flex direction={"column"} gap={"2"}>
          <label className="font-semibold" htmlFor="confirm_password">
            Confirm Password
          </label>
          <TextField.Input
            size={"3"}
            placeholder="Enter Password"
            type="confirm_password"
          />
        </Flex> */}

        <Box className="space-y-3">
          <Button disabled={isPending} className="w-full" size={"3"}>
            {isPending ? <LoadingIndicator /> : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
