"use client";
import { useSession } from "next-auth/react";
import ContactHeader from "../(storefront)/_components/contact-header";
import SiteFooter from "../(storefront)/_components/footer";
import SiteHeader from "../(storefront)/_components/site-header";
import DealerHeader from "./_components/header";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });

    if (!session?.user) return <></>;
    if (session.role?.name != "Dealer") redirect("");
    return (
        <div className="min-h-screen flex flex-col">
            <div>
                <ContactHeader />
                <DealerHeader />
            </div>
            <div className="min-h-[80vh]">{children}</div>
            <div>
                <SiteFooter />
            </div>
        </div>
    );
}
