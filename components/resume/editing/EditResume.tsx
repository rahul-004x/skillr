import { ResumeData, updateUsername } from "@/lib/server/redisActions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EducationField } from "./EducationField";
import AddButton from "./AddButton";
import SkillField from "./SkillField";
import { useState } from "react";
import AddSkillDialog from "./AddSkillDialog";
import { toast } from "sonner";
import WorkExperienceField from "./WorkExperienceField";
import { title } from "node:process";

export const EditResume = ({
  resume,
  onChangeResume,
}: {
  resume: ResumeData;
  onChangeResume: (newResume: ResumeData) => void;
}) => {
  const [isAddSkillDialogOpen, setIsAddSkillDialogOpen] = useState(false);

  const handleAddSkill = (skillToAdd: string) => {
    if (resume.header.skills.includes(skillToAdd)) {
      toast.warning("This skill is already added");
    } else {
      onChangeResume({
        ...resume,
        header: {
          ...resume.header,
          skills: [...resume.header.skills, skillToAdd],
        },
      });
      toast.success("Skill added successfully");
    }
  };

  return (
    <section
      className="mx-auto my-8 w-full max-w-2xl space-y-8 bg-white"
      aria-label="resume content editing"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Header</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
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
          <div className="col-span-2 flex flex-col gap-2">
            <Label
              htmlFor="shortAbout"
              className="text-sm font-medium text-gray-700"
            >
              Short About
            </Label>
            <textarea
              className="w-full rounded-md border p-2 font-mono text-sm"
              id="shortAbout"
              value={resume?.header.shortAbout || ""}
              onChange={(e) => {
                onChangeResume({
                  ...resume,
                  header: {
                    ...resume.header,
                    shortAbout: e.target.value,
                  },
                });
              }}
              rows={4}
              placeholder="Brief description about yourself..."
            />
          </div>
          <div className="col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label id="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                value={resume?.header.contacts?.email || ""}
                onChange={(e) => {
                  onChangeResume({
                    ...resume,
                    header: {
                      ...resume.header,
                      contacts: {
                        ...resume.header.contacts,
                        email: e.target.value,
                      },
                    },
                  });
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label id="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="Phone"
                type="text"
                value={resume?.header.contacts?.phone || ""}
                onChange={(e) => {
                  onChangeResume({
                    ...resume,
                    header: {
                      ...resume.header,
                      contacts: {
                        ...resume.header.contacts,
                        phone: e.target.value,
                      },
                    },
                  });
                }}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Social Links
              </Label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  {
                    id: "website",
                    label: "Website",
                    prefix: "",
                    placeholder: "your-website.com",
                    key: "website",
                  },
                  {
                    id: "github",
                    label: "GitHub",
                    prefix: "github.com/",
                    placeholder: "username",
                    key: "github",
                  },
                  {
                    id: "linkedin",
                    label: "LinkedIn",
                    prefix: "linkedin.com/in/",
                    placeholder: "username",
                    key: "linkedin",
                  },
                  {
                    id: "twitter",
                    label: "Twitter/X",
                    prefix: "x.com/",
                    placeholder: "username",
                    key: "twitter",
                  },
                ].map(({ id, label, prefix, placeholder, key }) => (
                  <div key={id} className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-gray-600">
                      {label}
                    </Label>
                    <div className="flex items-center">
                      {prefix && (
                        <span className="mr-2 text-sm font-medium text-gray-500">
                          {prefix}
                        </span>
                      )}
                      <Input
                        type="text"
                        id={id}
                        value={
                          resume?.header.contacts?.[
                            key as keyof typeof resume.header.contacts
                          ] || ""
                        }
                        onChange={(e) => {
                          onChangeResume({
                            ...resume,
                            header: {
                              ...resume.header,
                              contacts: {
                                ...resume.header.contacts,
                                [key]: e.target.value,
                              },
                            },
                          });
                        }}
                        placeholder={placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">About</h2>
        <textarea
          className="w-full rounded-md border p-2 font-mono text-sm"
          value={resume?.summary}
          onChange={(e) => {
            onChangeResume({
              ...resume,
              summary: e.target.value,
            });
          }}
          rows={4}
          placeholder="Enter you professional summary..."
        />
      </div>

      {/* Work Experience */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Work Experience</h2>
        <div className="space-y-4">
          {resume?.workExperience?.map((work, index) => (
            <WorkExperienceField
              key={index}
              work={work}
              index={index}
              onUpdate={(index, updatedWork) => {
                const newWorkExperience = [...resume.workExperience];
                newWorkExperience[index] = {
                  ...resume.workExperience[index],
                  ...updatedWork,
                };
                onChangeResume({
                  ...resume,
                  workExperience: newWorkExperience,
                });
              }}
              onDelete={() => {
                const newWorkExperience = [...resume.workExperience];
                newWorkExperience.splice(index, 1);
                onChangeResume({
                  ...resume,
                  workExperience: newWorkExperience,
                });
              }}
            />
          ))}
          <AddButton
            label="Work Experience"
            onClick={() => {
              onChangeResume({
                ...resume,
                workExperience: [
                  ...resume.workExperience,
                  {
                    company: "",
                    link: "",
                    location: "",
                    title: "",
                    start: "",
                    end: null,
                    description: "",
                    contract: "", 
                  },
                ],
              });
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Education</h2>
        {resume?.education?.map((edu, index) => (
          <div key={index}>
            <EducationField
              key={index}
              edu={edu}
              index={index}
              onUpdate={(index, updatedEdu) => {
                const newEducation = [...resume.education];
                newEducation[index] = updatedEdu;
                onChangeResume({
                  ...resume,
                  education: newEducation,
                });
              }}
              onDelete={(index) => {
                const newEducation = [...resume.education];
                newEducation.splice(index, 1);
                onChangeResume({
                  ...resume,
                  education: newEducation,
                });
              }}
            />
          </div>
        ))}
        <AddButton
          label="Add Education"
          onClick={() => {
            onChangeResume({
              ...resume,
              education: [
                ...resume.education,
                { degree: "", school: "", start: "", end: "" },
              ],
            });
          }}
        />
      </div>

      {/* Skill section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resume?.header?.skills?.map((skills, index) => (
            <SkillField
              key={index}
              index={index}
              skills={skills}
              onUpdate={(index, updatedSkill) => {
                const newSkill = [...resume.header.skills];
                newSkill[index] = updatedSkill;
                onChangeResume({
                  ...resume,
                  header: {
                    ...resume.header,
                    skills: newSkill,
                  },
                });
              }}
              onDelete={(index) => {
                const newSkill = [...resume.header.skills];
                newSkill.splice(Number(index), 1);
                onChangeResume({
                  ...resume,
                  header: {
                    ...resume.header,
                    skills: newSkill,
                  },
                });
              }}
            />
          ))}
        </div>
        <AddButton
          label="Add Skills"
          onClick={() => setIsAddSkillDialogOpen(true)}
        />
        <AddSkillDialog
          open={isAddSkillDialogOpen}
          onOpenChange={setIsAddSkillDialogOpen}
          onAddSkill={handleAddSkill}
        />
      </div>
    </section>
  );
};
