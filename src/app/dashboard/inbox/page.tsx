import Dynamic from "next/dynamic";

const Todolist = Dynamic(() =>
  import("@/components/todos/todo-list").then((mod) => mod.Todolist)
);

export default function InboxPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg-px-8">
      <div className="xl:px-40">
        <Todolist />
      </div>
    </main>
  );
}
