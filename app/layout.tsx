import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "sonner";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skillr – Turn a LinkedIn/Resume into a personal site in 1 click",
  description: "Generate a live portfolio from your LinkedIn/Resume profile in under a minute. One click, no code, instant link to share.",
  icons: {
    icon: "/icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${mono.className} flex min-h-screen flex-col`}>
          <ReactQueryClientProvider>
            <Toaster position="bottom-center" richColors />
            <main className="flex flex-1 flex-col">{children}</main>
          </ReactQueryClientProvider>
        </body>
      </html>
   </ClerkProvider>
  );
}
