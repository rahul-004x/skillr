import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface WorkExperience {
  title: string;
  company: string;
  location: string;
  contract: string;
  description: string;
  start: string;
  end?: string | null;
}

interface WorkExperienceFieldProps {
  work: WorkExperience;
  index: number;
  onUpdate: (index: number, updateEdu: WorkExperience) => void;
  onDelete: (index: number) => void;
}

const WorkExperienceField: React.FC<WorkExperienceFieldProps> = ({
  work,
  index,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className="relative rounded-md border p-4">
      <button
        className="absolute top-2 right-2 text-gray-400 transition-colors hover:text-gray-500"
        onClick={() => onDelete(index)}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label className="text-sm font-medium">Job Title</Label>
          <Input
            placeholder="Job Title"
            required
            value={work.title}
            onChange={(e) => {
              onUpdate(index, {
                ...work,
                title: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <Label className="text-sm font-medium">company</Label>
          <Input
            placeholder="company"
            required
            value={work.company}
            onChange={(e) => {
              onUpdate(index, { ...work, company: e.target.value });
            }}
          />
        </div>
        <div>
          <Label className="text-sm font-medium">location</Label>
          <Input
            placeholder="company"
            required
            value={work.location}
            onChange={(e) => {
              onUpdate(index, { ...work, location: e.target.value });
            }}
          />
        </div>
        <div className="md:col-span-2">
          <Label className="text-sm font-medium">Date Range</Label>
          <DateRangePicker
            startDate={work.start}
            endDate={work.end}
            onStartDateChange={(date) => {
              onUpdate(index, {
                ...work,
                start: date,
              });
            }}
            onEndDateChange={(date) => {
              onUpdate(index, { ...work, end: date });
            }}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <Label className="text-sm font-medium">description</Label>
          <textarea
            rows={4}
            value={work.description || ""}
            className="w-full rounded-md border border-gray-300 p-2 font-mono text-sm"
            placeholder="Brief description of you work..."
            onChange={(e) => {
              onUpdate(index, {
                ...work,
                description: e.target.value
              })
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceField;
