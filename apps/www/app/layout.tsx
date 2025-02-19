import "@/styles/globals.css";
// import { siteConfig } from "@/config/site";
// import { fontSans } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "@/components/_v1/app-provider";
import { env } from "@/env.mjs";
import Upgrader from "@/components/_v1/upgrader";
// import { SiteHeader } from "@/components/site-header";
// import { TailwindIndicator } from "@/components/tailwind-indicator";
// import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/_v1/tailwind-indicator";
import PageAnalytics from "@/lib/analytics/page-analytics";
import { Suspense } from "react";
import { __isProd } from "@/lib/is-prod-server";
import { ReactQueryProvider } from "@/providers/react-query";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QueryTabProvider } from "./(clean-code)/_common/query-tab/provider";
import { constructMetadata } from "@/lib/(clean-code)/construct-metadata";
import UserAccountUpdateRequiredModal from "@/components/modals/user-account-update-required-modal";
// import {db} from "@gnd/db/src/index"
export async function generateMetadata({}) {
    return constructMetadata({
        title: `GND Millwork - gndprodesk.com`,
    });
}
// const inter = Inter({ subsets: ["latin"] });
export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // await db.dykePricingSystem
    const prodDB = env.DATABASE_URL?.includes("pscale");
    return (
        <html lang="en">
            {/* <Suspense> */}
            <ReactQueryProvider>
                <SpeedInsights />
                <body>
                    <Toaster />
                    <div className="print:hidden">
                        <AppProvider>
                            <Suspense>
                                <QueryTabProvider>
                                    {children}

                                    <UserAccountUpdateRequiredModal />
                                    <PageAnalytics />
                                </QueryTabProvider>
                            </Suspense>
                        </AppProvider>
                        <div
                            className={cn(
                                __isProd
                                    ? "fixed z-[9999] bottom-0 left-0 opacity-0 w-5 h-5 overflow-hidden"
                                    : "fixed bottom-0 right-0 mb-2",
                            )}
                        >
                            <Upgrader />
                        </div>

                        <Analytics />
                        <TailwindIndicator />
                        {prodDB && !__isProd && (
                            <div className="fixed bg-red-500 text-sm left-0 flex justify-center right-0  text-white top-0 z-[999]">
                                Production Database
                            </div>
                        )}
                    </div>
                </body>
            </ReactQueryProvider>
            {/* </Suspense> */}
        </html>
    );
}
