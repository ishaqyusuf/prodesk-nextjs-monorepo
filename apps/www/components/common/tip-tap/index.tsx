"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import suggestion from "./suggestion";
import "./style.scss";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    useFormContext,
} from "react-hook-form";
interface Props {
    mentions?: any;
    value?;
    onChange?;
    readOnly?: boolean;
    label?: string;
    className?: string;
}
function Tiptap<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TOptionType = any
>({
    mentions,
    value: _value,
    className,
    onChange: _onChange,
    label,
    readOnly,
    control,
    name,
}: Partial<ControllerProps<TFieldValues, TName>> & Props) {
    function Render({ value, onChange }) {
        useEffect(() => {
            if (value != editor?.getHTML()) {
                editor?.commands.setContent(value);
            }
        }, [value]);
        const editor = useEditor({
            onUpdate(props) {
                let text = props.editor.getHTML();
                // console.log(text);
                onChange && onChange(text);
                // form && name && form.setValue(name, text as any);
            },
            editable: !readOnly,
            extensions: [
                StarterKit,
                Document,
                Paragraph,
                Text,
                mentions &&
                    Mention.configure({
                        HTMLAttributes: {
                            class: "mention",
                        },
                        suggestion: suggestion(mentions),
                    }),
                // CharacterCount.configure({
                //   limit,
                // }),
            ],
            content: value,
            editorProps: {
                attributes: {
                    class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl smx-auto focus:outline-none h-full flex-1",
                },
            },
        });
        return (
            <div className="grid gap-4">
                {label && <Label>{label}</Label>}
                <EditorContent
                    className={cn(
                        "px-3 py-2 mx-1 rounded-lg border",
                        "h-[30vh] overflow-auto  flex flex-col",
                        className,
                        editor?.isFocused &&
                            "ring-ring ring-2 ring-offset-background ring-offset-2"
                    )}
                    editor={editor}
                />
            </div>
        );
    }
    if (control && name)
        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => <Render {...field} />}
            />
        );
    return <Render value={_value} onChange={_onChange} />;
}

export default Tiptap;
