import React from "react";
import AuthLayout from "../../features/auth/components/layout/AuthLayout";
import RegisterForm from "../../features/auth/components/form/RegisterForm";
const Register: React.FC = () => {
  return (
    <AuthLayout
      title="Register Page"
      description="Nice to meet you! Enter your details to register."
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
