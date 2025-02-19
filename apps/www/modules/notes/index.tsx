import { useEffect, useState } from "react";
import { TagFilters } from "./utils";
import { GetNotes, getNotesAction } from "./actions/get-notes-action";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/_v1/icons";
import { Form } from "@/components/ui/form";
import { useForm, useFormContext } from "react-hook-form";
import FormInput from "@/components/common/controls/form-input";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { toast } from "sonner";
import { createNoteAction } from "./actions/create-note-action";
import { SearchParamsType } from "@/components/(clean-code)/data-table/search-params";
import { formatDate } from "@/lib/use-day";
import { NoteTagStatus, NoteTagTypes } from "./constants";
import FormSelect from "@/components/common/controls/form-select";
import { Menu } from "@/components/(clean-code)/menu";
import { Progress } from "@/components/(clean-code)/progress";
import AutoComplete from "@/components/_v1/common/auto-complete";
import { getNoteSuggestionsAction } from "./actions/get-note-suggestions";
import { DatePicker } from "@/components/_v1/date-range-picker";
import { NoteProvider, useNoteContext } from "./context";
import { NoteForm } from "./note-form";
import { NoteLine } from "./note-line";

export interface NoteProps {
    tagFilters: TagFilters[];
    subject: string;
    headline?: string;
    typeFilters?: NoteTagTypes[];
    statusFilters?: NoteTagStatus[];
    admin?: boolean;
}
export default function Note(props: NoteProps) {
    const ctx = useNoteContext(props);
    const { notes } = ctx;

    return (
        <NoteProvider value={ctx}>
            <div className="">
                {!notes?.length ? (
                    <div className="py-2 flex justify-center items-center gap-4">
                        {/* <div>No Note</div> */}
                        <NoteForm />
                    </div>
                ) : (
                    <>
                        <div className="py-2 flex justify-end items-center gap-4">
                            {/* <div>No Note</div> */}
                            <NoteForm />
                        </div>
                        {notes?.map((note) => (
                            <NoteLine key={note.id} note={note} />
                        ))}
                    </>
                )}
            </div>
        </NoteProvider>
    );
}
