type ILinkName =
    | "orders"
    | "quotes"
    | "order"
    | "quote"
    | "order-form"
    | "estimate-form";
export function links(name: ILinkName, ...args) {
    let href = {
        orders: "/sales/orders",
        quotes: "/sales/quotes",
    }[name];
    if (!href)
        switch (name) {
            case "quote":
                href = "/sales/quote/" + args?.[0];
                break;
        }
    return href;
}
