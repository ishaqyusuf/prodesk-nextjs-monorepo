import { SalesCustomersHeader } from "@/components/sales-customers-header";
import { searchParamsCache } from "./search-params";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ErrorFallback } from "@/components/error-fallback";
import { Suspense } from "react";

export default async function Page({ searchParams }) {
  const query = searchParamsCache.parse(await searchParams);
  return (
    <div className="flex flex-col pt-6 gap-6">
      <SalesCustomersHeader />
      <ErrorBoundary errorComponent={ErrorFallback}>
        <div></div>
      </ErrorBoundary>
    </div>
  );
}
