import { taskSchema } from "backend/tables/tasks";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const create = mutation({
  args: {
    newTask: v.object(taskSchema)
  },
  returns: v.id("tasks"),
  handler: async (ctx, { newTask }) => {
    const newTaskId = await ctx.db.insert("tasks", newTask);
    return newTaskId;
  }
});

const list = query({
  handler: async ctx => {
    const tasks = await ctx.db.query("tasks").collect();
    return tasks;
  }
});

export { create, list };
