"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
    nodeId;
    children;
    noDelay?: boolean;
}
export default function Portal({ nodeId, noDelay, children }: Props) {
    // const node = document.getElementById(nodeId);
    const [node, setNode] = useState<any>(null);
    useEffect(() => {
        const timer = setTimeout(
            async () => {
                // setPaymentState(Math.random() > 0.5 ? "success" : "failure");
                // const p = await validSquarePayment(paymentId);
                setNode(() => document.getElementById(nodeId));
            },
            noDelay ? 0 : 1500
        );

        return () => clearTimeout(timer);
    }, []);
    if (node) return createPortal(<>{children}</>, node);
    return null;
}
