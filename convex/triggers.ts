import { Triggers } from "convex-helpers/server/triggers";

import { cleanupUserData, createDefaultProject } from "./utils";
import { DataModel } from "./_generated/dataModel";

const triggers = new Triggers<DataModel>();

// REGISTER TRIGGERS (Users Events<"Insert" | "Delete">)

triggers.register("users", async (ctx, change) => {
  if (change.operation === "insert") {
    await createDefaultProject(ctx, change.newDoc.tokenIdentifier);
  } else if (change.operation === "delete") {
    await cleanupUserData(ctx, change.oldDoc.tokenIdentifier);
  }
});
