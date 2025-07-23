import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { School } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";

interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
}

interface EducationFieldProps {
  edu: Education;
  index: number;
  onUpdate: (index: number, updateEdu: Education) => void;
  onDelete: (index: number) => void;
}

export const EducationField: React.FC<EducationFieldProps> = ({
  edu,
  index,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="relative border p-4 rounded-md group">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 transition-colors"
        onClick={() => onDelete(index)}
      >
        <svg
          className="w-5 h-5"
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
      <div className="grid grid-cols-1 gap-4">
        <div className="md:col-span-2 flex flex-col gap-1">
          <Label
            htmlFor={`edu-degree-${index}`}
            className="text-sm font-normal "
          >
            Degree
          </Label>
          <Input
            type="text"
            placeholder="degree"
            id={`edu-degree-${index}`}
            value={edu.degree}
            onChange={(e) => {
              onUpdate(index, {
                ...edu,
                degree: e.target.value,
              });
            }}
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <Label
            htmlFor={`edu-school-${index}`}
            className="text-sm font-medium"
          >
            School
          </Label>
          <Input
            id={`edu-school-${index}`}
            type="text"
            placeholder="school"
            value={edu.school}
            onChange={(e) => {
              onUpdate(index, {
                ...edu,
                school: e.target.value,
              });
            }}
          />
        </div>
        <div className="md:col-span-2">
          <Label className="text-sm font-medium">Date Range</Label>
          <DateRangePicker
            startDate={edu.start}
            endDate={edu.end}
            onStartDateChange={(date) => {
              onUpdate(index, {
                ...edu,
                start: date,
              });
            }}
            onEndDateChange={(date) => {
              onUpdate(index, {
                ...edu,
                end: date,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
