import { tasksTable } from "backend/tables/tasks";
import { defineSchema } from "convex/server";

export default defineSchema({
  tasks: tasksTable
});
