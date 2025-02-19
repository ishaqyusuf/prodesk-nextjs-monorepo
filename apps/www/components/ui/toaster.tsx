"use client";

import { Toaster as SonnerToaster } from "sonner";
import * as Portal from "@radix-ui/react-portal";
export function Toaster() {
    return (
        <Portal.Root className="fixed z-[60]">
            <SonnerToaster
                richColors
                position="bottom-right"
                //   toastOptions={{
                //     style: {
                //       background: "hsl(var(--background))",
                //       color: "hsl(var(--foreground))",
                //       border: "1px solid hsl(var(--border))",
                //     },
                //   }}
            />
        </Portal.Root>
    );
}
