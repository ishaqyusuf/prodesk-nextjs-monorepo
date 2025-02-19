import { Button } from "@/components/ui/button";
import "./style.css";
import Link from "next/link";

interface Props {
    href?: string;
    children;
}

export default function NewFeatureBtn({ children, href }: Props) {
    return (
        <Button
            asChild
            // variant="ghost"
            size="sm"
            className="relative h-8  rounded-lg   gradient-border overflow-hidden"
        >
            <Link href={href} className="">
                {children}
            </Link>
        </Button>
    );
}
