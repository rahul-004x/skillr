import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProjectField = {
  name: string;
  tools: string[];
  functionality: string;
  achievement?: string | undefined;
};
type ProjectFieldProps = {
  projects: ProjectField;
  index: number;
  onUpdate: (index: number, updatedPro: ProjectField) => void;
  onDelete: (index: number) => void;
};
const ProjectField: React.FC<ProjectFieldProps> = ({ projects, index, onUpdate, onDelete }) => {
  return (
    <div className="relative rounded-md border p-4">
      <button
        type="button"
        onClick={() => onDelete(index)}
        className="absolute top-2 right-2 text-gray-400 transition-colors hover:text-red-500"
        aria-label="Delete project"
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
      
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1">
          <Label htmlFor={`project-name-${index}`}>Project Name</Label>
          <Input
            id={`project-name-${index}`}
            placeholder="Project name"
            required
            value={projects.name || ""}
            onChange={(e) => {
              onUpdate(index, {
                ...projects,
                name: e.target.value
              });
            }}
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor={`project-tools-${index}`}>Tools & Technologies</Label>
          <Input
            id={`project-tools-${index}`}
            placeholder="Tools separated by commas (e.g., React, Node.js, MongoDB)"
            value={projects.tools ? projects.tools.join(", "): ""}
            onChange={(e) => {
              const toolsArray = e.target.value
                .split(",")
                .map(tool => tool.trim())
              onUpdate(index, {
                ...projects,
                tools: toolsArray
              });
            }}
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor={`project-functionality-${index}`}>Functionality</Label>
          <textarea
            id={`project-functionality-${index}`}
            className="w-full rounded-md border p-2 font-mono text-sm"
            placeholder="Describe the main functionality and purpose of the project"
            rows={3}
            value={projects.functionality || ""}
            onChange={(e) => {
              onUpdate(index, {
                ...projects,
                functionality: e.target.value
              });
            }}
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor={`project-achievement-${index}`}>Achievements (Optional)</Label>
          <textarea
            id={`project-achievement-${index}`}
            className="w-full rounded-md border p-2 font-mono text-sm"
            placeholder="Notable achievements or outcomes from this project"
            rows={2}
            value={projects.achievement || ""}
            onChange={(e) => {
              onUpdate(index, {
                ...projects,
                achievement: e.target.value
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectField;
