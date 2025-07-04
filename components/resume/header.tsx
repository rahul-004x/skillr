import { ResumeDataSchemaType } from "@/lib/resume";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import {
  Github,
  GlobeIcon,
  Linkedin,
  MailIcon,
  PhoneIcon,
  Twitter,
} from "lucide-react";

/**
 * header component displays personal information and contact details
 */

interface SocailButtonProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

const SocailButton = ({ href, icon: Icon, label }: SocailButtonProps) => {
  return (
    <Button className="size-8" variant="outline" size="icon" asChild>
      <a
        href={
          href.startsWith("mailto:") || href.startsWith("tel:")
            ? href
            : `${href}${href.includes("?") ? "&" : "?"}ref=reflect.me`
        }
        aria-label={label}
        target="_blank"
        rel="nooopener noreferrer"
      >
        <Icon className="size-4" aria-hidden="true" />
      </a>
    </Button>
  );
};

export function Header({
  header,
  picture,
}: {
  header: ResumeDataSchemaType["header"];
  picture?: string;
}) {
  const prefixUrl = (stringToFix?: string | null) => {
    if (!stringToFix) return undefined;
    const url = stringToFix.trim();
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const sociaLinks = useMemo(() => {
    const formatSocialUrl = (
      url: string | undefined | null,
      platform: "github" | "twitter" | "linkedin",
    ) => {
      if (!url) {
        return undefined;
      }
      const cleanUrl = url.trim();
      if (cleanUrl.startsWith("https")) return cleanUrl;

      // Handle twitter.com and x.com variation
      if (
        platform === "twitter" &&
        (cleanUrl.startsWith("twitter.com") || cleanUrl.startsWith("x.com"))
      ) {
        return `https://${cleanUrl}`;
      }

      const platformUrls = {
        github: "github.com",
        twitter: "x.com",
        linkedin: "linkedin.com/in",
      } as const;
      return `https://${platformUrls[platform]}/${cleanUrl}`;
    };
    return {
      website: prefixUrl(header.contacts.website),
      github: formatSocialUrl(header.contacts.github, "github"),
      linkedin: formatSocialUrl(header.contacts.linkedin, "linkedin"),
      twitter: formatSocialUrl(header.contacts.twitter, "twitter"),
    };
  }, [
    header.contacts.website,
    header.contacts.github,
    header.contacts.linkedin,
    header.contacts.twitter,
  ]);

  return (
    <header className="flex items-start md:items-center justify-between gap-4">
      <div className="flex-1 space-y-1.5 ">
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
        <div className="flex gap-x-1 pt-1  font-mono text-sm text-[#6B7280] print:hidden">
          {sociaLinks.website && (
            <SocailButton
              href={sociaLinks.website}
              icon={GlobeIcon}
              label="personal website"
            />
          )}
          {header.contacts.email && (
            <SocailButton
              href={`mailto: ${header.contacts.email}`}
              icon={MailIcon}
              label="Email"
            />
          )}
          {header.contacts.phone && (
            <SocailButton
              href={`phone: ${header.contacts.phone}`}
              icon={PhoneIcon}
              label="Phone"
            />
          )}
          {sociaLinks.github && (
            <SocailButton
              href={sociaLinks.github}
              icon={Github}
              label="personal website"
            />
          )}
          {sociaLinks.linkedin && (
            <SocailButton
              href={sociaLinks.linkedin}
              icon={Linkedin}
              label="linkedin"
            />
          )}
          {sociaLinks.twitter && (
            <SocailButton
              href={sociaLinks.twitter}
              icon={Twitter}
              label="twitter"
            />
          )}
        </div>
        <div
          className="hidden gap-x-2 font-mono text-sm print:flex print:text-[12px]"
          aria-label="print contact information"
        >
          {sociaLinks.website && (
            <>
              <a
                className="underline hover:text-foreground/70"
                href={sociaLinks.website}
              >
                {new URL(sociaLinks.website).hostname}
              </a>
              <span aria-hidden="true">/</span>
            </>
          )}
          {header.contacts.email && (
            <>
              <a
                className="underline hover:text-foreground/70"
                href={`mailto: ${header.contacts.email}`}
              >
                {header.contacts.email}
              </a>
              <span aria-hidden="true">/</span>
            </>
          )}
          {header.contacts.phone && (
            <>
              <a
                className="underline hover:text-foreground/70"
                href={`tel: ${header.contacts.phone}`}
              >
                {header.contacts.phone}
              </a>
            </>
          )}
        </div>
      </div>
      <Avatar className="size-20">
        <AvatarImage src={picture} alt={`${header?.name} profile's picture`} />
        <AvatarFallback>
          {header.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
