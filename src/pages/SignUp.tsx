import AuthLayout from "@/layouts/AuthLayout";
import { SignupForm } from "@/components/auth";

export default function SignUp() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
