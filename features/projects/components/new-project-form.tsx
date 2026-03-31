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
    <Card className="border-primary/40 bg-primary/5 shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold text-foreground">
          Create New Project
        </CardTitle>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <form onSubmit={handleSubmit} className="space-y-3">
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
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Description{" "}
              <span className="text-muted-foreground/60 normal-case font-normal">
                (optional)
              </span>
            </label>
            <textarea
              placeholder="What is this project about?"
              value={projectDescription}
              onChange={(e) => onProjectDescriptionChange(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Tags{" "}
              <span className="text-muted-foreground/60 normal-case font-normal">
                (comma separated)
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. classification, NLP, finance"
              value={projectTags}
              onChange={(e) => onProjectTagsChange(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              size="sm"
              className="bg-transparent border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-primary hover:bg-primary/90"
              disabled={!projectName.trim()}
            >
              Create Project
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
