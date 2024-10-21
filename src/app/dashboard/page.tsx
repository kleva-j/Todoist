export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="aspect-video h-12 w-full rounded-lg bg-muted/50"
        />
      ))}
    </div>
  );
}
