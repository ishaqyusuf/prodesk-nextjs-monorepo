"use client";

import React, { useEffect, useTransition } from "react";

import { useRouter } from "next/navigation";

import { _useAsync } from "@/lib/use-async";
import BaseModal from "./base-modal";
import { toast } from "sonner";

import { useAppSelector } from "@/store";
import { loadStaticList } from "@/store/slicers";

import { ScrollArea } from "../../ui/scroll-area";
import { loadStatic1099Contractors } from "@/app/(v1)/_actions/hrm/get-employess";
import { _changeWorker } from "@/app/(v1)/_actions/hrm-jobs/job-actions";
import { ExtendedHomeTasks } from "@/types/community";
import { Button } from "../../ui/button";
import {
    AssignJobProps,
    _assignJob,
    _unassignTask,
} from "@/app/(v1)/_actions/community-job/_assign-jobs";
import { closeModal, openModal } from "@/lib/modal";

export default function AssignTaskModal() {
    const techEmployees = useAppSelector((s) => s.slicers.staticInstallers);
    useEffect(() => {
        loadStaticList(
            "staticInstallers",
            techEmployees,
            loadStatic1099Contractors
        );
    }, []);
    async function unassign(data: ExtendedHomeTasks) {
        await _unassignTask({
            taskId: data?.id,
            jobId: data.jobId,
        });
        closeModal();
        toast.success("Task unassigned succesfully!");
    }
    async function submit(user, data: ExtendedHomeTasks) {
        const payload: AssignJobProps = {
            taskId: data.id,
            projectTitle: `${data.__taskSubtitle}`,
            __taskSubtitle: data.taskName,
            userId: user.id,
            projectId: data.projectId,
            homeId: data.homeId,
            addon: data.addon ? data?.project?.meta?.addon || 0 : 0,
            jobType: "install",
            oldUserId: data.assignedToId,
            jobId: data.jobId,
        };

        const resp = await _assignJob(payload);
        if (resp?.jobs) {
            closeModal();
            // setTimeout(() => {
            openModal("verifyTaskJobs", {
                task: data,
                jobs: resp.jobs,
                payload,
            });
            // }, 2000);
            return;
        }
        closeModal();
        toast.success("Job Assigned!");
    }
    return (
        <BaseModal<ExtendedHomeTasks>
            className="sm:max-w-[550px]"
            onOpen={(data) => {
                console.log(data);
            }}
            onClose={() => {}}
            modalName="assignTask"
            Title={({ data }) => <>{data?.taskName}</>}
            Subtitle={({ data }) => <>{data?.__taskSubtitle}</>}
            Content={({ data }) => (
                <div>
                    <ScrollArea className="h-[350px] pr-4">
                        <div className="flex flex-col divide-y">
                            {data?.jobId && (
                                <Button
                                    onClick={() => unassign(data as any)}
                                    variant={"destructive"}
                                    className=""
                                >
                                    <p className="flex w-full">Unassign</p>
                                </Button>
                            )}
                            {techEmployees?.map((user) => (
                                <Button
                                    onClick={() => submit(user, data as any)}
                                    variant={"ghost"}
                                    key={user.id}
                                    className=""
                                >
                                    <p className="flex w-full">{user.name}</p>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            )}
        />
    );
}
