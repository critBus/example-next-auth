import React from "react";
import { Button } from "./ui/button";
import LoginButton from "./auth/login-button";

const FirstPage = () => {
  // bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800
  return (
    <main
    //   className="flex h-screen flex-col items-center justify-center

    // bg-radial-[at_50%_0%] to-90%
    // from-sky-400 to-blue-800"
    >
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔐Auth
        </h1>
        <p className="text-lg text-white f-poppins">A simple</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Loguin
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
};

export default FirstPage;
