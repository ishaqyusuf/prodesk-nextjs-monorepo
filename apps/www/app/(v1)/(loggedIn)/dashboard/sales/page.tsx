import { salesDashboardAction } from "@/app/(v1)/(loggedIn)/dashboard/sales/_actions/sales-dashboard";
import AuthGuard from "@/app/(v2)/(loggedIn)/_components/auth-guard";
import { Breadcrumbs } from "@/components/_v1/breadcrumbs";
import { BreadLink } from "@/components/_v1/breadcrumbs/links";
import BarChartComponent from "@/components/_v1/charts/bar-chart";
import Portal from "@/components/_v1/portal";
import RecentSalesDashboardCard from "@/components/_v1/sales/recent-sales-dashboard-card";
import { DataPageShell } from "@/components/_v1/shells/data-page-shell";
import { StartCard, StatCardContainer } from "@/components/_v1/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import BarChart from "./_components/bar-chart";

export const metadata: Metadata = {
    title: "Sales Dashboard",
};

interface Props {}
export default async function SalesDashboardPage({}: Props) {
    return <></>;
    const salesDashboard = await salesDashboardAction();
    const {
        totalSales,
        amountDue,
        totalDoors,
        completedOrders,
        completedDoors,
        totalOrders,
    } = salesDashboard;
    return (
        <AuthGuard can={["editDashboard"]}>
            <DataPageShell className="space-y-4" data={salesDashboard}>
                <Breadcrumbs>
                    <BreadLink isFirst title="Dashboard" />
                    <BreadLink isLast title="Sales" />
                </Breadcrumbs>
                <Portal nodeId="dashboardTitle">Sales Dashboard</Portal>

                <StatCardContainer>
                    <StartCard
                        masked
                        icon="dollar"
                        value={totalSales}
                        label="Total Sales"
                        money
                    />
                    <StartCard
                        masked
                        icon="dollar"
                        value={amountDue}
                        label="Amount Due"
                        money
                    />
                    <StartCard
                        label="Total Orders"
                        icon="lineChart"
                        value={totalOrders}
                        info={`${completedOrders || 0} completed`}
                    />
                    <StartCard
                        icon="lineChart"
                        label="Doors Ordered"
                        value={totalDoors}
                        info={`${completedDoors || 0} completed`}
                    />
                </StatCardContainer>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <BarChart chartData={salesDashboard.bar} />
                    {/* <Card className="lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <BarChartComponent
                                data={salesDashboard.bar || []}
                            />
                        </CardContent>
                    </Card> */}
                    <RecentSalesDashboardCard className="md:col-span-1 lg:col-span-3" />
                </div>
            </DataPageShell>
        </AuthGuard>
    );
}
