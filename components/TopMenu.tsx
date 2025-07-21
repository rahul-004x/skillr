import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const TopMenu = () => {
  return (
    <header className="mx-auto flex h-[67px] w-full max-w-4xl items-center justify-between px-6 py-4 md:px-0">
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
            <a
              href="https://github.com/rahul-004x/reflect.me"
              target="black"
              rel="noreferrer"
            >
              <Button
                className="text-gray flex cursor-pointer flex-row gap-1.5 border-r-1 border-gray-300 px-4 py-5 text-sm font-medium"
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
                className="cursor-pointer bg-black/95 px-4 py-5 text-sm font-medium hover:bg-black/85"
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
