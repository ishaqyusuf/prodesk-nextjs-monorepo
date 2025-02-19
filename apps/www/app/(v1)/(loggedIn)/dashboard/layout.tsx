import { DatePicker } from "@/components/_v1/date-range-picker";

export default async function DashboardLayout({ children }) {
    return (
        <div className="flex-1 space-y-4 px-8">
            <div className="flex items-center justify-between space-y-2">
                <h2
                    className="text-3xl font-bold tracking-tight"
                    id="dashboardTitle"
                ></h2>
                <div className="flex items-center space-x-2">
                    <DatePicker />
                    {/* <Button>Download</Button> */}
                </div>
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    );
}
