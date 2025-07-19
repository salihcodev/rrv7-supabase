import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    index("routes/items/index.tsx"),
    route(":id", "routes/items/item.tsx"),
] satisfies RouteConfig;
