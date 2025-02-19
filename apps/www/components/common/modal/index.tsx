"use client";

import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { _modal, ModalContextProps, ModalType, useModal } from "./provider";
import {
    Sheet,
    SheetContent,
    SheetContentProps,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import Btn from "@/components/_v1/btn";
import { Icons } from "@/components/_v1/icons";
import { useFormContext } from "react-hook-form";
import { PrimitiveDivProps } from "@/types/type";
import { ScrollArea } from "@/components/ui/scroll-area";

function BaseModal({
    children,
    showModal,
    setShowModal,
    type,
}: {
    children: React.ReactNode;
    showModal: boolean;
    type: ModalType;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setShowModal(false);
            }
        },
        [setShowModal]
    );
    const Modal = type == "modal" ? Dialog : Sheet;
    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    function onOpenChange(e) {
        setShowModal(e);
        if (!e) {
            setTimeout(() => {
                document.body.style.pointerEvents = "";
            }, 200);
        }
    }
    return (
        <>
            {
                <>
                    {
                        <>
                            <Modal open={showModal} onOpenChange={onOpenChange}>
                                {/* <ModalContent> {children}</ModalContent> */}
                                {children}
                            </Modal>
                        </>
                    }
                </>
            }
        </>
    );
}
const contentVariants = cva(``, {
    variants: {
        size: {
            sm: "w-full sm:w-[350px] lg:w-[350px]",
            md: "w-full lg:w-[500px]",
            lg: "w-full lg:w-[700px]",
            xl: "w-full lg:w-[900px]",
            "2xl": "",
            none: "w-full lg:w-auto",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
interface ContentProps
    extends PrimitiveDivProps,
        VariantProps<typeof contentVariants> {
    side?: SheetContentProps["side"];
}
function Content({ children, size, ...props }: ContentProps) {
    const modal = useModal();
    const Content = modal?.data?.type == "modal" ? DialogContent : SheetContent;

    return (
        <Content
            aria-describedby=""
            {...props}
            className={cn(
                contentVariants({ size }),
                props.className,
                "sm:max-w-none"
            )}
        >
            {children}
        </Content>
    );
}
function _ScrollArea({ children, className = "" }) {
    return (
        <ScrollArea className={cn("flex-1 -mx-6 px-6", className)}>
            {children}
        </ScrollArea>
    );
}
interface HeaderProps {
    title?: string | any;
    subtitle?: string | any;
    onBack?;
    icon?: keyof typeof Icons;
    children?;
    secondary?: boolean;
}
function Header({
    title,
    secondary,
    icon,
    subtitle,
    onBack,
    children,
}: HeaderProps) {
    // const modal = useModal();
    const isModal = _modal?.data?.type == "modal";
    const [Header, Title, Subtitle] = isModal
        ? [DialogHeader, DialogTitle, DialogDescription]
        : [SheetHeader, SheetTitle, SheetDescription];
    const Icon = Icons[icon] || undefined;
    return (
        <Header className="">
            <div className="flex flex-1">
                <div className={cn(onBack && "flex flex-1 sm:space-x-4")}>
                    {onBack && !secondary && (
                        <div>
                            <Button
                                onClick={onBack}
                                variant={"secondary"}
                                size={"icon"}
                            >
                                <Icons.chevronLeft className="size-4" />
                            </Button>
                        </div>
                    )}
                    <div className="flex-1 flex-col justify-start">
                        <div className="flex items-center">
                            {Icon && <Icon className="size-4 mr-4" />}
                            {title && (
                                <Title className="line-clamp-1">{title}</Title>
                            )}
                        </div>
                        {subtitle && (
                            <Subtitle className="whitespace-normal">
                                {subtitle}
                            </Subtitle>
                        )}
                    </div>
                    {onBack && secondary && (
                        <div className="mr-4">
                            <Button
                                onClick={onBack}
                                variant={"secondary"}
                                size={"icon"}
                            >
                                <Icons.chevronRight className="size-4" />
                            </Button>
                        </div>
                    )}
                </div>
                {children}
            </div>
        </Header>
    );
}
interface FooterProps {
    children?;
    onSubmit?(modal: ModalContextProps);
    onCancel?(modal: ModalContextProps);
    submitText?: string;
    cancelBtn?: boolean;
    cancelText?: string;
    cancelVariant?: ButtonProps["variant"];
    submitVariant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    className?;
    // cancel?: ButtonProps["size"];
}
function Footer({
    children,
    onSubmit,
    onCancel,
    submitText = "Submit",
    cancelBtn,
    size = "lg",
    cancelText = "Cancel",
    cancelVariant = "secondary",
    submitVariant = "default",
    className,
}: FooterProps) {
    const isModal = _modal?.data?.type == "modal";
    const [Footer] = isModal ? [DialogFooter] : [SheetFooter];
    const form = useFormContext();
    return (
        <Footer className={cn("flex shadow-lgs space-x-4", className)}>
            {children}
            {(onSubmit || cancelBtn) && (
                <div className="flex justify-end space-x-4">
                    {cancelBtn && (
                        <Button
                            variant={cancelVariant}
                            size={size}
                            onClick={() => {
                                onCancel ? onCancel(_modal) : _modal?.close();
                            }}
                        >
                            {cancelText}
                        </Button>
                    )}
                    {onSubmit && (
                        <Btn
                            variant={submitVariant}
                            isLoading={_modal?.loading}
                            size={size}
                            onClick={async () => {
                                if (form) {
                                    const resp = await form.trigger();
                                    // console.log(resp);
                                    if (!resp) return;
                                }
                                _modal?.startTransition(() => onSubmit(_modal));
                            }}
                        >
                            {submitText}
                        </Btn>
                    )}
                </div>
            )}
        </Footer>
    );
}

function MultiPane({ children }) {
    return (
        <Content size="none" className="side-modal-rounded">
            <div className="flex-1 flex" id="">
                <div className="" id="multiPane"></div>
                {children}
            </div>
        </Content>
    );
}
function SecondaryPane({ children }) {
    return { children };
    // return (
    //     <Portal noDelay nodeId={"multiPane"}>
    //         <div className="w-[600px] flex flex-col side-modal-rounded-h-content mr-2">
    //             {children}
    //         </div>
    //     </Portal>
    // );
}
function Pane({ children }) {
    return (
        <div className="h-auto w-full sm:w-[600px] flex flex-col side-modal-rounded-h-content">
            {children}
        </div>
    );
}

export const multiPaneNode = () => document.getElementById("multiPane");
export const openSecondaryPane = (component, id) => {
    const node = multiPaneNode();

    // return _modal.secondaryPaneIds?.includes(id)
    //     ? createPortal(component, node)
    //     : null;
};
export default Object.assign(BaseModal, {
    Content,
    Header,
    Footer,
    ScrollArea: _ScrollArea,
    MultiPane,
    Pane,
    SecondaryPane,
});
