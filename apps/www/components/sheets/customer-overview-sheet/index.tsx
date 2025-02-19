"use client";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export const useOpenCustomerQuery = () => {
    const [account, setAccount] = useQueryState("account-no");
    return {
        open(accountNo) {
            setAccount(accountNo);
        },
    };
};
export function CustomerOverviewSheet() {
    const [account, setAccount] = useQueryState("account-no");
    const isOpen = Boolean(account);

    const handleOpenChange = () => {
        setAccount(null);
    };
    useEffect(() => {
        console.log({ account });
    }, [account]);
    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent></SheetContent>
        </Sheet>
    );
}
