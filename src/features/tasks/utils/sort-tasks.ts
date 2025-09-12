import type { Doc } from "backend/_generated/dataModel";

function sortTasks(tasks: Doc<"tasks">[]) {
  const order = {
    "in-progress": 0,
    planned: 1,
    completed: 2
  };
  return tasks.slice().sort((a, b) => order[a.status] - order[b.status]);
}

export { sortTasks };
