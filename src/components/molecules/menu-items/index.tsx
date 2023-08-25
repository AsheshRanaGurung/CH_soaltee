import { MenuGenerator } from "../menu-generator";

export const MenuItems = () => {
  const items = [
    {
      key: "category",
      name: "Search by category",
      children: [
        { key: "men-clothing", name: "Mens clothing", route: "#" },
        { key: "womens-clothing", name: "Womens clothing", route: "#" },
      ],
    },
    { key: "deals", name: "Deals", route: "#" },
    { key: "new", name: "What's new", route: "#" },
    { key: "delivery", name: "Delivery", route: "#" },
  ];
  return (
    <>
      <MenuGenerator items={items} />
    </>
  );
};
