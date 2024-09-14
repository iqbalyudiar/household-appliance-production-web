import React from "react";
import { Typography } from "@material-tailwind/react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screeng-gray-100">
      <div className="w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <Typography color="gray" className="mt-1 font-normal">
          {description}
        </Typography>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
