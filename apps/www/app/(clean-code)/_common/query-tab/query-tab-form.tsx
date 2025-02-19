import Modal from "@/components/common/modal";
import { _modal } from "@/components/common/modal/provider";
import { useForm } from "react-hook-form";
import { QueryTab } from "./provider";
import { Form } from "@/components/ui/form";
import { useQueryTabStore } from "./data-store";
import FormInput from "@/components/common/controls/form-input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { saveDataQueryUseCase } from "@/use-cases/query-tab-use-case";
import QueryString from "qs";

interface Props {
    ctx?: QueryTab;
    data?: { id?; title?; query };
}
export const openQueryTab = (ctx: Props["ctx"], data: Props["data"]) => {
    _modal.openModal(<QueryTabForm ctx={ctx} data={data} />);
};
export function QueryTabForm({ ctx, data }: Props) {
    const form = useForm({
        defaultValues: {
            id: null,
            ...data,
            private: true,
            default: false,
        },
    });
    const store = useQueryTabStore();
    async function save() {
        const data = form.getValues();
        const result = await saveDataQueryUseCase({
            tab: {
                data: {
                    page: store.pageInfo.page,
                    query: QueryString.stringify(data.query),
                    private: data.private,
                    default: data.default,
                    title: data.title,
                },
                id: data.id,
            },
            index: {
                data: {},
                id: null,
            },
        });
        ctx.loadQueries(store.pageInfo.page);
        _modal.close();
    }
    return (
        <Modal.Content size="md">
            <Modal.Header title="Query Tab" />
            <Form {...form}>
                <div className="">
                    <FormInput
                        size="sm"
                        label="Tab Title"
                        control={form.control}
                        name="title"
                    />
                    <Table className="">
                        <TableBody>
                            {Object.entries(data.query).map(([k, v]) => (
                                <TableRow className="" key={k}>
                                    <TableCell>{k}</TableCell>
                                    <TableCell>{v as any}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Form>
            <Modal.Footer submitText="Save" onSubmit={save} />
        </Modal.Content>
    );
}
