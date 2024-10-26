import { Spinner } from "@/components/spinner";

export default function LoadingPage() {
  return (
    <div className="w-full h-full grid place-items-center">
      <Spinner />
    </div>
  );
}
