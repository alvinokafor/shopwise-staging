import AuthLayout from "@/layouts/AuthLayout";
import { VerifyPasswordReset } from "@/components/auth";

export default function VerifyResetPassword() {
  return (
    <AuthLayout>
      <VerifyPasswordReset />
    </AuthLayout>
  );
}
