import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  TextField,
  Select,
  Button,
  Grid,
} from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerValidator,
  RegisterSchema,
} from "@/lib/validations/authValidator";
import { useObfuscationToggle } from "@/hooks";
import { useAuthMutation, AuthAdapter } from "@/adapters/AuthAdapter";
import { LoadingIndicator } from "@/assets/icons";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";

export default function SignupForm() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [inputType, icon, setVisible] = useObfuscationToggle();
  const { register, handleSubmit, setFocus } = useForm<RegisterSchema>({
    resolver: zodResolver(registerValidator),
  });

  const { mutateAsync, isPending } = useAuthMutation(AuthAdapter.signUp, "");

  const handleSignUp = async (data: RegisterSchema) => {
    try {
      await mutateAsync({ ...data, country, phone });
      navigate(`/activate?email=${data.email}`);
      // consouseAuthMutation
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);
  return (
    <Box>
      <Flex mb={"5"} direction={"column"} gap={"2"}>
        <Heading size={"8"} className="text-slate-800">
          Get Started!
        </Heading>
        <Text className="text-slate-600">Sign up to create an account</Text>
      </Flex>

      <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
        <Grid columns={"2"} gap={"3"} align={"center"}>
          <Flex direction={"column"} gap={"2"}>
            <label className="font-semibold" htmlFor="firstname">
              First Name
            </label>
            <TextField.Input
              size={"3"}
              placeholder="Enter First Name"
              type="text"
              {...register("firstName")}
            />
          </Flex>

          <Flex direction={"column"} gap={"2"}>
            <label className="font-semibold" htmlFor="lastname">
              Last Name
            </label>
            <TextField.Input
              size={"3"}
              placeholder="Enter Last Name"
              type="text"
              {...register("lastName")}
            />
          </Flex>
        </Grid>

        <Flex direction={"column"} gap={"2"}>
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <TextField.Input
            size={"3"}
            placeholder="Enter Email Address"
            type="email"
            {...register("email")}
          />
        </Flex>

        <Grid columns={"2"} gap={"3"} align={"center"}>
          <Flex direction={"column"} gap={"2"}>
            <label className="font-semibold">Country</label>
            <Select.Root
              required
              onValueChange={(value: string) => setCountry(value)}
              size={"3"}
            >
              <Select.Trigger
                className="w-full"
                placeholder="Select A Country"
              />
              <Select.Content defaultValue={"NG"}>
                <Select.Item value="NG">Nigeria</Select.Item>
                <Select.Item value="US">United States</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>
          <Flex direction={"column"} gap={"2"}>
            <label className="font-semibold" htmlFor="lastname">
              Phone Number
            </label>
            <PhoneInput
              // defaultCountry="ng"
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
          </Flex>
        </Grid>

        <Flex direction={"column"} gap={"2"}>
          <label className="font-semibold" htmlFor="password">
            Password
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
            {isPending ? <LoadingIndicator /> : "Sign Up"}
          </Button>
          <Text align={"center"} as="p">
            Already have an account?{" "}
            <Link className="underline text-slate-500" to={"/login"}>
              Login
            </Link>
          </Text>
        </Box>
      </form>
    </Box>
  );
}
