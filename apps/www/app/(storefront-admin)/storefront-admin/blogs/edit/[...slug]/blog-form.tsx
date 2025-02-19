"use client";

import { ServerPromiseType } from "@/types";
import getBlogAction from "../../_actions/get-blog-action";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import Btn from "@/components/_v1/btn";
import { saveBlogAction } from "../../_actions/save-blog";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";
import MDX from "@/components/common/mdx";
import { useDebounce } from "@/hooks/use-debounce";
import {
    deleteRealtimeMdx,
    saveRealtimeMdx,
} from "../../_actions/real-time-mdx";
import { toast } from "sonner";
import { generateRandomString } from "@/lib/utils";
import { redirect } from "next/navigation";
import MDXEdit from "@/components/common/mdx-editor";

type Prom = ServerPromiseType<typeof getBlogAction>;
interface Props {
    data: Prom["Item"];
    type;
    slug;
    renderSlug;
}
export default function BlogForm({ data, renderSlug, type, slug }: Props) {
    // const data = React.use(promise);
    if (!renderSlug) {
        let rs = generateRandomString();
        redirect(`/blogs/edit/${type}/${slug}?slug=${rs}`);
    }
    const form = useForm<Prom["Response"]>({
        defaultValues: data as any,
    });
    const content = form.watch("content");
    const debouncedQuery = useDebounce(content, 800);
    useEffect(() => {
        (async () => {
            await saveRealtimeMdx(type, slug, debouncedQuery);
        })();
    }, [debouncedQuery]);
    const [saving, startTransition] = useTransition();
    function save() {
        startTransition(async () => {
            await deleteRealtimeMdx(slug);
            await saveBlogAction(form.getValues());
            toast.success("Saved");
        });
    }

    return (
        <div>
            <Form {...form}>
                <div className="flex">
                    <div className="flex-1" />
                    <div>
                        <Btn onClick={save}>Save</Btn>
                    </div>
                </div>
                <div className="">
                    <div className="max-h-[80vh] overflow-auto px-4">
                        {/* <Textarea
                            {...form.register("content")}
                            className="h-full min-h-[90vh]"
                        /> */}
                        <MDXEdit
                            onChange={(e) => {
                                form.setValue("content", e);
                            }}
                            markdown={content}
                        />
                    </div>
                </div>
            </Form>
        </div>
    );
}
