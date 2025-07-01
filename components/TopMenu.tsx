import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const TopMenu = () => {
  return (
    <header className="w-full py-4 md:px-0 px-6 flex justify-between items-center max-w-4xl mx-auto h-[67px]">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Self.so Logo"
          className="object-contain"
          width={100}
          height={100}
        />
      </Link>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex flex-row gap-3 font-mono">
            <a href="www.github.com/rahul004x" target="black" rel="noreferrer">
              <Button
                className="flex flex-row gap-1.5 py-5 px-4 border-gray-300 text-gray text-sm font-medium border-r-1"
                variant="outline"
              >
                <Image
                  src="/github.svg"
                  alt="github.svg"
                  width={14}
                  height={14}
                />
                <span>GitHub</span>
              </Button>
            </a>
            <Link href="/upload">
              <Button
                variant="default"
                className="text-sm font-medium py-5 px-4 bg-black/95 hover:bg-black/85"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </header>
  );
};
