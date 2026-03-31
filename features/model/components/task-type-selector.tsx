import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TASK_TYPES } from "../constants/task-types";
import type { TaskTypeKey } from "../types";

interface TaskTypeSelectorProps {
  selectedTask: TaskTypeKey;
  onTaskChange: (task: TaskTypeKey) => void;
}

export function TaskTypeSelector({
  selectedTask,
  onTaskChange,
}: TaskTypeSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Task Type</CardTitle>
        <CardDescription>
          Choose the type of machine learning task you want to perform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(TASK_TYPES).map(([taskKey, taskData]) => (
            <button
              key={taskKey}
              onClick={() => onTaskChange(taskKey as TaskTypeKey)}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                selectedTask === taskKey
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="font-semibold text-sm text-foreground">
                {taskData.name}
              </p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
