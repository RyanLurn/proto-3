"use client";

import { api } from "backend/_generated/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { Task } from "@/features/tasks/components/task";

function TasksView({
  preloadedTasks
}: {
  preloadedTasks: Preloaded<typeof api.task.list>;
}) {
  const tasks = usePreloadedQuery(preloadedTasks);

  return (
    <div className="mx-auto mt-10 flex h-full w-full max-w-xl flex-col gap-3 overflow-y-auto">
      <h1 className="mb-10 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Tasks Manager
      </h1>
      {tasks.map(task => (
        <Task key={task._id} task={task} className="w-full" />
      ))}
    </div>
  );
}

export { TasksView };
