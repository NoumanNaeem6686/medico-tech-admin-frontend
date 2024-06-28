import SignInMain from "@/components/SigninMain";
import React from "react";

const SignIn = ({ onLogin }: { onLogin: () => void }) => {
  return <SignInMain onLogin={onLogin} />;
};

export default SignIn;
