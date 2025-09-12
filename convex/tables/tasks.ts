import { defineTable } from "convex/server";
import { v } from "convex/values";

const taskStatus = v.union(
  v.literal("planned"),
  v.literal("in-progress"),
  v.literal("completed")
);

const taskSchema = {
  title: v.string(),
  description: v.string(),
  status: taskStatus
};

const tasksTable = defineTable(taskSchema).index("by_status", ["status"]);

export { taskStatus, taskSchema, tasksTable };
