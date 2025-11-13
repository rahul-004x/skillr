import { TopMenu } from "@/components/TopMenu";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { BlurFade } from "@/components/ui/BlurFade";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopMenu />
      <section className="flex flex-1 flex-col">
        <div className="flex min-h-[80vh] flex-col">
          {/* Main content */}
          <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center px-5 py-8 md:flex-row md:px-2 md:pt-0">
            {/* Left side - Call to action */}
            <div className="flex w-full max-w-[378px] flex-col items-center justify-center ">
              <div className="max-w-md text-center ">
                <div className="text-gray mb-5 inline-block gap-2.5 rounded bg-gray-100 px-2.5 py-1.5 font-mono text-sm">
                  100% free & open source
                </div>

                <h1 className="text-black-85 mb-4 flex flex-wrap items-center justify-center gap-4 font-mono text-[32px] leading-4 font-bold ">
                  <span>LinkedIn</span>
                  <Image
                    src="/right-arrow.png"
                    alt="Arrow Right Icon"
                    width={32}
                    height={32}
                    className="inline size-8"
                  />
                  <span>Website</span>
                  <br />
                  <span>
                    in one <span className="hidden sm:inline">click</span>
                  </span>
                  <Image
                    src="/highlight-pointer.png"
                    alt="Pointer Icon"
                    width={37}
                    height={37}
                    className="size-[37px] text-gray-400"
                  />
                </h1>

                <p className="mb-[30px] text-center font-mono text-base text-gray-600 md:text-center">
                  Turn your resume/LinkedIn
                  <br /> into a professional website.
                </p>

                <div className="relative flex w-full flex-col items-center jus font-mono ">
                  <Link href="/upload">
                    <Button className="group relative flex h-auto items-center overflow-hidden bg-black/95 px-6 py-3 text-base text-white hover:bg-black/85 cursor-pointer">
                      <div className="absolute -left-16 h-[120px] w-10 -rotate-45 bg-gradient-to-r from-white/10 via-white/50 to-white/10 blur-sm delay-200 duration-500 group-hover:left-[150%]" />
                      <Image
                        src="/sparkle.png"
                        alt="Sparkle Icon"
                        className="relative mr-2 h-5 w-5"
                        width={5}
                        height={5}
                      />
                      <span className="relative">Upload Resume</span>
                      <BorderBeam colorFrom="#5d5d5d" colorTo="#ffffff" />
                    </Button>
                  </Link>

                  <p className="mt-4 text-center text-sm text-gray-500">
                    Takes 1 minute!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
