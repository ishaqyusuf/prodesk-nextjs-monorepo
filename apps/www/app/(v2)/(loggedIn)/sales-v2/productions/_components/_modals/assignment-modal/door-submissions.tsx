"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAssignmentData } from ".";

import ConfirmBtn from "@/components/_v1/confirm-btn";
import {
    __revalidateProductions,
    _deleteAssignment,
    _deleteAssignmentSubmission,
    _deleteAssignmentSubmissions,
} from "./_action/actions";
import { useAssignment } from "./use-assignment";

import { TableCol } from "@/components/common/data-table/table-cells";
import { _revalidate } from "@/app/(v1)/_actions/_revalidate";

interface Props {
    groupIndex;
    doorIndex;
}
export default function DoorSubmissions({ doorIndex, groupIndex }: Props) {
    const data = useAssignmentData();
    const group = data.data.doorGroups[groupIndex];
    const modal = useAssignment(
        data.data.isProd ? { type: "prod" } : undefined
    );
    if (!group) return null;

    const salesDoor = group.salesDoors[doorIndex];
    const submissions = salesDoor?.submissions;
    if (!submissions?.length && salesDoor?.assignments?.length)
        return (
            <div className="flex justify-center text-red-500 py-2 bg-slate-50">
                Assignments pending submission
            </div>
        );
    if (!submissions?.length) return null;

    async function deleteSubmission(submission) {
        await _deleteAssignmentSubmission(submission.id);
        modal.open(data.data.id);
        await __revalidateProductions();
    }
    return (
        <div className="mx-4 ml-10">
            <Table className="">
                <TableHeader className="bg-slate-100">
                    <TableHead>Submission</TableHead>

                    <TableHead>Qty</TableHead>

                    <TableHead>Note</TableHead>

                    <TableHead></TableHead>
                </TableHeader>
                <TableBody>
                    {submissions?.map((submission) => (
                        <TableRow key={submission.id} className="">
                            <TableCell>
                                {!data.data.isProd ? (
                                    <></>
                                ) : (
                                    <p>{submission.assignedTo?.name}</p>
                                )}
                                <TableCol.Date>
                                    {submission.createdAt}
                                </TableCol.Date>
                            </TableCell>

                            <TableCell>
                                <TableCol.Primary>
                                    {submission.qty ||
                                        submission.lhQty ||
                                        submission.rhQty}
                                    {group.doorConfig.singleHandle ||
                                    !group.isDyke
                                        ? ""
                                        : submission.rhQty
                                        ? " RH"
                                        : " LH"}
                                </TableCol.Primary>
                            </TableCell>

                            <TableCell>{submission.note || "-"}</TableCell>

                            <TableCell className="flex gap-2 justify-end items-center">
                                {data.data.isProd ? (
                                    <></>
                                ) : (
                                    <ConfirmBtn
                                        trash
                                        size={"icon"}
                                        onClick={() =>
                                            deleteSubmission(submission)
                                        }
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
