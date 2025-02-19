import { Skeleton } from "@gnd/ui/skeleton";

export function SalesSkeleton() {
  return [...Array(2)].map((_, index) => (
    <Skeleton key={index.toString()} className="h-4 w-[25%] mb-3" />
  ));
}

export async function Sales() {
  // await get salesList
  return <div></div>;
}
