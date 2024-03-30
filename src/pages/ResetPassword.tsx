import AuthLayout from "@/layouts/AuthLayout";
import { ResetPasswordForm } from "@/components/auth";

export default function ResetPassword() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
