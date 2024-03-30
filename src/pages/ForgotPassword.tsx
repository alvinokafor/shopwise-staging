import AuthLayout from "@/layouts/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
