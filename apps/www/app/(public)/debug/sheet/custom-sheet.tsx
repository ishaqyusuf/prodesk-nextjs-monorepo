import { Menu } from "@/components/(clean-code)/menu";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function CustomSheetDebugModal({}) {
    return (
        <Modal.Content>
            <Table>
                <TableBody>
                    {Array(10)
                        .fill(null)
                        .map((a, i) => (
                            <TableRow key={i}>
                                <TableCell>Item {i}</TableCell>
                                <TableCell>
                                    <Menu>
                                        <Input />
                                        <Menu.Item>Item...</Menu.Item>
                                        <Button>Submit</Button>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Modal.Content>
    );
}
