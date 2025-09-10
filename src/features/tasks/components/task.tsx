import type { Doc } from "backend/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

function Task({ className, task }: { className?: string; task: Doc<"tasks"> }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950",
        className
      )}
    >
      <Checkbox
        id="toggle-2"
        checked={task.status === "completed"}
        className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">{task.title}</p>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>
    </div>
  );
}

export { Task };
