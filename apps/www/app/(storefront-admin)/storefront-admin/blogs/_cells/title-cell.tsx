import Link from "next/link";
import { BlogCells } from "../blogs-table";
import { TableCol } from "@/components/common/data-table/table-cells";

export function TitleCell({ item }: BlogCells) {
    return (
        <Link href={`/blogs/edit/${item.slug}`}>
            <TableCol.Primary>{item.title}</TableCol.Primary>
        </Link>
    );
}
