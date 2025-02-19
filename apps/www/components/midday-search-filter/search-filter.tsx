"use client";

import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Icons } from "../_v1/icons";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface Props {
    filters;
    setFilters;
    defaultSearch;
    placeholder?;
}

export function MiddaySearchFilter({
    filters,
    placeholder,
    setFilters,
    defaultSearch,
}: Props) {
    const [prompt, setPrompt] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [streaming, setStreaming] = useState(false);
    useHotkeys(
        "esc",
        () => {
            setPrompt("");
            setFilters(defaultSearch);
            setIsOpen(false);
        },
        {
            enableOnFormTags: true,
            enabled: Boolean(prompt),
        }
    );

    useHotkeys("meta+s", (evt) => {
        evt.preventDefault();
        inputRef.current?.focus();
    });

    useHotkeys("meta+f", (evt) => {
        evt.preventDefault();
        setIsOpen((prev) => !prev);
    });

    const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;

        if (value) {
            setPrompt(value);
        } else {
            setFilters(defaultSearch);
            setPrompt("");
        }
    };
    const handleSubmit = async () => {
        // If the user is typing a query with multiple words, we want to stream the results
        setFilters({ q: prompt.length > 0 ? prompt : null });
    };
    const hasValidFilters =
        Object.entries(filters).filter(
            ([key, value]) => value !== null && key !== "q"
        ).length > 0;
    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex space-x-4 items-center">
                <form
                    className="relative"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Icons.Search className="absolute pointer-events-none left-3 top-[11px]" />
                    <Input
                        ref={inputRef}
                        placeholder={placeholder}
                        className="pl-9 w-full md:w-[350px] pr-8"
                        value={prompt}
                        onChange={handleSearch}
                        autoComplete="off"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                    <DropdownMenuTrigger asChild>
                        <button
                            onClick={() => setIsOpen((prev) => !prev)}
                            type="button"
                            className={cn(
                                "absolute z-10 right-3 top-[10px] opacity-50 transition-opacity duration-300 hover:opacity-100",
                                hasValidFilters && "opacity-100",
                                isOpen && "opacity-100"
                            )}
                        >
                            <Icons.Filter />
                        </button>
                    </DropdownMenuTrigger>
                </form>
            </div>
        </DropdownMenu>
    );
}
