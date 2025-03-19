import { faPenNib, faPlus, faShoppingCart, faTruck, faUsers } from '@fortawesome/free-solid-svg-icons';
export const Links = [
    {
        path: "users",
        icon: faUsers,
        name: "Users",
        role: "1995"
    },
    {
        path: "/dashboard/user/add",
        icon: faPlus,
        name: "Add user",
        role: "1995"
    },
    {
        path: "/dashboard/categories",
        icon: faShoppingCart,
        name: "Categories",
        role: ["1995", "1999"]
    },
    {
        path: "/dashboard/categorie/add",
        icon: faShoppingCart,
        name: "Add Categories",
        role: ["1995", "1999"]
    },
    {
        path: "/dashboard/products",
        icon: faTruck,
        name: "Products",
        role: ["1995", "1999"]
    },
    {
        path: "/dashboard/product/add",
        icon: faTruck,
        name: "Add Products",
        role: ["1995", "1999"]
    },
    {
        path: "writer",
        icon: faPenNib,
        name: "Writer",
        role: ["1995", "1996"]
    }
]