import ProjectFormSection from "./project-form-section";
import { useJobSubmitCtx } from "./use-submit-job";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
    PrimaryCellContent,
    SecondaryCellContent,
} from "@/components/_v1/columns/base-columns";
import Money from "@/components/_v1/money";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

export default function TaskDetailsTab({}) {
    const ctx = useJobSubmitCtx();
    const [homeCosting, type] = ctx.form.watch(["home.costing", "job.type"]);
    // const cost = useJobCostList(ctx.type);
    // const form = useFormContext();
    // useEffect(() => {},[])
    return (
        <ScrollArea className="h-[400px] pr-4 grid gap-2">
            <ProjectFormSection />
            {/* {ctx.costList?.fields?.length} */}
            <div className={cn(!ctx.costList?.fields?.length && "hidden")}>
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="px-1">Task</TableHead>
                            <TableHead className="px-1">Qty</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(ctx.costList?.fields as any)?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <PrimaryCellContent>
                                        {row.title}
                                    </PrimaryCellContent>
                                    <SecondaryCellContent>
                                        <Money value={row.cost} />
                                        {" per unit"}
                                    </SecondaryCellContent>
                                </TableCell>
                                <TableCell className="px-1">
                                    <div className="flex items-center space-x-0.5">
                                        <FormField
                                            name={`job.meta.costData.${row.uid}.qty`}
                                            control={ctx.form.control}
                                            render={({ field, fieldState }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className={cn(
                                                                "w-16 h-8 hiddens",
                                                                fieldState.error &&
                                                                    "border-red-400"
                                                            )}
                                                            type="number"
                                                            min={0}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        {ctx.isAdmin &&
                                            homeCosting?.[row.uid] && (
                                                <Label className="px-1">
                                                    {" /"}
                                                    {homeCosting?.[row.uid]}
                                                </Label>
                                            )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </ScrollArea>
    );
}
