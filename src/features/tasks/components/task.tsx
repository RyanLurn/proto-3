import { memo } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { api } from "backend/_generated/api";
import type { Doc } from "backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskOptions } from "@/features/tasks/components/task-options";
import { cn } from "@/lib/utils";

const Task = memo(function Task({
  className,
  _id,
  title,
  description,
  status
}: { className?: string } & Omit<Doc<"tasks">, "_creationTime">) {
  const updateStatus = useMutation(api.task.updateStatus).withOptimisticUpdate(
    (localStore, args) => {
      const { taskId, newStatus } = args;
      const currentTasks = localStore.getQuery(api.task.list);
      if (currentTasks !== undefined) {
        const newTasks = currentTasks.map(task =>
          task._id === taskId ? { ...task, status: newStatus } : task
        );
        localStore.setQuery(api.task.list, {}, newTasks);
      }
    }
  );

  async function handleCheck(checked: CheckedState) {
    try {
      await updateStatus({
        taskId: _id,
        newStatus: checked ? "completed" : "planned"
      });
    } catch (error) {
      console.error("Failed to update task status", error);
      toast.error("Failed to update task status");
    }
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950",
        className
      )}
    >
      <Checkbox
        id={_id}
        checked={status === "completed"}
        onCheckedChange={checked => void handleCheck(checked)}
        className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <TaskOptions className="ml-auto" taskId={_id} />
    </div>
  );
});

export { Task };
