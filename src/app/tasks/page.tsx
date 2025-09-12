import { api } from "backend/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { TasksView } from "@/features/tasks/components/view";

export default async function TasksPage() {
  const preloadedTasks = await preloadQuery(api.task.list);

  return <TasksView preloadedTasks={preloadedTasks} />;
}
