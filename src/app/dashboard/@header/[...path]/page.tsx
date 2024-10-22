import {
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";

export interface PageProps {
  params: { path: string };
}

export default function Page({ params }: PageProps) {
  const activePath = params.path[1] || "";

  return (
    <>
      <BreadcrumbSeparator className="hidden md:block" />
      <BreadcrumbItem>
        <BreadcrumbPage>{activePath}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}
