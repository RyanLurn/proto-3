import systemFields from "backend/helpers/systemFields";
import { taskSchema, taskStatus } from "backend/tables/tasks";
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
  returns: v.array(
    v.object({
      ...systemFields("tasks"),
      ...taskSchema
    })
  ),
  handler: async ctx => {
    const tasks = await ctx.db.query("tasks").collect();
    return tasks;
  }
});

const updateStatus = mutation({
  args: {
    taskId: v.id("tasks"),
    newStatus: taskStatus
  },
  returns: v.null(),
  handler: async (ctx, { taskId, newStatus }) => {
    await ctx.db.patch(taskId, { status: newStatus });
  }
});

const deleteOne = mutation({
  args: {
    taskId: v.id("tasks")
  },
  returns: v.null(),
  handler: async (ctx, { taskId }) => {
    await ctx.db.delete(taskId);
  }
});

export { create, list, updateStatus, deleteOne };
