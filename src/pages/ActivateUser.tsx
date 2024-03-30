import AuthLayout from "@/layouts/AuthLayout";
import { VerifyEmail } from "@/components/auth";

export default function ActivateUser() {
  return (
    <AuthLayout>
      <VerifyEmail />
    </AuthLayout>
  );
}
