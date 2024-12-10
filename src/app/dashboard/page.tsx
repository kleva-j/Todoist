import { SelectViewOptions } from "@/dashboard/_components/select-view-options";
import { SelectOptions } from "@/dashboard/_components/select-options";
import { PageContent } from "@/dashboard/_components/page-content";
import { currentUser } from "@clerk/nextjs/server";
import { Text } from "@/components/ui/typography";
import { format } from "date-fns/format";

export default async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const today = new Date();

  const [meridian, hours] = format(today, "aaa hh").split(" ");

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg-px-8">
      <div className="xl:px-40">
        <div className="flex justify-between">
          <div className="flex items-start justify-between flex-col">
            <Text
              as="h1"
              variant="h3"
              className="text-lg font-semibold md:text-xl capitalize"
            >
              Good{" "}
              {meridian === "am"
                ? "Morning"
                : parseInt(String(hours)) >= 17
                  ? "Evening"
                  : "Afternoon"}
              , {user.firstName}! 👋
            </Text>
            <Text
              as="span"
              variant="h4"
              className="font-light text-base text-neutral-500 dark:text-neutral-400"
            >
              Today, {format(today, "eee PPP")}
            </Text>
          </div>
          <div className="flex gap-1">
            <SelectOptions />
            <SelectViewOptions />
          </div>
        </div>
        <PageContent />
      </div>
    </main>
  );
}
