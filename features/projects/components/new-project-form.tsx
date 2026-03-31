import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewProjectFormProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onCreateProject: () => void;
  onCancel: () => void;
}

export function NewProjectForm({
  projectName,
  onProjectNameChange,
  onCreateProject,
  onCancel,
}: NewProjectFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateProject();
  };

  return (
    <Card className="border-primary/50 bg-primary/5">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter project name..."
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Create
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="bg-transparent border-border"
          >
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
