import { ResumeDataSchemaType } from "@/lib/resume";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/**
 * header component displays personal information and contact details
 */

export function Header({
  header,
  picture,
}: {
  header: ResumeDataSchemaType["header"];
  picture?: string;
}) {
  return (
    <header className="flex items-start md:items-center justify-between gap-4 ">
      <div className="flex-1 space-y-1.5">
        <h1 className="text-2xl font-bold" id="resume-name">
          {header.name}
        </h1>
        <p
          className="text-pretty font-mono text-sm print:text-[12px] text-[#6B7280] inline-block align-middle"
          aria-labelledby="resume-name"
        >
          {header.shortAbout}
        </p>
        <p className="max-w-md text-sm text-pretty text-foreground font-mono items-center">
          <a
            className="inline-flex gap-1.5 align-baseline leading-none hover:underline text-[#9CA0A8] "
            href={`https://www.googl.com/${encodeURIComponent(header.location || "")}`}
            target="_blank"
            rel="nooopener noreferrer"
            aria-label={`location: ${header.location}`}
          >
            {header.location}
          </a>
        </p>
      </div>
      <Avatar className="size-20">
        <AvatarImage src={picture} alt={`${header?.name} profile's picture`} />
        {/* <AvatarFallback */}
        {/*   {header.name */}
        {/*     .split(' ') */}
        {/*     .map((n) => n[0]) */}
        {/*     .join('') */}
        {/*   } */}
        {/* > */}
        {/* </AvatarFallback> */}
      </Avatar>
    </header>
  );
}
