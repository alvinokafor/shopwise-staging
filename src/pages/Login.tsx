import AuthLayout from "@/layouts/AuthLayout";
import { LoginForm } from "@/components/auth";

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
