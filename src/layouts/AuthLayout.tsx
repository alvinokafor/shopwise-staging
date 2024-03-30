import React from "react";
import { Heading, Box, Text } from "@radix-ui/themes";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="grid h-screen grid-cols-1 lg:grid-cols-2">
      <div
        className={`hidden p-20  bg-gradient-to-b from-cyan-500 to-blue-500 lg:flex flex-col items-start justify-between`}
      >
        <img
          src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full object-cover max-h-[400px] rounded-xl"
        />
        <Box
          className="bg-black/50 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-md space-y-4"
          p={"6"}
        >
          <Heading className="text-white text-5xl">Diaspora</Heading>

          <Text className="text-white/50" as="p" size={"3"}>
            Bridge the Distance with Diaspora: Effortless Bill Payments for Your
            Loved Ones in Nigeria.
          </Text>
        </Box>
      </div>

      <Box className="flex flex-col w-3/4 justify-center mx-auto">
        {children}
      </Box>
    </section>
  );
}
