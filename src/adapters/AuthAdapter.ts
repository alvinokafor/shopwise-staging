import { useMutation } from "@tanstack/react-query";
import { type MutationCallBack } from "./helpers";
import ApiService from "./ApiService";
import { RegisterSchema, LoginSchema } from "@/lib/validations/authValidator";

// api service initiliazer
const authService = new ApiService("/auth");

// mutation utility
function useAuthMutation<T>(
  mutationCallback: MutationCallBack<T>,
  params: string
) {
  return useMutation({
    mutationFn: (payload: T) => mutationCallback(payload, params),
  });
}

const AuthAdapter = {
  loginUser: async function (payload: LoginSchema) {
    const res = await authService.mutate("login", payload, "JSON", "POST");
    return res;
  },
  activate: async function (payload: { email: string | null; otp: string }) {
    const res = authService.mutate(`activate`, payload, "JSON", "POST");
    return res;
  },
  signUp: async function (
    payload: RegisterSchema & { country: string; phone: string }
  ) {
    const res = await authService.mutate(`register`, payload, "JSON", "POST");
    return res;
  },
  forgotPasswordRequest: async function (payload: { email: string }) {
    const res = await authService.mutate(
      `reset-password/request`,
      payload,
      "JSON",
      "POST"
    );
    return res;
  },
  verifyPasswordRequest: async function (payload: {
    email: string | null;
    otp: string;
  }) {
    const res = await authService.mutate(
      `reset-password/verify`,
      payload,
      "JSON",
      "POST"
    );
    return res;
  },
  resetPassword: async function (payload: {
    email: string | null;
    password: string;
  }) {
    const res = await authService.mutate(
      `reset-password`,
      payload,
      "JSON",
      "POST"
    );
    return res;
  },
};

export { AuthAdapter, useAuthMutation };
