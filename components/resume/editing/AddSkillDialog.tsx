import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface AddSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSkill: (skill: string) => void;
}

const AddSkillDialog: React.FC<AddSkillDialogProps> = ({
  open,
  onOpenChange,
  onAddSkill,
}) => {
  const [skillInput, setSkillInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSkill = skillInput.trim();
    if (!trimmedSkill) {
      toast.warning("Skill cannot be empty");
      return;
    }
    onAddSkill(trimmedSkill);
    setSkillInput("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new skills</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Label htmlFor="skill">Skill name</Label>
          <Input
            id="skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Enter new skill"
            autoFocus
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkillDialog;
