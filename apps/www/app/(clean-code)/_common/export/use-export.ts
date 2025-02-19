import useEffectLoader from "@/lib/use-effect-loader";
import { getExportConfigs } from "../../../../data-access/(clean-code)/export";
import { ExportForm, TypedExport } from "./type";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getExportForm, getIncludes, transformExportData } from "./config";
import { utils, writeFile } from "xlsx";
import { useSearchParams } from "next/navigation";
import { getExportData } from "./action";
import { toast } from "sonner";
import dayjs from "dayjs";
import { dotObject } from "../utils/utils";

export function useExport(type) {
    const _exports = useEffectLoader(async () => await getExportConfigs(type));

    return {
        _exports: _exports?.data || [],
    };
}

export function useExportForm(type, config?: TypedExport) {
    const form = useForm<ExportForm>({
        defaultValues: getExportForm(type, config),
    });
    const list = form.watch("cellList");
    useEffect(() => {
        // form.reset();
    }, []);
    const query = useSearchParams();
    async function startExport() {
        const _q = {};
        query.forEach((v, q) => {
            _q[q] = v;
        });
        const formVal = form.getValues();
        formVal.exports = dotObject.dot(formVal.exports);
        const includes = getIncludes(formVal);
        const data = await getExportData(type, _q, includes);

        if (!data.length) {
            toast.error("0 data found");
            return;
        }
        const dataToExport = transformExportData(formVal, data);
        // console.log({ dataToExport, data, includes });
        // return;
        let title = `${type}-export-${dayjs().format("DD-MM-YYYY")}`;
        let worksheetname = "";
        const workbook = utils.book_new();
        const worksheet = utils?.json_to_sheet(dataToExport, {
            cellStyles: true,
        });
        worksheet["!cols"] = [
            { width: 20 },
            { width: 20 },
            { width: 20 },
            { width: 20 },
            { width: 20 },
            { width: 20 },
            { width: 20 },
            { width: 20 },
        ];
        utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        writeFile(workbook, `${title}.xlsx`);
    }
    return { form, list, startExport };
}
