import React from "react";
import AuthLayout from "../../features/auth/components/layout/AuthLayout";
import LoginForm from "../../features/auth/components/form/LoginForm";
const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      title="Login Page"
      description="Nice to meet you! Enter your details to login."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
