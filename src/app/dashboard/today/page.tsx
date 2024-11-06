import Dynamic from "next/dynamic";

const Todolist = Dynamic(() =>
  import("@/app/dashboard/today/todos").then((mod) => mod.TodayTodos)
);

export default function TodayPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg-px-8">
      <div className="xl:px-40">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Today</h1>
        </div>
        <Todolist />
      </div>
    </main>
  );
}
