import { AUTHORIZATION, PRODUCT_EDITING, PRODUCT_LIST, PRODUCT_NEW } from "../const/utils-path";
import Authorization from "../modules/screens/authorization/index";
import NewProduct from "../modules/screens/add-new-product/index";
import ProductEditing from "../modules/screens/product-editing/index";
import ProductList from "../modules/screens/product-list/index";

export const publicRoutes = [
    {
        path: AUTHORIZATION,
        Component: Authorization
    }
]

export const privateRoutes = [
    {
        path: PRODUCT_LIST,
        Component: ProductList
    },
    {
        path: PRODUCT_NEW,
        Component: NewProduct
    },
    {
        path: PRODUCT_EDITING,
        Component: ProductEditing
    }
]
