import { Menu } from "@/components/(clean-code)/menu";
import Portal from "@/components/_v1/portal";
import Button from "@/components/common/button";

export function ProductionHeader({}) {
    return (
        <Portal nodeId={"tabHeader"}>
            <div className="flex py-2 border-b">
                <div className="flex-1"></div>
                <Menu label="Options">
                    <Menu.Item
                        SubMenu={
                            <>
                                <Menu.Item>All Production</Menu.Item>
                                <Menu.Item>Assigned Production</Menu.Item>
                            </>
                        }
                    >
                        Complete
                    </Menu.Item>
                    <Menu.Item>Assign Pendings</Menu.Item>
                </Menu>
            </div>
        </Portal>
    );
}
