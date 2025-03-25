import React from "react";

interface AutLayoutProps {
  children: React.ReactNode;
}

const AutLayout = ({ children }: AutLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AutLayout;
