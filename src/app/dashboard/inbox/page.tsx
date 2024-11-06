import Dynamic from "next/dynamic";

const Todolist = Dynamic(() =>
  import("@/app/dashboard/inbox/todos").then((mod) => mod.InboxTodos)
);

export default function InboxPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg-px-8">
      <div className="xl:px-40">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
        </div>
        <Todolist />
      </div>
    </main>
  );
}
