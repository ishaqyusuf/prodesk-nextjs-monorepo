import Modal from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { DeliveryOption } from "@/types/sales";
import { useState } from "react";

interface Props {
    type?: DeliveryOption;
}
export default function DispatchModal(props: Props) {
    const isPickup = props.type == "pickup";
    const [tab, setTab] = useState("select");
    function inspect() {}
    return (
        <Modal.Content>
            <Modal.Header
                onBack={() => {}}
                title="Dispatch"
                subtitle="lorem ipsum"
            />
            <Tabs value={tab}>
                <TabsContent value="select"></TabsContent>
                <TabsContent value="inspect"></TabsContent>
                <TabsContent value="recipient"></TabsContent>
            </Tabs>
            {tab != "select" && (
                <Modal.Footer>
                    {tab == "inspect" && (
                        <Button onClick={inspect}>Proceed</Button>
                    )}
                    {tab == "recipient" && (
                        <Button onClick={inspect}>Proceed</Button>
                    )}
                </Modal.Footer>
            )}
        </Modal.Content>
    );
}
