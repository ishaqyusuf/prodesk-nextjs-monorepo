"use client";

import React, { useTransition } from "react";

import { useRouter } from "next/navigation";

import { _useAsync } from "@/lib/use-async";
import BaseModal from "./base-modal";
import { EmployeeProfile } from "@prisma/client";

import Image from "next/image";

export default function ImgModal() {
    return (
        <BaseModal<{ src: string; alt: string }>
            className="w-[800px] h-[550px]"
            onOpen={(data) => {}}
            onClose={() => {}}
            modalName="img"
            Content={({ data }) => (
                <div>
                    <Image
                        className="border-2 rounded cursor-pointer"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={data?.src as any}
                        alt={data?.alt as any}
                    />
                </div>
            )}
        />
    );
}
