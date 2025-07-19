import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    route("", "routes/items/index.tsx", [
        index("routes/items/list.tsx"),
        route("create", "routes/items/create.tsx"),
        route(":id", "routes/items/item.tsx"),
    ]),
] satisfies RouteConfig;
