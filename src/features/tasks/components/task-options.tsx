import { api } from "backend/_generated/api";
import type { Id } from "backend/_generated/dataModel";
import { useMutation } from "convex/react";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

function TaskOptions({
  className,
  taskId
}: {
  className?: string;
  taskId: Id<"tasks">;
}) {
  const deleteOne = useMutation(api.task.deleteOne).withOptimisticUpdate(
    (localStore, args) => {
      const { taskId } = args;
      const currentTasks = localStore.getQuery(api.task.list);
      if (currentTasks !== undefined) {
        const newTasks = currentTasks.filter(task => task._id !== taskId);
        localStore.setQuery(api.task.list, {}, newTasks);
      }
    }
  );

  async function handleDelete() {
    await deleteOne({ taskId });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={className}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuItem disabled>Edit</DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => void handleDelete()}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { TaskOptions };
