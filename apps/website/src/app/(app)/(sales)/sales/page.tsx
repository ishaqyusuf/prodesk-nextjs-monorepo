import { Sales } from "@/components/sales";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Notifications | Midday",
};

export default async function Notifications() {
  return (
    <Suspense>
      <Sales />
    </Suspense>
  );
}
