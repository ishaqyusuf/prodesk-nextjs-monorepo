"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardFooter,
    Card,
    CardHeader,
} from "@/components/ui/card";
import { Icons } from "@/components/_v1/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/common/controls/form-input";
import { Form } from "@/components/ui/form";

export default function CustomerLoginPage() {
    const form = useForm({
        resolver: zodResolver(
            z.object({
                email: z.string().min(1),
                password: z.string().min(1),
                type: z.string().min(1),
            })
        ),
        defaultValues: {
            email: "",
            password: "",
            type: "shop",
        },
    });
    async function submit(data) {}
    return (
        <div className="  bg-gray-50 dark:bg-gray-900">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)}>
                    <div className="mx-auto px-4  min-h-[70vh]  flex flex-col justify-center max-w-3xl space-y-8">
                        <div className="flex items-center space-x-4">
                            <Icons.logoLg />
                            <div className="text-2xl font-bold">
                                Welcome Back!
                            </div>
                        </div>
                        <Card>
                            <CardHeader />
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <FormInput
                                        label="Email"
                                        control={form.control}
                                        placeholder="m@example.com"
                                        type="email"
                                        name="email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormInput
                                        control={form.control}
                                        name="password"
                                        type="password"
                                        label="Password"
                                    />
                                </div>
                                <Button className="w-full">Login</Button>
                            </CardContent>
                            <CardFooter className="text-center">
                                <div className="text-sm">
                                    {"Don't"} have an account?
                                    <Link
                                        className="underline ml-1"
                                        href="/register"
                                    >
                                        Create an Account
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    );
}
