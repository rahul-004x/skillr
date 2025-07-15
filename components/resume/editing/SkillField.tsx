interface SkillFieldProps {
  skills: string;
  index: number;
  onUpdate: (index: number, updateSkill: string) => void;
  onDelete: (indes: string) => void;
}
const SkillField: React.FC<SkillFieldProps> = ({
  skills,
  index,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex w-fit items-center justify-center gap-2 rounded-xl bg-gray-100 px-3 py-1">
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const trimmedSkill = (e.currentTarget.textContent || "").trim();
          onUpdate(index, trimmedSkill);
        }}
        className="h-6 min-w-[40px] overflow-hidden bg-transparent py-0 outline-none"
        style={{ width: "fit-content" }}
      >
        {skills}{" "}
      </div>
      <button
        className="text-gray-400 transition-colors hover:text-red-500"
        onClick={() => onDelete(index)}
      >
        <svg
          className="h-4 w-4"
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
    </div>
  );
};

export default SkillField;
