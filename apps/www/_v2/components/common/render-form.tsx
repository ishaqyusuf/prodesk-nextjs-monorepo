"use client";

import { Form } from "@/components/ui/form";
import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import { FormProvider, useFormContext } from "react-hook-form";
let reRender = 0;
export default function RenderForm({
    children,
    ...props
}: {
    children?;
} & any) {
    const form = useFormContext();
    const isProd = env.NEXT_PUBLIC_NODE_ENV === "production";
    if (!isProd) reRender++;
    // else return <>{children}</>;
    if (!form)
        return <ContextRenderForm {...props}>{children}</ContextRenderForm>;
    // form.formState.isDirty
    return (
        <>
            <div
                className={cn(
                    "flex",
                    isProd
                        ? "hidden"
                        : "fixed top-0 right-[50%] bg-red-500 rounded-full p-1 text-white text-xs  font-semibold px-2 leading-none z-[9999]"
                )}
            >
                {/* <p>Render: {reRender}</p> */}
                <p>
                    Dirty Fields:{" "}
                    {Object.keys(form.formState.dirtyFields)?.length}
                </p>
                <p>Submission: {form.formState.submitCount}</p>
                {/* <p>Submission: {form.formState.}</p> */}
            </div>
            <Form {...props}>{children}</Form>
        </>
    );
}
let reCtxRender = 0;
function ContextRenderForm({ children, ...props }) {
    reCtxRender++;
    const isProd = env.NEXT_PUBLIC_NODE_ENV === "production";
    return (
        <FormProvider {...(props as any)}>
            <div
                className={cn(
                    "flex space-x-2",
                    isProd && "hidden",
                    "fixed top-0 right-[50%] bg-red-500 rounded-full p-1 text-white text-xs  font-semibold px-2 leading-none z-[9999]"
                )}
            >
                <p>Render: {reCtxRender}</p>
                <p>
                    Dirty Fields:{" "}
                    {Object.keys(props.formState.dirtyFields)?.length}
                </p>
                <p>Submission: {props.formState.submitCount}</p>
                {/* <p>Submission: {form.formState.}</p> */}
            </div>
            <Form {...(props as any)}>{children}</Form>
        </FormProvider>
    );
}
