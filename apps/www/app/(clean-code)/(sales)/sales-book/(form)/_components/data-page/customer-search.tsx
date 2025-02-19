import {
    AddressSearchType,
    getAddressFormUseCase,
    searchAddressUseCase,
} from "@/app/(clean-code)/(sales)/_common/use-case/sales-address-use-case";
import { Menu } from "@/components/(clean-code)/menu";
import { Icons } from "@/components/_v1/icons";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@/hooks/use-debounce";
import { Search, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFormDataStore } from "../../_common/_stores/form-data-store";
import {
    AddressForm,
    SalesFormZusData,
} from "@/app/(clean-code)/(sales)/types";
import { SearchAddressType } from "@/app/(clean-code)/(sales)/_common/data-access/sales-address-dta";
import { SettingsClass } from "../../_utils/helpers/zus/settings-class";

interface Props {
    addressType: string;
}
export function CustomerSearch({ addressType }) {
    const [q, setSearch] = useState("");
    const debouncedQuery = useDebounce(q, 800);
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState<AddressSearchType[]>([]);
    const zus = useFormDataStore();
    const disabled = addressType == "shipping" && zus.metaData.sameAddress;
    const setting = useMemo(() => {
        return new SettingsClass();
    }, []);
    function selectAddress(address: SearchAddressType) {
        console.log(address);

        setOpen(false);
        getAddressFormUseCase(address.id).then((response) => {
            zus.dotUpdate(
                `metaData.${addressType}` as any,
                {
                    address1: response.address1,
                    city: response.city,
                    email: response.email || "",
                    name: response.name || "",
                    primaryPhone: response.phoneNo || "",
                    secondaryPhone: response.phoneNo2 || "",
                    state: response.state || "",
                    zipCode: response.meta?.zip_code || "",
                    id: response.id,
                } as AddressForm
            );
            zus.dotUpdate("metaData.customer", {
                id: response?.customer?.id,
                businessName: response?.customer?.businessName || "",
                isBusiness: response?.customer?.businessName != null,
            });
            if (address.salesProfile?.id) {
                zus.dotUpdate(
                    "metaData.salesProfileId",
                    address.salesProfile?.id
                );
                setting.salesProfileChanged();
            }
            if (address.taxProfile?.taxCode) {
                zus.dotUpdate(
                    "metaData.tax.taxCode",
                    address.taxProfile?.taxCode
                );
                setting.taxCodeChanged();
            }
        });
    }
    useEffect(() => {
        if (debouncedQuery)
            searchAddressUseCase(debouncedQuery).then((res) => {
                setResult(res || []);
            });
    }, [debouncedQuery]);
    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        disabled={disabled}
                        aria-expanded={open}
                        size="sm"
                        variant="outline"
                        className="h-8"
                    >
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="end">
                    <Command shouldFilter={false}>
                        <CommandInput
                            value={q}
                            onValueChange={(v) => {
                                setSearch(v);
                            }}
                            placeholder="Search Address..."
                        />
                        <CommandList></CommandList>
                    </Command>
                    <ScrollArea className="max-h-[30vh] max-w-[400px] overflow-auto">
                        <div className="divide-y">
                            {result?.map((address, key) => (
                                <button
                                    key={key}
                                    onClick={() => selectAddress(address)}
                                    className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground space-y-1"
                                >
                                    <Label className="text-sm font-medium text-primary truncate">
                                        {address.name}
                                    </Label>
                                    <div className="text-xs text-muted-foreground truncate">
                                        {address.phoneAddress}
                                    </div>
                                    <div className="text-xs text-muted-foreground flex flex-wrap gap-1">
                                        {address.taxProfile?.title && (
                                            <span className="px-1 py-0.5 bg-muted rounded text-muted-foreground">
                                                {address.taxProfile.title}
                                            </span>
                                        )}
                                        {address.salesProfile?.name && (
                                            <span className="px-1 py-0.5 bg-muted rounded text-muted-foreground">
                                                {address.salesProfile.name}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    );
}
