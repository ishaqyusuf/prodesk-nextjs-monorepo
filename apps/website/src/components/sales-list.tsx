import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { ErrorFallback } from "./error-fallback";
import { Sales, SalesSkeleton } from "./sales";

export default async function SalesList() {
  return (
    <>
      <ErrorBoundary errorComponent={ErrorFallback}>
        <Suspense fallback={<SalesSkeleton />}>
          <Sales />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
