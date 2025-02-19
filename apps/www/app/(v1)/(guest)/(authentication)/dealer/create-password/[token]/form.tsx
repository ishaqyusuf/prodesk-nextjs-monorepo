"use client";

import * as React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/_v1/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { _useAsync } from "@/lib/use-async";
import { useRouter } from "next/navigation";
import FormInput from "@/components/common/controls/form-input";
import { toast } from "sonner";
import { createDealerPassword, VerifyToken } from "./action";
import {
    createDealerPasswordSchema,
    CreateDealerPasswordSchema,
} from "./validation";

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {
    val: VerifyToken;
}

export default function ClientForm({ className, ...props }: SignInFormProps) {
    const resp = props.val;
    React.useEffect(() => {
        console.log(resp);
    }, [resp]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any>("");
    const form = useForm<CreateDealerPasswordSchema>({
        resolver: zodResolver(createDealerPasswordSchema),
        defaultValues: {
            token: resp.token,
        },
    });
    const { data: session } = useSession();

    const [isPending, startTransition] = React.useTransition();
    const { register, handleSubmit } = form;
    const [submitted, setSubmitted] = React.useState(false);

    const router = useRouter();
    async function onSubmit(e) {
        const data = form.getValues();
        startTransition(async () => {
            setError(null);
            try {
                const resp = await createDealerPassword(data);
                console.log(resp);
                toast.success("Password created");
                // router.forward("success");
            } catch (error) {
                if (error instanceof Error) toast.error(error.message);
            }
        });
    }
    return (
        <Form {...form}>
            <form
                onSubmit={(...args) =>
                    void form.handleSubmit(onSubmit)(...args)
                }
                className="grid gap-4"
            >
                <FormInput
                    size="sm"
                    control={form.control}
                    name="password"
                    type="password"
                    label="Password"
                />
                <FormInput
                    size="sm"
                    control={form.control}
                    name="confirmPassword"
                    type="password"
                    label="Comfirm Password"
                />
                <Button type="submit" disabled={isPending}>
                    {isPending && (
                        <Icons.spinner
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Submit
                    <span className="sr-only">Submit</span>
                </Button>
            </form>
        </Form>
    );
}
