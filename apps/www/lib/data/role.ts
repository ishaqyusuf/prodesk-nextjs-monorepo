import { camel } from "../utils";

export const permissions: any[] = [
    "dashboard",
    "commission",
    //community
    "project",
    "builders",
    "invoice",
    "installation",
    "production",
    "home key",
    "deco shutter install",
    //contractor
    "assign tasks",
    "documents",
    "jobs",
    "job payment",
    //sales
    "orders",
    "sales customers",
    "estimates",
    "delivery",
    "pickup",
    "order production",
    "order payment",
    "putaway",
    "inbound order",
    "customer phone",
    //hrm
    "role",
    "employee",
    "customer service",
    "tech",
    // "assign installer",
    // "cost",
    // "sales invoice",
    // "price list",
    // "email template",
]; //.sort((a, b) => a - b);
export const adminPermissions = permissions.reduce((acc, val, index, arr) => {
    const p = arr[index];
    return {
        ...acc,
        [camel(`view ${p}`) as any]: true,
        [camel(`edit ${p}`) as any]: true,
    };
}, {});

