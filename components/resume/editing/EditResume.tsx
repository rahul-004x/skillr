import { ResumeData } from "@/lib/server/redisActions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const EditResume = ({
  resume,
  onChangeResume,
}: {
  resume: ResumeData;
  onChangeResume: (newResume: ResumeData) => void;
}) => {
  return (
    <section
      className="mx-auto w-full max-w-2xl space-y-8 bg-white my-8"
      aria-label="resume content editing"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Header</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              value={resume?.header.name || ""}
              onChange={(e) => {
                onChangeResume({
                  ...resume,
                  header: {
                    ...resume.header,
                    name: e.target.value,
                  },
                });
              }}
              placeholder="your full name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="location"
              className="text-sm font-medium text-gray-700"
            >
              Location
            </Label>
            <Input
              type="text"
              id="location"
              value={resume?.header.location || ""}
              onChange={(e) => {
                onChangeResume({
                  ...resume,
                  header: {
                    ...resume.header,
                    location: e.target.value,
                  },
                });
              }}
              placeholder="your location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
