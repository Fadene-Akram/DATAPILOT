import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewProjectFormProps {
  projectName: string;
  projectDescription: string;
  projectTags: string;
  onProjectNameChange: (v: string) => void;
  onProjectDescriptionChange: (v: string) => void;
  onProjectTagsChange: (v: string) => void;
  onCreateProject: () => void;
  onCancel: () => void;
}

export function NewProjectForm({
  projectName,
  projectDescription,
  projectTags,
  onProjectNameChange,
  onProjectDescriptionChange,
  onProjectTagsChange,
  onCreateProject,
  onCancel,
}: NewProjectFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateProject();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
      {/* Project name */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Project Name <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Customer Churn Analysis"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm "
          autoFocus
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Description (optional)
        </label>
        <textarea
          rows={2}
          value={projectDescription}
          onChange={(e) => onProjectDescriptionChange(e.target.value)}
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm resize-none "
        />
      </div>

      {/* Tags */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Tags (comma separated)
        </label>
        <input
          type="text"
          value={projectTags}
          onChange={(e) => onProjectTagsChange(e.target.value)}
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm "
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={!projectName.trim()}>
          Create Project
        </Button>
      </div>
    </form>
  );
}
