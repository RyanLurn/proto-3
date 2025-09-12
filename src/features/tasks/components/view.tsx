"use client";

import { api } from "backend/_generated/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { NewTask } from "@/features/tasks/components/new-task";
import { Task } from "@/features/tasks/components/task";
import { sortTasks } from "@/features/tasks/utils/sort-tasks";

function TasksView({
  preloadedTasks
}: {
  preloadedTasks: Preloaded<typeof api.task.list>;
}) {
  const tasks = usePreloadedQuery(preloadedTasks);

  return (
    <div className="mx-auto flex h-full w-full max-w-xl flex-col gap-3 overflow-y-auto pt-10">
      <h1 className="mb-5 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Tasks Manager
      </h1>
      <NewTask className="mb-3 self-center" />
      {sortTasks(tasks).map(task => (
        <Task
          key={task._id}
          className="w-full"
          _id={task._id}
          title={task.title}
          description={task.description}
          status={task.status}
        />
      ))}
    </div>
  );
}

export { TasksView };
