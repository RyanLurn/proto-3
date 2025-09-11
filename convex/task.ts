import systemFields from "backend/helpers/systemFields";
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
  returns: v.array(
    v.object({
      ...systemFields("tasks"),
      ...taskSchema
    })
  ),
  handler: async ctx => {
    const inProgress = await ctx.db
      .query("tasks")
      .withIndex("by_status", q => q.eq("status", "in-progress"))
      .collect();

    const planned = await ctx.db
      .query("tasks")
      .withIndex("by_status", q => q.eq("status", "planned"))
      .collect();

    const completed = await ctx.db
      .query("tasks")
      .withIndex("by_status", q => q.eq("status", "completed"))
      .collect();

    const orderedTasks = [...inProgress, ...planned, ...completed];

    return orderedTasks;
  }
});

export { create, list };
