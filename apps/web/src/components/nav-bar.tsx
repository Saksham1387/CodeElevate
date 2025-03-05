import React from "react";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const NavBar = () => {
  return (
    <nav className="bg-black text-white w-full h-16 flex items-center justify-between px-6">
      {/* Icon on the left */}
      <div className="flex items-center">
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 12L11 15L16 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Login button on the right */}
      <Button
        variant={"secondary"}
        className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2 font-medium cursor-pointer"
      >
        <User size={18} />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Button>
    </nav>
  );
};

export default NavBar;
