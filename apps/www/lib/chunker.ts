import { toast } from "sonner";

interface Props {
    worker;
    list;
    chunkSize?;
}
export function chunker({ worker, list, chunkSize = 50 }: Props) {
    let index = 0;
    // const chunkSize = 50;
    let toastId;
    let cancel = false;

    function cancelProcessing() {
        cancel = true;
        toast.dismiss(toastId);
        toast("Processing canceled.");
    }

    async function processNextChunk() {
        if (cancel) return;

        if (index >= list.length) {
            toast.dismiss(toastId);
            toast.success("Processing complete!");
            return;
        }

        const chunk = list.slice(index, index + chunkSize);

        // Process the current chunk
        //    await processChunkUseCase(chunk);
        console.log(`PROCESSING: ${index}`, chunk);
        const resp = await worker(chunk);

        console.log(resp);
        // await new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve("");
        //         console.log(
        //             `PROCESSING COMPLETED: ${index}`
        //         );
        //     }, 4000);
        // });

        index += chunkSize;

        toastId = toast(
            `Processing items ${index - chunkSize + 1} to ${index} of ${
                list?.length
            }`,
            {
                action: {
                    label: "Cancel",
                    onClick: cancelProcessing,
                },
                duration: 2000,
            }
        );
        // await processNextChunk();
        setTimeout(processNextChunk, 1000); // Automatically process the next chunk
    }
    toast.promise(
        processNextChunk(),
        {
            loading: "Processing...",
            success: "Processing started...",
            error: "Error during processing!",
        }
        // { id: "chunk-toast" } // Ensures reuse of a single toast
    );
}
