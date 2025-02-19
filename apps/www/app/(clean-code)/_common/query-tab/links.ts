export const siteLinks = {
    orders: "/sales-book/orders",
    quotes: "/sales-book/quotes",
    customers: "/sales-book/customers",
} as const;
export type SiteLinksPage = keyof typeof siteLinks;
