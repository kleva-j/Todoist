import Dynamic from "next/dynamic";

import { FilterGroups } from "@/types";

const Todolist = Dynamic(() =>
  import("@/app/dashboard/todos").then((mod) => mod.Todos)
);

export default function UpcomingPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg-px-8">
      <div className="xl:px-40">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Upcoming</h1>
        </div>
        <Todolist filterGroup={FilterGroups.upcoming} />
      </div>
    </main>
  );
}
