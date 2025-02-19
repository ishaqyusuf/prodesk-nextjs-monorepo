import { parseAsString } from "nuqs";
import { z } from "zod";

export const noteTypes = [
    "general",
    "payment",
    "production",
    "dispatch",
] as const;
export const noteStatus = ["public", "private"] as const;

export const tagNames = [
    "itemControlUID",
    "deliveryId",
    "salesId",
    "salesItemId",
    "salesAssignment",
    "status",
    "type",
] as const;
export type NoteTagNames = (typeof tagNames)[number];
export type NoteTagTypes = (typeof noteTypes)[number];
export type NoteTagStatus = (typeof noteStatus)[number];
export const noteSchema = z.object({
    "note.status": z.enum(noteStatus).optional(),
    "note.type": z.enum(noteTypes).optional(),
    "note.salesId": z.string().optional(),
    "note.itemControlUID": z.string().optional(),
    "note.deliveryId": z.string().optional(),
    "note.salesItemId": z.string().optional(),
    "note.salesAssignment": z.string().optional(),
});
export type FilterKeys = keyof typeof noteSchema._type;
export const noteParamsParser: {
    [k in FilterKeys]: any;
} = {
    "note.status": parseAsString,
    "note.type": parseAsString,
    "note.salesId": parseAsString,
    "note.itemControlUID": parseAsString,
    "note.deliveryId": parseAsString,
    "note.salesItemId": parseAsString,
    "note.salesAssignment": parseAsString,
};
