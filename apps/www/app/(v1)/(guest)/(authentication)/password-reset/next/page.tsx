import { type Metadata } from "next";
import { env } from "@/env.mjs";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ResetPasswordStep2Form } from "@/components/_v1/forms/reset-password-form-step2";
import { Shell } from "@/components/_v1/shells/shell";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: "Reset Password",
    description: "Enter your email to reset your password",
};

export default function ResetPasswordStep2Page() {
    return (
        <Shell className="max-w-lg">
            <Card>
                <CardHeader className="space-y-1">
                    <div className="">
                        <Link
                            aria-label="Reset password"
                            href="/signin"
                            className="text-sm text-primary underline-offset-4 transition-colors hover:underline inline-flex items-center"
                        >
                            <ArrowLeft className="inline-flex w-4 mr-2" /> Sign
                            In
                        </Link>
                    </div>
                    <CardTitle className="text-2xl">Reset password</CardTitle>
                    <CardDescription>
                        Enter your email address and we will send you a
                        verification code
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ResetPasswordStep2Form />
                </CardContent>
            </Card>
        </Shell>
    );
}
