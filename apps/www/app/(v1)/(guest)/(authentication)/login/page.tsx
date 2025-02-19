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
import QuickLogin from "@/components/_v1/quick-login";
import { SignInForm } from "./signin-form";
import { __isProd } from "@/lib/is-prod-server";
export const metadata: Metadata = {
    title: "Sign In - GND Prodesk",
    description: "",
};

export default async function SigninPage() {
    return (
        <Shell className="sm:max-w-lg">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Sign in</CardTitle>
                    <CardDescription>
                        Enter your email & password to continue
                    </CardDescription>
                    {!__isProd && <QuickLogin />}
                </CardHeader>
                <CardContent className="grid gap-4">
                    <SignInForm />
                </CardContent>
                <CardFooter className="flex flex-wrap items-center space-x-4 justify-between gap-2">
                    <Link
                        aria-label="Reset password"
                        href="/dealer/signup"
                        className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
                    >
                        Signup as Dealer
                    </Link>
                    <div className="text-sm text-muted-foreground"></div>
                    <Link
                        aria-label="Reset password"
                        href="/login/password-reset"
                        className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
                    >
                        Reset password
                    </Link>
                </CardFooter>
            </Card>
        </Shell>
    );
}
