import { defineTable } from "convex/server";
import { v } from "convex/values";

const taskSchema = {
  title: v.string(),
  description: v.string(),
  status: v.union(
    v.literal("planned"),
    v.literal("in-progress"),
    v.literal("completed")
  )
};

const tasksTable = defineTable(taskSchema).index("by_status", ["status"]);

export { taskSchema, tasksTable };
