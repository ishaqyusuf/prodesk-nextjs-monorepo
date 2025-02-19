const navs = {
  orders: { title: "Orders", link: "/sales/orders" },
  sales: { title: "Sales" },
  salesProduction: { title: "Productions", link: "/sales/productions" },
  viewOrder: (title) => {
    return { title, link: `/sales/orders/${title}` };
  },
  nav(title, link = null) {
    return { title, link };
  },
};
export default navs;
