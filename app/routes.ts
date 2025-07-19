import { type RouteConfig, index, prefix } from "@react-router/dev/routes";
import itemsRoutes from "./routes/items/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("items", [...itemsRoutes]),
] satisfies RouteConfig;
