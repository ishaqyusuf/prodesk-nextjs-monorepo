import { Shell } from "@/components/_v1/shells/shell";
import { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Form from "./form";
import { verifyToken } from "./action";
import dayjs from "dayjs";
export const metadata: Metadata = {
    title: "Sign Up - GND Prodesk",
    description: "",
};

export default async function CreatePasswordPage({ params }) {
    const token = params.token;
    const ver = await verifyToken(token);
    let msg = null;
    if (!ver) msg = "Invalid Token";
    if (ver.consumedAt) msg = "Token already used";
    if (dayjs().diff(ver.expiredAt, "m") > 0) msg = "Token Expired";
    // if (msg)
    //     return (
    //         <div>
    //             <span>{msg}</span>
    //         </div>
    //     );
    return (
        <Shell className="sm:max-w-2xl">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">
                        Create Your Password
                    </CardTitle>
                    <CardDescription>
                        To complete your account setup, please create a secure
                        password. Your password helps protect your account and
                        ensures that only you can access your personal
                        information and services.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Form val={ver} />
                </CardContent>
                <CardFooter className="flex flex-wrap items-center space-x-4 justify-between gap-2">
                    <Link
                        aria-label="Reset password"
                        href="/login"
                        className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
                    >
                        Back to signin
                    </Link>
                    <div className="text-sm text-muted-foreground"></div>
                </CardFooter>
            </Card>
        </Shell>
    );
}
